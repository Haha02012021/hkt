import React from "react";
import { Box, Stack, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import ImageHeader from "../../Assets/Image/img_bookclub.jpg";
import FileUpLoad from "../../Components/Page/FileUpLoad";

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
        <Grid sx={{ display: "flex", flexDirection: "row" }} container>
          <Grid item xs={2}>
            Chua hoan thanh
          </Grid>
          <Grid xs={10}>
            <Box>Upfile</Box>
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
