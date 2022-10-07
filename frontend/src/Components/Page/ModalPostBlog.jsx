import React, { useState } from "react";
import { Modal, Typography, TextField, Button, Box, Chip } from "@mui/material";
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

const ModalPostBlog = (props) => {
  const [selectedTags, setSelectedTags] = useState([]);

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
    <Modal open={props.open} onClose={() => props.onClose(false)}>
      <Box sx={styles.createModal}>
        <Typography component="h1" variant="h5" style={{ textAlign: "center" }}>
          Tạo bài viết
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Box>
            <Box>Nội dung chia sẻ</Box>
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
          </Box>

          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Nội dung bài viết của bạn"
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
  );
};

export default ModalPostBlog;
