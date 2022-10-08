import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Carousel from "react-material-ui-carousel";

import { useState, useEffect } from "react";

import { Avatar, Divider, IconButton, Typography, Box, Button, CircularProgress } from "@mui/material";

import CardActions from "@mui/material/CardActions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CheckIcon from '@mui/icons-material/Check';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import CommentIcon from "@mui/icons-material/Comment";
import { handleLikePostApi, handleCompleteQuestionApi } from "../../Services/app";
import { toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";

import CommentModal from "./CommentModal";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px",
    // width: "960px",
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
  actions: {
    padding: "10px",
    textAlign: "left",
    display: "flex",
  },
  header: {
    textAlign: "left",
    fontSize: "30px!important",
    fontWeight: "bold!important",
  },
  tag: {
    cursor: "pointer",
    color: "blue",
  },
};

const QuestionCard = (props) => {
  const userInfo = useSelector((state) => state.user.infoUser);

  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const openCommentModal = () => setCommentModalOpen(true);
  const closeCommentModal = () => setCommentModalOpen(false);
  const [blob, setBlob] = useState(props.item);

  useEffect(() => {
    setBlob(props.item);
  }, [props.item]);

  useEffect(() => { }, [blob]);

  const likePost = async () => {
    const res = await handleLikePostApi(blob.id);

    if (res && res.statusCode === 0) {
      if (blob.isLike === true) setBlob({ ...blob, like: blob.like-- });
      else {
        setBlob({ ...blob, like: blob.like++ });
      }
      setBlob({ ...blob, isLike: !blob.isLike });
    }
  };

  const [loadingComplete, setLoadingComplete] = useState(false);

  const toggleCompleteQuestion = async () => {
    try {
      setLoadingComplete(true);
      const res = await handleCompleteQuestionApi(blob.id);
      if (res && res.statusCode === 0) {
        setBlob({ ...blob, completed: res.data.completed })
        toast.success("Success!")
      } else {
        throw new Error("Res not found")
      }
    } catch (error) {
      console.log("TOGGLE COMPLETE QUESTION CARD", error);
      toast.error(error.message)
    } finally {
      setLoadingComplete(false);
    }
  }

  return (
    <Card sx={{
      position: "relative",
      display: "flex",
      flexDirection: "column",
      marginBottom: "20px",
      // width: "960px",
      padding: "5px",
      borderBottom: `5px solid ${blob.completed ? "green" : "red"}`
    }}>
      <CardHeader
        avatar={<Avatar sx={styles.image} />}
        title={blob.user.username}
        subheader={`${blob.updated_at}`}
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
                  {tag}
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
            autoPlay="false"
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
                    styles={{
                      height: "200px"
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
        {blob.completed ?
          <IconButton aria-label="completed">
            <CheckIcon />
          </IconButton>
          :
          <>
            <IconButton aria-label="uncompleted">
              <SentimentVeryDissatisfiedIcon />
            </IconButton>
          </>}
        {userInfo.id === blob.user_id &&
          <Button onClick={toggleCompleteQuestion} color={blob.completed ? "error" : "success"} sx={{ marginLeft: "auto", fontWeight: 600 }}>
            {loadingComplete ? <CircularProgress
              thickness={5}
              size={25}
              sx={{
                color: blob.completed ? "red" : "green",
                height: "20px",
                width: "20px",
              }}
            /> : (!blob.completed ? "Complete" : "Undo")}
          </Button>}
      </CardActions>

      <CommentModal
        open={commentModalOpen}
        onClose={closeCommentModal}
        post_id={blob.id}
      />
    </Card >
  );
};

export default QuestionCard;
