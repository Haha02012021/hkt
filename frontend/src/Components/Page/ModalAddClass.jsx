import React, { useState, useRef } from "react";
import { Modal, TextField, Button, Box, Chip } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { toast } from "react-toastify";

const animatedComponents = makeAnimated();

const styles = {
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
    padding: "10px",
    outline: "none",
  },
};

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const ModalPostBlog = (props) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const url = "/api/post/create";
      const data = new FormData(event.currentTarget);
    } catch (error) {
      console.log("Error: ", error);
      toast.error(error);
    } finally {
      setLoading(false);
    }
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

        <Box
          style={{
            textAlign: "left",
            padding: "10px 0",
            fontWeight: "500",
            fontSize: "16px",
            textTransform: "uppercase",
          }}
        >
          Tạo lớp học mới
        </Box>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="nameClass"
            label="Tên lớp học"
            name="nameClass"
            autoComplete="nameClass"
            autoFocus
            sx={{}}
          ></TextField>
          <Box>
            <Select
              defaultValue={[]}
              isMulti
              name="colors"
              options={options}
              className="basic-multi-select"
              classNamePrefix="select"
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
