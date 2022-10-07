import React from "react";
import * as actions from "../../Store/Actions/index";
import { Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

const Question = () => {
  const dispatch = useDispatch();
  const click = () => {
    dispatch(actions.appStartUpComplete());
  };
  return <Box>Question</Box>;
};

export default Question;
