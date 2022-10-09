/* eslint-disable react-hooks/exhaustive-deps */
import { useRef } from "react";

import {
  Avatar,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  IconButton,
  Modal,
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LinearProgress from '@mui/material/LinearProgress';
import { useState } from "react";
import { useEffect } from "react";
import { handleCommentApi, handleCommentsPostApi, handleNewNotificationApi } from "../../Services/app";
import { useSelector } from "react-redux";

import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime'
import { useLocation } from "react-router-dom";
import socketClient from "../../Socket/client";
import { toast } from "react-toastify";
dayjs.extend(relativeTime)

const styles = {
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    boxShadow: 24,
    overflowY: "scroll",
    overflowX: "hidden",
    display: "block",
    maxHeight: "70vh",
    borderRadius: "7px",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  image: {
    width: "2rem",
    height: "2rem",
    marginRight: "10px",
  },
  modalHeader: {
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    padding: "10px",
    position: "sticky",
    top: "0",
    width: "100%",
    zIndex: "10000",
    borderBottom: "1px solid rgb(239,239,239)",
  },
  commentsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  comment: {
    width: "100%",
    padding: "10px",
    display: "flex",
  },
  commentDetail: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  modalFooter: {
    backgroundColor: "white",
    borderTop: "1px solid rgb(239,239,239)",
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    position: "sticky",
    bottom: "-1px",
  },
  form: {
    width: "100%",
    display: "relative",
  },
  submitButton: {
    position: "absolute",
    right: "5px",
    top: "15px",
    fontWeight: "600",
  },
};

const CommentModal = ({ open, onClose, post, setPost }) => {
  const [loadingComments, setLoadingComments] = useState(false);
  const [loadingPostComment, setLoadingPostComment] = useState(false);
  const infoUser = useSelector((state) => state.user.infoUser);
  const input = useRef(null);
  const [data, setData] = useState([]);
  const [isChangeData, setChangeData] = useState(false);
  const location = useLocation()

  useEffect(() => {
    getAllComments();
  }, [isChangeData, open]);

  const getAllComments = async () => {
    try {
      setLoadingComments(true);
      const res = await handleCommentsPostApi(post.id);

      if (res.statusCode === 0) {
        setData(res.data);
      } else {
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingComments(false);
    }
  };

  const newNotification = async (comment_id) => {
    try {
      const req = {
        content: "đã bình luận bài viết của bạn.",
        link: location.pathname + `/${post.id}` + (location.search ? location.search : "") + `#comment_${comment_id}`,
        type: 1,
        receiver_id: post.user_id,
      }
      const res = await handleNewNotificationApi(req)
      if (res.statusCode === 0) {
        if (infoUser.id !== post.user_id) {
          socketClient.emit("sendNotification", { ...res.data, receiver_id: req.receiver_id })
        }
      } else {

      }
    } catch (error) {

    }
  }

  const handleComment = async () => {
    try {
      const req = {
        user_id: infoUser.id,
        post_id: post.id,
        content: input.current.value,
      };

      setLoadingPostComment(true);
      const res = await handleCommentApi(req);

      if (res.statusCode === 0) {
        await getAllComments();
        input.current.value = "";
        await newNotification(res.data.id);
        setPost({ ...post, commentCount: post.commentCount + 1 })
      } else {
      }

    } catch (error) {
      console.log("POST COMMENT ERROR", error)
      toast.error(error.message)
    } finally {
      setLoadingPostComment(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styles.modal}>
        <Box sx={styles.modalHeader}>
          <Avatar sx={styles.image} />
          <Typography variant="body2">
            <b>{infoUser.username}</b> ・ {dayjs(post.created_at).fromNow()}
          </Typography>
        </Box>
        {loadingComments && <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>}
        <Box sx={styles.commentsContainer}>
          {data.map(
            ({ id, post_id, user_id, content, updated_at, all_childs, user }, i) => (
              <Comment
                key={i}
                id={id}
                user_id={user_id}
                post_id={post_id}
                content={content}
                updated_at={updated_at}
                all_childs={all_childs}
                user={user}
                post_user_id={post.user_id}
                postComment={() => setChangeData(!isChangeData)}
              />
            )
          )}
          {!data.length > 0 && !loadingComments &&
            <Typography sx={{ m: "10px" }}>There's no comment yet! 😢</Typography>
          }
        </Box>
        <Box sx={styles.modalFooter}>
          <FormControl sx={styles.form}>
            <TextField
              inputRef={input}
              variant="standard"
              label="Add a comment..."
              multiline
              autoFocus
              inputProps={{ style: { fontSize: "0.9rem" } }}
              sx={{
                height: "3rem",
                paddingRight: "70px",
                overflowY: "scroll",
                marginTop: "10px",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            />
            <Button
              onClick={handleComment}
              type="submit"
              sx={styles.submitButton}
              disabled={loadingPostComment}
            >
              {loadingPostComment ? (
                <CircularProgress
                  thickness={5}
                  size={25}
                  sx={{
                    color: "primary",
                    height: "20px",
                    width: "20px",
                  }}
                />
              ) : (
                "Post"
              )}
            </Button>
          </FormControl>
        </Box>
      </Box>
    </Modal>
  );
};

const Comment = ({
  id,
  user_id,
  post_id,
  content,
  parent_id,
  created_at,
  updated_at,
  all_childs,
  user,
  post_user_id,
  postComment,
}) => {
  const [isReplying, setReplying] = useState(false);
  const infoUser = useSelector((state) => state.user.infoUser);
  const input = useRef(null);
  const location = useLocation()

  const handleComment = () => {
    const req = {
      user_id: infoUser.id,
      post_id: post_id,
      content: input.current.value,
      parent_id: id,
    };

    const comment = async () => {
      const res = await handleCommentApi(req);

      if (res.statusCode === 0) {
        input.current.value = "";
        postComment();
        setReplying(false);
        if (infoUser.id !== post_user_id) {
          newNotification("đã bình luận bài viết của bạn.", location.pathname + `/${id}` + (location.search ? location.search : "") + `#comment_${id}`, post_user_id)
        }
        if (infoUser.id !== user_id) {
          newNotification("đã trả lời bình luận của bạn.", location.pathname + `/${id}` + (location.search ? location.search : "") + `#comment_${id}`, user_id)
        }
      } else {
      }
    };

    comment();
  };

  const newNotification = async (content, link, receiver_id) => {
    try {
      const req = {
        content,
        link,
        type: 1,
        receiver_id,
      }
      const res = await handleNewNotificationApi(req)
      console.log(res);
      if (res.statusCode === 0) {
        socketClient.emit("sendNotification", { ...res.data, receiver_id: req.receiver_id })
      } else {

      }
    } catch (error) {

    }
  }

  return (
    <Box sx={styles.comment} id={`comment_${id}`}>
      <Avatar sx={styles.image} />
      <Box sx={styles.commentDetail}>
        <Typography variant="body2">
          <b>{user.username}</b>
        </Typography>
        <Typography variant="body2"> {content}</Typography>
        <Typography>
          <Typography display="inline" sx={{ fontSize: "12px", color: "rgba(0, 0, 0, 0.6)" }}>
            {dayjs(updated_at).fromNow()} &nbsp;&#183;&nbsp;
          </Typography>
          <Typography
            display="inline"
            variant="string"
            sx={{
              color: "rgba(0, 0, 0, 0.6)",
              fontSize: "12px",
              transition: "300ms",
              cursor: "pointer",
              "&:hover": {
                color: "blue"
              },
            }}
            onClick={() => { setReplying(!isReplying) }}
          >
            Trả lời
          </Typography>
        </Typography>
        {isReplying && (
          <FormControl style={{ paddingTop: 0 }} sx={styles.comment}>
            <TextField
              inputRef={input}
              variant="standard"
              label="Reply a comment..."
              multiline
              inputProps={{ style: { fontSize: "0.9rem" } }}
              sx={{
                height: "3rem",
                paddingRight: "70px",
                overflowY: "scroll",
                marginTop: "10px",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            />
            <Button
              onClick={handleComment}
              type="submit"
              sx={styles.submitButton}
            >
              Post
            </Button>
          </FormControl>
        )}
        {all_childs.map((item, i) => {
          return (
            <Comment
              key={i}
              id={item.id}
              user_id={user_id}
              content={item.content}
              updated_at={item.updated_at}
              all_childs={item.all_childs}
              user={item.user}
              post_id={post_id}
              post_user_id={post_user_id}
              postComment={postComment}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default CommentModal;
