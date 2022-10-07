import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Carousel from "react-material-ui-carousel";

import { useState } from "react";

import { Avatar, Divider, IconButton, Typography, Box } from "@mui/material";

import CardActions from "@mui/material/CardActions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";

import CommentModal from "./CommentModal";

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
    padding: "7px",
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
  },
};

const PostCard = ({ id }) => {
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const openCommentModal = () => setCommentModalOpen(true);
  const closeCommentModal = () => setCommentModalOpen(false);

  const postBlob = {
    description: "Chuyến đi Bắc Cực đầu tiên trong đời của bé Thy",
    user: {
      name: "Bảo Thi",
      userId: "1",
    },
    time: "20h truoc",
    images: [
      "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA12GBdO.img?w=768&h=463&m=6",
      "https://secureservercdn.net/198.71.233.172/r26.7c0.myftpupload.com/wp-content/uploads/2021/04/salmon-1.jpg",
    ],
    tags: ["#beatvn", "#beatvn"],
    like: 100,
    commnetId: "1",
    commentCount: 20,
  };

  return (
    <Card sx={styles.card}>
      <CardHeader
        avatar={<Avatar sx={styles.image} />}
        title={postBlob.title}
        subheader={`${postBlob.user.name}・${postBlob.time}`}
        sx={styles.header}
      ></CardHeader>
      <Divider />
      <CardContent sx={styles.content}>
        <Typography>{postBlob.description}</Typography>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          {postBlob.tags.map((tag) => {
            return <Box sx={styles.tag}>{tag}</Box>;
          })}
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
            {postBlob.images.length > 0
              ? postBlob.images.map((image, i) => (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <img
                      src={image}
                      styles={{
                        width: "100%",
                        height: "500px",
                        border: "1px solid black",
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
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <Typography>{postBlob.like}</Typography>
        <IconButton aria-label="comment" onClick={openCommentModal}>
          <CommentIcon />
        </IconButton>
        <Typography>{postBlob.commentCount}</Typography>
      </CardActions>

      <CommentModal
        open={commentModalOpen}
        onClose={closeCommentModal}
        post_id={id}
      />
    </Card>
  );
};

export default PostCard;
