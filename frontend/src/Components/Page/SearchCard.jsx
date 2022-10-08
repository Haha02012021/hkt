import React, { useState } from "react";
import { Box, Grid } from "@mui/material";

const styles = {
  tag: {
    cursor: "pointer",
    color: "gray",
    wordWrap: "none",
    backgroundColor: "#e1ecf4",
    borderRadius: "4px",
    padding: "4px",
    height: "32px",
    "&:hover": {
      backgroundColor: "#bfdff7",
    },
  },
};
const SearchCard = (props) => {
  const [blog, setBlogs] = useState(props.item);
  return (
    <Box
      sx={{
        width: "300px",
        height: "200px",
        border: "1px solid #cccccc",
        borderRadius: "5px",
      }}
    >
      <Box sx={{ margin: "15px 0 0 15px" }}>
        <Box sx={{ textAlign: "left", marginTop: "10px" }}>
          {blog.content.length > 120
            ? blog.content.substring(0, 120)
            : blog.content}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            height: "60px",
            gap: "5px",
          }}
        >
          {blog && blog.has_tags && blog.has_tags.length > 0
            ? blog.has_tags.map((tag, i) => {
                return (
                  <Box sx={styles.tag} key={i}>
                    {`${tag.name}`}
                  </Box>
                );
              })
            : null}
        </Box>
      </Box>
    </Box>
  );
};

export default SearchCard;
