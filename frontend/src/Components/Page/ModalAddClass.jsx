import React, { useState, useEffect } from "react";
import { Modal, TextField, Button, Box, Chip } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Select from "react-select";
import { toast } from "react-toastify";
import { handleGetOtherUsersApi } from "../../Services/app";

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

const ModalPostBlog = (props) => {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const getOptions = async () => {
      const res = await handleGetOtherUsersApi();
      if (res && res.statusCode === 0) {
        setOptions(res.data);
      }
    };
    getOptions();
  }, []);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log({
        name: data.get("nameClass"),
        students: students,
      });
    } catch (error) {
      console.log("Error: ", error);
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (selected, name) => {
    const emails = selected.map((s) => s.value);
    setStudents(emails);
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
          ></TextField>
          <Box>
            <Select
              defaultValue={[]}
              isMulti
              name="colors"
              id="student"
              options={options}
              className="basic-multi-select"
              onChange={handleChange}
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
              "Tạo mới"
            )}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalPostBlog;
