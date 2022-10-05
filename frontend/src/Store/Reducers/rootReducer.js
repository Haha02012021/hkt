import appReducer from "./appReducer";
import userReducer from "./userReducer";

import { combineReducers } from "redux";

const rootReducers = combineReducers({
  app: appReducer,
  user: userReducer,
});

export default rootReducers;
