import actionTypes from "../Actions/actionTypes";
const initialState = {
  isLogin: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.APP_START_UP_COMPLETE:
      return {
        ...state,
        started: !state.started,
      };
    case actionTypes.APP_START_UP_FALSE:
      return {
        ...state,
        started: true,
      };
    default:
      return state;
  }
};

export default appReducer;
