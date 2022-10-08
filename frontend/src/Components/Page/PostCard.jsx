import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Carousel from "react-material-ui-carousel";

import { useState, useEffect } from "react";

import { Avatar, Divider, IconButton, Typography, Box } from "@mui/material";

import CardActions from "@mui/material/CardActions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import { handleLikePostApi } from "../../Services/app";

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
  },
};

const PostCard = (props) => {
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const openCommentModal = () => setCommentModalOpen(true);
  const closeCommentModal = () => setCommentModalOpen(false);
  const [blob, setBlob] = useState(props.item);

  useEffect(() => {
    setBlob(props.item);
  }, [props.item]);

  useEffect(() => {}, [blob]);

  const likePost = async () => {
    const res = await handleLikePostApi(blob.id);
    if (blob.id === 1) console.log(blob);
    if (res && res.statusCode === 0) {
      if (blob.isLike === true) setBlob({ ...blob, like: blob.like-- });
      else {
        setBlob({ ...blob, like: blob.like++ });
      }
      setBlob({ ...blob, isLike: !blob.isLike });
    }
  };

  return (
    <Card sx={styles.card}>
      <CardHeader
        avatar={<Avatar sx={styles.image} />}
        title={blob.title}
        subheader={`${blob.user.username}・${blob.updated_at}`}
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

      <CommentModal
        open={commentModalOpen}
        onClose={closeCommentModal}
        post_id={blob.id}
      />
    </Card>
  );
};

export default PostCard;
