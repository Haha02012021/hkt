import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
  Pagination,
  CircularProgress,
} from "@mui/material";
import React, { useEffect } from "react";

import PostCard from "../../Components/Page/PostCard";
import ModalPostBlog from "../../Components/Page/ModalPostBlog";
import { useState } from "react";
import { handleGetPostApi } from "../../Services/app";

const styles = {
  postContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px",
    position: "relative",
  },
  addButtonContainer: {
    position: "absolute",
    right: "20px",
    height: "100%",
  },
  createModal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  },
};

const PostSection = () => {
  const [createPostModalOpen, setCreatePostModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [countPage, setCountPage] = useState(10);
  const [listBlogs, setListBlogs] = useState([]);
  const [newBlob, setNewBlob] = useState(false);

  const setNewBlobHandle = () => {
    setNewBlob(!newBlob);
  };

  useEffect(() => {
    const getPosts = async () => {
      const res = await handleGetPostApi(0, currentPage);
      if (res && res.statusCode === 0) {
        const data = res.data.data;
        data.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at)
        });
        setListBlogs(data);
        const count =
          res.data.total % 10 === 0
            ? parseInt(res.data.total / 10)
            : parseInt(res.data.total / 10) + 1;
        setCountPage(count);
      }
    };
    getPosts();
  }, [currentPage, newBlob]);

  return (
    <Box sx={styles.postContainer}>
      <Card
        sx={{
          position: "relative",
          marginBottom: "20px",
          padding: "0px",
          width: "100%",
          maxWidth: "960px",
        }}
      >
        <Typography
          component="h2"
          variant="h5"
          style={{ textAlign: "left", padding: "20px 0 0 20px" }}
        >
          Tạo những bài viết chia sẻ kiến thức với những người khác
        </Typography>

        <CardContent
          sx={{ textAlign: "left", display: "flex", alignItems: "center" }}
        >
          <Avatar sx={{ width: "2rem", height: "2rem", marginRight: "5px" }} />
          <Box
            sx={{
              padding: "5px",
              flexGrow: 1,
              borderBottomLeftRadius: "50px",
              borderTopLeftRadius: "50px",
              borderBottomRightRadius: "50px",
              borderTopRightRadius: "50px",
              paddingLeft: "10px",
              transition: "all 0.1s ease-in-out",
              backgroundColor: "#E4E6EB",

              "&:hover": {
                backgroundColor: "#E4E6EB",
                cursor: "pointer",
              },
            }}
            onClick={() => setCreatePostModalOpen(true)}
          >
            <Typography sx={{ color: "rgb(0,0,0,0.6)" }}>What are you thinking?</Typography>
          </Box>
        </CardContent>
      </Card>

      {listBlogs && listBlogs.length > 0 ? (
        listBlogs.map((item, i) => {
          return <PostCard key={i} item={item} />;
        })
      ) : (
        <CircularProgress
          thickness={5}
          size={25}
          color="primary"
          sx={{
            height: "20px",
            width: "20px",
          }}
        />
      )}

      {listBlogs && listBlogs.length > 1 ? (
        <Pagination
          count={countPage}
          page={currentPage}
          onChange={(event, page) => setCurrentPage(page)}
        />
      ) : null}

      <ModalPostBlog
        open={createPostModalOpen}
        onClose={setCreatePostModalOpen}
        handleClose={() => setCreatePostModalOpen(false)}
        setNewBlob={setNewBlobHandle}
      />
    </Box>
  );
};

export default PostSection;
