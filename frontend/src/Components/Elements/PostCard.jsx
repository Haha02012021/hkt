import * as React from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

import { Avatar, Divider, IconButton, Typography } from "@mui/material";

import CardActions from "@mui/material/CardActions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px",
    maxWidth: "800px",
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
  },
};

const PostCard = ({
  title,
  username,
  createdAt,
  data,
  likeCount,
  commentCount,
}) => {
  return (
    <Card sx={styles.card}>
      <CardHeader
        avatar={<Avatar sx={styles.image} />}
        title={title}
        subheader={`${createdAt}・${username}`}
        sx={styles.header}
      ></CardHeader>
      <Divider />
      <CardContent sx={styles.content}>
        <Typography>{data}</Typography>
      </CardContent>
      <Divider />
      <CardActions disableSpacing sx={styles.content}>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <Typography>{likeCount}</Typography>
        <IconButton aria-label="comment">
          <CommentIcon />
        </IconButton>
        <Typography>{commentCount}</Typography>
      </CardActions>
    </Card>
  );
};

export default PostCard;
