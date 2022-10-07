import actionTypes from "./actionTypes";
import { handleLoginApi } from "../../Services/auth";

export const userLoginSuccess = (payload) => ({
  type: actionTypes.USER_LOGIN_SUCCESS,
  payload: payload,
});

export const userLogoutSuccess = () => ({
  type: actionTypes.USER_LOGOUT_SUCCESS,
});

export const userLogin = (data) => {
  return async (dispatch) => {
    try {
      const res = await handleLoginApi(data);
      console.log(res);
      if (res.success === true) {
        dispatch(userLoginSuccess(res.data.user));
        return true;
      }
      return false;
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
