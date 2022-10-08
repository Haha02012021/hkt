import React from "react";
import { Container, Box, Avatar } from "@mui/material";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";

const FileUpLoad = (props) => {
  return (
    <Container
      sx={{
        border: "1px solid gray",
        borderRadius: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "row",
          gap: "10px",
          paddingTop: "10px",
        }}
      >
        <Avatar sx={{ width: "30px", height: "30px" }} />
        <Box>Name</Box>
        <i style={{ fontSize: "12px", paddingTop: "5px" }}>Time</i>
      </Box>
      <Box sx={{ textAlign: "left", paddingTop: "5px" }}>Description</Box>
      <Box
        sx={{
          marginTop: "10px",
          border: "1px solid gray",
          width: "200px",
          height: "50px",
          borderRadius: "10px",
          marginBottom: "10px",
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        <Box sx={{ display: "flex", gap: "5px", padding: "5px 0 0 10px" }}>
          <TextSnippetIcon sx={{ fontSize: "40px", color: "gray" }} />
          <Box sx={{ fontWeight: "bold", fontSize: "14px" }}>Name</Box>
        </Box>
      </Box>
    </Container>
  );
};

export default FileUpLoad;
