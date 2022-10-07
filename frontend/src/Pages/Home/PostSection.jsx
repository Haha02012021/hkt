import { Avatar, Box, Card, CardContent, Chip } from "@mui/material";
import React from "react";

import PostCard from "../../Components/Elements/PostCard";
import { Modal, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";

const styles = {
  postContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "1px solid gray",
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
  const [selectedTags, setSelectedTags] = useState([]);
  const listBlogs = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      title: data.get("title"),
      data: data.get("data"),
      tags: selectedTags,
    });
  };

  return (
    <Box sx={styles.postContainer}>
      <Card
        sx={{
          position: "relative",
          marginBottom: "20px",
          padding: "0px",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <CardContent
          sx={{ textAlign: "left", display: "flex", alignItems: "center" }}
        >
          <Avatar sx={{ width: "2rem", height: "2rem", marginRight: "5px" }} />
          <Box
            sx={{
              border: "1px solid red",
              padding: "5px",
              flexGrow: 1,
              borderBottomLeftRadius: "50px",
              borderTopLeftRadius: "50px",
              borderBottomRightRadius: "50px",
              borderTopRightRadius: "50px",
              paddingLeft: "10px",
              transition: "all 0.1s ease-in-out",
              "&:hover": {
                backgroundColor: "#AAA",
                cursor: "pointer",
              },
            }}
            onClick={() => setCreatePostModalOpen(true)}
          >
            What are you thinking?
          </Box>
        </CardContent>
      </Card>

      {listBlogs.map((item) => {
        return (
          <PostCard
            title="Test title"
            username="Test username"
            createdAt="2021-10-10 10:10:10"
            data="Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum"
            likeCount={666}
            commentCount={999}
          />
        );
      })}

      <Modal
        open={createPostModalOpen}
        onClose={() => setCreatePostModalOpen(false)}
      >
        <Box sx={styles.createModal}>
          <Typography component="h1" variant="h5">
            Create Post
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              name="data"
              label="Data"
              type="text"
              id="data"
              sx={{ marginBottom: "10px" }}
            />
            {["homework", "N2", "N3", "N4", "N5"].map((tag) => {
              return (
                <Chip
                  key={tag}
                  label={tag}
                  color="primary"
                  variant={selectedTags.includes(tag) ? "" : "outlined"}
                  clickable
                  sx={{ marginRight: "5px", marginBottom: "5px" }}
                  onClick={() => {
                    if (selectedTags.includes(tag)) {
                      setSelectedTags(selectedTags.filter((t) => t !== tag));
                    } else {
                      setSelectedTags([...selectedTags, tag]);
                    }
                  }}
                />
              );
            })}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Post
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default PostSection;
