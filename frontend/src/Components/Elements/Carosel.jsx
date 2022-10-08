import React from "react";
import Carousel from "react-material-ui-carousel";
import { Box } from "@mui/material";

const Carosel = (props) => {
  console.log(props.files);
  return (
    <Box
      sx={{
        marginTop: "20px",
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Carousel
        autoPlay={true}
        animation="slide"
        indicators={false}
        sx={{
          width: "100%",
          height: "95%",
        }}
      >
        {props.files.map((image, i) => {
          return (
            <div key={i} style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "cyan" }}>
              <img
                style={{ aspectRatio: "1/1", objectFit: "contain" }}
                src={URL.createObjectURL(image)}
              ></img>
            </div>
          );
        })}
      </Carousel>
    </Box>
  );
};

export default Carosel;
