import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Carousel from "react-material-ui-carousel";

import { useState, useEffect } from "react";

import {
  Avatar,
  Divider,
  IconButton,
  Typography,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";

import CardActions from "@mui/material/CardActions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CheckIcon from "@mui/icons-material/Check";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import CommentIcon from "@mui/icons-material/Comment";
import {
  handleLikePostApi,
  handleCompleteQuestionApi,
  handleNewNotificationApi,
} from "../../Services/app";
import { toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import CommentModal from "./CommentModal";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import socketClient from "../../Socket/client";
dayjs.extend(relativeTime);

const styles = {
  card: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px",
    padding: "5px",
  },
  image: {
    width: "2rem",
    height: "2rem",
  },
  content: {
    padding: "20px 7px",
    textAlign: "left",
    "&:hover": { cursor: "pointer" },
  },
  actions: {
    padding: "10px",
    textAlign: "left",
    display: "flex",
  },
  header: {
    textAlign: "left",
    fontSize: "30px!important",
    fontWeight: "bold!important",
    position: "relative",
  },
  tag: {
    cursor: "pointer",
    color: "gray",
    wordWrap: "none",
    backgroundColor: "#e1ecf4",
    borderRadius: "4px",
    padding: "4px",
    height: "32px",
    "&:hover": {
      backgroundColor: "#bfdff7",
    },
  },
};

const QuestionCard = (props) => {
  const userInfo = useSelector((state) => state.user.infoUser);
  const navigate = useNavigate();
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const openCommentModal = () => setCommentModalOpen(true);
  const closeCommentModal = () => setCommentModalOpen(false);
  const [blob, setBlob] = useState(props.item);
  const location = useLocation()
  const infoUser = useSelector((state) => state.user.infoUser)

  useEffect(() => {
    setBlob(props.item);
  }, [props.item]);

  useEffect(() => { }, [blob]);

  const likePost = async () => {
    const value = blob.isLike ? -1 : 1;

    if (blob.isLike === true) {
      setBlob({ ...blob, like: blob.like-- });
    }
    else {
      setBlob({ ...blob, like: blob.like++ });
      newNotification()
    }
    setBlob({ ...blob, isLike: !blob.isLike });
    try {
      const res = await handleLikePostApi(blob.id, value);

      if (!res || !res.statusCode === 0) {
        // revert
        if (blob.isLike === false) {
          setBlob({ ...blob, like: blob.like++ });
        }
        else {
          setBlob({ ...blob, like: blob.like-- });
          newNotification()
        }
        setBlob({ ...blob, isLike: !blob.isLike });
      }

    } catch (error) {
      // revert
      if (blob.isLike === false) {
        setBlob({ ...blob, like: blob.like++ });
      }
      else {
        setBlob({ ...blob, like: blob.like-- });
        newNotification()
      }
      setBlob({ ...blob, isLike: !blob.isLike });
      console.log(error);
      toast.error(error.message);
    }
  };

  const [loadingComplete, setLoadingComplete] = useState(false);

  const toggleCompleteQuestion = async () => {
    try {
      setLoadingComplete(true);
      const res = await handleCompleteQuestionApi(blob.id);
      if (res && res.statusCode === 0) {
        setBlob({ ...blob, completed: res.data.completed });
        toast.success("Success!");
      } else {
        throw new Error("Res not found");
      }
    } catch (error) {
      console.log("TOGGLE COMPLETE QUESTION CARD", error);
      toast.error(error.message);
    } finally {
      setLoadingComplete(false);
    }
  };

  const newNotification = async () => {
    try {
      const req = {
        content: "đã thả cảm xúc về bài viết của bạn.",
        link: location.pathname + `/${blob.id}` + (location.search ? location.search : ""),
        type: 1,
        receiver_id: blob.user_id,
      }
      const res = await handleNewNotificationApi(req)
      if (res.statusCode === 0) {
        if (infoUser.id !== blob.user_id) {
          socketClient.emit("sendNotification", { ...res.data, receiver_id: req.receiver_id })
        }
      } else {

      }
    } catch (error) {

    }
  }

  return (
    <Card
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        marginBottom: "20px",
        padding: "5px",
        borderBottom: `5px solid ${blob.completed ? "green" : "red"}`,
      }}
    >
      <CardHeader
        avatar={<Avatar sx={styles.image} />}
        title={blob.user.username}
        subheader={`${dayjs(blob.updated_at).fromNow()}`}
        sx={styles.header}
      ></CardHeader>
      <Button
        sx={{ position: "absolute", top: "20px", right: "10px" }}
        onClick={() => navigate(`/questions/${blob.id}`)}
      >
        Xem chi tiết
      </Button>

      <Divider />
      <CardContent sx={styles.content}>
        <Typography
          variant="body2"
          sx={{ wordWrap: "break-word", height: "60px" }}
        >
          {blob.content.length > 100
            ? blob.content.substring(0, 100) + "..."
            : blob.content}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            height: "60px",
            gap: "5px",
          }}
        >
          {blob && blob.has_tags && blob.has_tags.length > 0
            ? blob.has_tags.map((tag, i) => {
              return (
                <Box sx={styles.tag} key={i}>
                  {`${tag.name}`}
                </Box>
              );
            })
            : null}
        </Box>
        <Box
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Carousel
            animation="fade"
            indicators={false}
            navButtonsAlwaysVisible={blob.images.length > 1 ? true : false}
            sx={{
              width: "100%",
              height: "100%",
            }}
          >
            {blob.images.length > 0
              ? blob.images.map((image, i) => (
                <div
                  style={{ display: "flex", justifyContent: "center" }}
                  key={i}
                >
                  <img
                    src={image.link}
                    style={{
                      height: "200px",
                    }}
                  ></img>
                </div>
              ))
              : null}
          </Carousel>
        </Box>
      </CardContent>
      <Divider />
      <CardActions disableSpacing sx={styles.actions}>
        <IconButton aria-label="add to favorites" onClick={() => likePost()}>
          <FavoriteIcon
            sx={{ color: `${blob.isLike === true ? "red" : null}` }}
          />
        </IconButton>
        <Typography>{blob.like}</Typography>
        <IconButton aria-label="comment" onClick={openCommentModal}>
          <CommentIcon />
        </IconButton>
        <Typography>{blob.commentCount}</Typography>
        {/* {blob.completed ? (
          <IconButton aria-label="completed">
            <CheckIcon />
          </IconButton>
        ) : (
          <>
            <IconButton aria-label="uncompleted">
              <SentimentVeryDissatisfiedIcon />
            </IconButton>
          </>
        )} */}
        {userInfo.id === blob.user_id && (
          <Button
            onClick={toggleCompleteQuestion}
            color={blob.completed ? "error" : "success"}
            sx={{ marginLeft: "auto", fontWeight: 600 }}
            disabled={loadingComplete}
          >
            {loadingComplete ? (
              <CircularProgress
                thickness={5}
                size={25}
                sx={{
                  color: blob.completed ? "red" : "green",
                  height: "20px",
                  width: "20px",
                }}
              />
            ) : !blob.completed ? (
              "Complete"
            ) : (
              "Undo"
            )}
          </Button>
        )}
      </CardActions>

      <CommentModal
        open={commentModalOpen}
        onClose={closeCommentModal}
        post={blob}
        setPost={setBlob}
      />
    </Card>
  );
};

export default QuestionCard;
