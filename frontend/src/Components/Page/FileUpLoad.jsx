import React from "react";
import { Container, Box, Avatar } from "@mui/material";

const FileUpLoad = (props) => {
  return (
    <Container sx={{ border: "1px solid gray", borderRadius: "10px" }}>
      <Box sx={{ display: "flex" }}>
        <Avatar sx={{ width: "30px", height: "30px" }} />
        <Box>Name</Box>
        <i>Time</i>
      </Box>
      <Box>Description</Box>
      <Box>File</Box>
    </Container>
  );
};

export default FileUpLoad;
