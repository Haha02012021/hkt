import React, { useState, useRef } from "react";
import { Modal, Typography, Button, Box, Chip } from "@mui/material";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import Carosel from "../Elements/Carosel";
import { post } from "axios";
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
  const [lineTextArea, setLineTextArea] = useState(1);
  const [files, setFiles] = useState([]);
  const inputFile = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = "http://example.com/file-upload";
    const data = new FormData(event.currentTarget);
    console.log({
      title: data.get("title"),
      files: data.get("files"),
      tags: selectedTags,
    });

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    const res = await post(url, data, config);
    console.log(res);
  };

  const FileNull = () => {
    return (
      <Box
        style={{
          border: "1px solid #ccc",
          borderRadius: "15px",
          height: "350px",
          width: "100%",
          backgroundColor: "#f7f8fa",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        <Box
          style={{
            backgroundColor: "#e4e6eb",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AddToPhotosIcon />
        </Box>
        <Box>Chọn ảnh hoặc video</Box>
      </Box>
    );
  };

  return (
    <Modal open={props.open} onClose={() => props.onClose(false)}>
      <Box sx={styles.createModal}>
        <Box style={{ display: "flex", justifyContent: "flex-end" }}>
          <Box
            sx={{
              fontWeight: "bold",
              "&:hover": { cursor: "pointer", color: "blue" },
            }}
            onClick={() => props.onClose(false)}
          >
            X
          </Box>
        </Box>

        <Typography
          component="h1"
          variant="h5"
          style={{ textAlign: "center", padding: "10px 0" }}
        >
          Tạo bài viết
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Box>
            <Box
              style={{
                paddingBottom: "5px",
                fontSize: "14px",
                fontWeight: "400",
              }}
            >
              Chọn nội dung muốn chia sẻ để người khác dễ tiếp cận với bài viết
              của bạn
            </Box>
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

          <textarea
            required
            fullWidth
            id="title"
            label="Nội dung bài viết của bạn"
            name="title"
            autoFocus={true}
            style={{
              border: "none",
              outline: "none",
              width: "100%",
              padding: "10px",
            }}
            rows={lineTextArea}
            onChange={(e) => {
              setLineTextArea(e.target.value.length / 97);
            }}
          />
          <Box>
            <label for="files">
              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "15px",
                  height: "350px",
                  width: "100%",
                  backgroundColor: "#f7f8fa",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                {files.length > 0 ? <Carosel files={files} /> : <FileNull />}
              </Box>
            </label>
            <input
              name="files"
              type="file"
              id="files"
              multiple={true}
              hidden
              ref={inputFile}
              onChange={() => setFiles([...inputFile.current.files])}
            />
          </Box>

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
