import actionTypes from "./actionTypes";
import { handleLoginApi } from "../../Services/auth";

export const userLoginSuccess = () => ({
  type: actionTypes.USER_LOGIN_SUCCESS,
});

export const userLogoutSuccess = (payload) => ({
  type: actionTypes.USER_LOGOUT_SUCCESS,
  payload: payload,
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
