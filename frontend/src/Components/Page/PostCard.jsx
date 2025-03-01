import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Carousel from "react-material-ui-carousel";

import { useState, useEffect } from "react";

import { Avatar, Divider, IconButton, Typography, Box } from "@mui/material";

import CardActions from "@mui/material/CardActions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import { handleLikePostApi, handleNewNotificationApi } from "../../Services/app";
import CommentModal from "./CommentModal";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import socketClient from "../../Socket/client";
dayjs.extend(relativeTime);

const styles = {
  card: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px",
    width: "960px",
    padding: "5px",
  },
  image: {
    width: "2rem",
    height: "2rem",
  },
  content: {
    padding: "20px 7px",
    textAlign: "left",
  },
  header: {
    textAlign: "left",
    fontSize: "30px!important",
    fontWeight: "bold!important",
  },
  tag: {
    cursor: "pointer",
    color: "blue",
    wordWrap: "noWrap",
  },
};

const PostCard = (props) => {
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const openCommentModal = () => setCommentModalOpen(true);
  const closeCommentModal = () => setCommentModalOpen(false);
  const [blob, setBlob] = useState(props.item);
  const location = useLocation()
  const infoUser = useSelector((state) => state.user.infoUser)

  useEffect(() => {
    setBlob(props.item);
    console.log("blob", props.item);
  }, [props.item]);

  useEffect(() => { }, [blob]);

  const likePost = async () => {
    const value = blob.isLike ? -1 : 1;
    const res = await handleLikePostApi(blob.id, value);
    if (res && res.statusCode === 0) {
      if (blob.isLike === true) {
        setBlob({ ...blob, like: blob.like-- });
        newNotification()
      }
      else {
        setBlob({ ...blob, like: blob.like++ });
      }
      setBlob({ ...blob, isLike: !blob.isLike });
    }
  };

  const newNotification = async () => {
    try {
      const req = {
        content: "đã thả cảm xúc về bài viết của bạn.",
        link: "/" + location.pathname.split("/")[0] + `/${blob.id}` + (location.search ? location.search : ""),
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
    <Card sx={styles.card}>
      <CardHeader
        avatar={<Avatar sx={styles.image} />}
        title={blob.user.username}
        subheader={`${dayjs(blob.updated_at).fromNow()}`}
        sx={styles.header}
      ></CardHeader>
      <Divider />
      <CardContent sx={styles.content}>
        <Typography variant="body2" sx={{ wordWrap: "break-word" }}>
          {blob.content}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          {blob && blob.has_tags && blob.has_tags.length > 0
            ? blob.has_tags.map((tag, i) => {
              return (
                <Box sx={styles.tag} key={i}>
                  {`#${tag.name}`}
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
            navButtonsAlwaysVisible={true}
            animation="slide"
            indicators={false}
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
                      height: "300px",
                    }}
                  ></img>
                </div>
              ))
              : null}
          </Carousel>
        </Box>
      </CardContent>
      <Divider />
      <CardActions disableSpacing sx={styles.content}>
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
      </CardActions>

      {commentModalOpen && (
        <CommentModal
          open={commentModalOpen}
          onClose={closeCommentModal}
          post={blob}
          setPost={setBlob}
        />
      )}
    </Card>
  );
};

export default PostCard;
