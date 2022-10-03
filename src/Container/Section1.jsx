import React from "react";
import { appStartUpComplete } from "../Store/Actions/index";
import * as actions from "../Store/Actions/index";
import { useSelector, useDispatch } from "react-redux";

const Section1 = () => {
  const dispatch = useDispatch();
  const started = useSelector((state) => state.appReducer.started);
  const click = () => {
    dispatch(appStartUpComplete());
    dispatch(actions.appStartUpFail());
  };
  return (
    <div>
      <button onClick={click}>Click</button>
      <div>Content: {started ? "TRue" : "False"}</div>
    </div>
  );
};

export default Section1;
