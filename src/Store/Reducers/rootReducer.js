import appReducer from "./appReducer";

import { combineReducers } from "redux";

const rootReducers = combineReducers({
  appReducer: appReducer,
});

export default rootReducers;
