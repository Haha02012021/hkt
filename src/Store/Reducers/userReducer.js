import actionTypes from "../Actions/actionTypes";
const initialState = {
  isLogin: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLogin: true,
      };
    case actionTypes.USER_LOGOUT_SUCCESS:
      return {
        ...state,
        isLogin: false,
      };
    default:
      return state;
  }
};

export default appReducer;
