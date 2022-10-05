import React from "react";
import * as actions from "../../Store/Actions/index";
import { useSelector, useDispatch } from "react-redux";

const Section1 = () => {
  const dispatch = useDispatch();
  const started = useSelector((state) => state.app.started);
  const click = () => {
    dispatch(actions.appStartUpComplete());
  };
  return (
    <div>
      <button onClick={click}>Click</button>
      <div>Content: {started ? "TRue" : "False"}</div>
    </div>
  );
};

export default Section1;
