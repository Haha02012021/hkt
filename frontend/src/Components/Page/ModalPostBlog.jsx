import React, { useState, useRef } from "react";
import { Modal, Typography, Button, Box, Chip } from "@mui/material";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import Carosel from "../Elements/Carosel";
import CircularProgress from "@mui/material/CircularProgress";

import Axios from "../../config/axios";
import { toast } from "react-toastify";

import { useSelector } from "react-redux";
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
  const [loading, setLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [lineTextArea, setLineTextArea] = useState(1);
  const [files, setFiles] = useState([]);
  const inputFile = useRef();
  const userState = useSelector((state) => state.user);
  const userInfo = userState.infoUser;

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const url = "/api/post/create";
      const data = new FormData(event.currentTarget);
      console.log({
        content: data.get("content"),
        files,
        type: 0,
        class_id: 0,
        tags: selectedTags,
      });

      data.append("user_id", userInfo.id);
      data.set("files", files);
      data.append("type", 0);
      data.append("class_id", 0);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      const token = localStorage.getItem("token");

      config.headers.Authorization = "Bearer " + token;

      setLoading(true);
      const res = await Axios.post(url, data, config);

      if (res.statusCode === 0) {
        toast.success("Post created successfully");
        props.handleClose();
      } else {
        toast.error(res.message);
      }

      console.log(res);
    } catch (error) {
      console.log("Error: ", error);
      toast.error(error);
    } finally {
      setLoading(false);
    }
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
                fontSize: "15px",
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

          <Typography variant="body1">Content: </Typography>
          <textarea
            required
            fullWidth
            id="content"
            label="Nội dung bài viết của bạn"
            name="content"
            autoFocus={true}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
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
            sx={{ mt: 3, mb: 2, p: 1.5 }}
          >
            {loading ? (
              <CircularProgress
                thickness={5}
                size={25}
                sx={{
                  color: "white",
                  height: "20px",
                  width: "20px",
                }}
              />
            ) : (
              "Create Post"
            )}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalPostBlog;
