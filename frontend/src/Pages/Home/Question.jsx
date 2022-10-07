import React from "react";
import * as actions from "../../Store/Actions/index";
import { Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

const Question = () => {
  const dispatch = useDispatch();
  const click = () => {
    dispatch(actions.appStartUpComplete());
  };
  return (
    <Box sx={{ width: "100%", height: "100%", backgroundColor: "black" }}>
      Question
    </Box>
  );
};

export default Question;
