import actionTypes from "../Actions/actionTypes";
const initialState = {
  isLogin: false,
  infoUser: {},
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        isLogin: true,
        infoUser: action.payload,
      };
    case actionTypes.USER_LOGOUT_SUCCESS:
      return {
        ...state,
        isLogin: false,
        infoUser: {},
      };
    case actionTypes.USER_SIGNUP_SUCCESS:
      return {
        ...state,
        isLogin: true,
        infoUser: action.payload,
      };
    default:
      return state;
  }
};

export default appReducer;
