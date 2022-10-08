import React, { useState, useRef } from "react";
import { Modal, Typography, Button, Box, Chip } from "@mui/material";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import Carosel from "../Elements/Carosel";
import CircularProgress from "@mui/material/CircularProgress";

import { TAGS } from "../../config/constants";

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
    width: "55vw",
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  },
};

const ModalPostQuestion = (props) => {
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
      data.delete("images[]");
      console.log({
        content: data.get("content"),
        files,
        type: 1,
        completed: 0,
        class_id: 0,
        tags: selectedTags,
      });

      data.append("user_id", userInfo.id);

      files.forEach((file) => {
        data.append("images[]", file);
      });

      data.append("type", 1);
      data.append("class_id", 0);
      data.append("completed", 0);
      selectedTags.forEach(tagId => {
        data.append("tag_ids[]", tagId)
      })

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
      props.setNewBlob();
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
          Create Question
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
              Choose what you want to ask so others can easily reach you.
            </Box>
            {TAGS.map((tag) => {
              return (
                <Chip
                  key={tag.id}
                  label={tag.name}
                  color="primary"
                  variant={selectedTags.includes(tag.id) ? "" : "outlined"}
                  clickable
                  sx={{ marginRight: "5px", marginBottom: "5px" }}
                  onClick={() => {
                    if (selectedTags.includes(tag.id)) {
                      setSelectedTags(() => selectedTags.filter((id) => id != tag.id));
                    } else {
                      setSelectedTags(() => [...selectedTags, tag.id]);
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
            <label for="images[]">
              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "15px",
                  height: "25vh",
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
              name="images[]"
              type="file"
              id="images[]"
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

export default ModalPostQuestion;
