import actionTypes from "./actionTypes";

export const userLoginSuccess = () => ({
  type: actionTypes.USER_LOGIN_SUCCESS,
});

export const userLogoutSuccess = () => ({
  type: actionTypes.USER_LOGOUT_SUCCESS,
});

export const userLogin = () => {
  return async (dispatch) => {
    try {
      dispatch(userLoginSuccess());
      return true;
    } catch (err) {
      return false;
    }
  };
};

export const userLogout = () => {
  return async (dispatch) => {
    try {
      dispatch(userLogoutSuccess());
      return true;
    } catch (err) {
      return false;
    }
  };
};
