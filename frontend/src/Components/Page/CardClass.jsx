import React from "react";
import { Box, Avatar } from "@mui/material";
import ImageHeader from "../../Assets/Image/img_bookclub.jpg";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
const styles = {
  boxHeader: {
    backgroundImage: `url(${ImageHeader})`,
    width: "100%",
    height: "100px",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
};
const CardClass = (props) => {
  return (
    <Box
      sx={{
        width: "300px",
        height: "300px",
        borderRadius: "5px",
        border: "1px solid gray",
        overflow: "hidden",
        position: "relative",
        "&:hover": {
          cursor: "pointer",
        },
      }}
    >
      <Box style={styles.boxHeader}>
        <Box
          sx={{
            fontSize: "25px",
            color: "white",
            width: "250px",
            wordWrap: "break-word",
            textTransform: "uppercase",
            paddingTop: "10px",
            paddingLeft: "10px",
            textAlign: "left",
            "&:hover": {
              textDecoration: "underline",
              cursor: "pointer",
            },
          }}
        >
          {props.item.name}
        </Box>
        <Box
          sx={{
            color: "white",
            width: "250px",
            wordWrap: "break-word",
            paddingLeft: "10px",
            textAlign: "left",
          }}
        >
          {props.item.nameTeacher}
        </Box>
        <Avatar
          alt={props.item.nameTeacher}
          sx={{
            width: "75px",
            height: "75px",
            position: "absolute",
            right: "10px",
            top: "70px",
            backGroundColor: "#a0c3ff",
          }}
        />
      </Box>
      <Box
        sx={{
          height: "50%",
          backGroundColor: "white",
          borderBottom: "1px solid gray",
        }}
      ></Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "15%",
          justifyContent: "flex-end",
        }}
      >
        <Box
          sx={{
            width: "40px",
            height: "40px",
            marginRight: "10px",
            borderRadius: "50%",
            "&:hover": {
              backgroundColor: "#d8d8d8",
            },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FolderOpenIcon />
        </Box>
      </Box>
    </Box>
  );
};

export default CardClass;
