import React, { useState } from "react";
import { Box, Stack, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import ImageHeader from "../../Assets/Image/img_bookclub.jpg";
import FileUpLoad from "../../Components/Page/FileUpLoad";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import SendIcon from "@mui/icons-material/Send";

const styles = {
  boxHeader: {
    backgroundImage: `url(${ImageHeader})`,
    width: "100%",
    height: "250px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "10px",
    display: "flex",
    alignItems: "flex-end",
    marginBottom: "20px",
  },
};
const ClassRoom = () => {
  const { id } = useParams();
  const [file, setFile] = useState({});
  const exercises = [
    { des: "1", file: "1" },
    { des: "2", file: "1" },
    { des: "<Box>Upfile</Box>", file: "1" },
  ];
  return (
    <Box sx={{ height: "1000px", maxWidth: "960px" }}>
      <Box sx={styles.boxHeader}>
        <Box>
          <Box
            sx={{
              fontSize: "50px",
              color: "white",
              textTransform: "uppercase",
              paddingLeft: "20px",
            }}
          >
            UETCLASS
          </Box>
          <Box
            sx={{
              textAlign: "left",
              paddingLeft: "20px",
              paddingBottom: "30px",
              color: "white",
            }}
          >
            Teacher
          </Box>
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          sx={{ display: "flex", flexDirection: "row" }}
          spacing={2}
          container
        >
          <Grid
            item
            xs={2}
            sx={{
              height: "150px",
              border: "1px solid gray",
              borderRadius: "10px",
              marginTop: "15px",
            }}
          >
            Chua hoan thanh
          </Grid>
          <Grid item xs={10}>
            <Box
              sx={{
                borderRadius: `${file ? "40px" : "10px"}`,
                border: "1px solid gray",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Box
                  sx={{ paddingLeft: "10px", paddingTop: "5px", color: "gray" }}
                >
                  <label>
                    <UploadFileIcon />
                  </label>
                </Box>
                <input
                  type="text"
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    outline: "none",
                    width: "90%",
                    height: "40px",
                  }}
                ></input>
                <SendIcon />
              </Box>
              {Object.keys(file).length ? <Box>File</Box> : null}
            </Box>

            <Stack sx={{ gap: "25px" }}>
              {exercises.map((exercises) => (
                <FileUpLoad />
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ClassRoom;
