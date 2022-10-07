import actionTypes from "./actionTypes";
import { handleLoginApi, handleSignUpApi } from "../../Services/auth";
import { toast } from "react-toastify";

export const userLoginSuccess = (payload) => ({
  type: actionTypes.USER_LOGIN_SUCCESS,
  payload: payload,
});

export const userLogoutSuccess = () => ({
  type: actionTypes.USER_LOGOUT_SUCCESS,
});

export const userSignUpSuccess = (payload) => ({
  type: actionTypes.USER_SIGNUP_SUCCESS,
  payload: payload,
});

export const userLogin = (data) => {
  return async (dispatch) => {
    try {
      const res = await handleLoginApi(data);
      if (res.statusCode === 0) {
        toast.success(res.message);
        dispatch(userLoginSuccess(res.data.user));
        return true;
      }
      toast.error(res.message);
      return false;
    } catch (err) {
      console.error(err);
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

export const userSignUp = (data) => {
  return async (dispatch) => {
    try {
      const res = await handleSignUpApi(data);
      if (res.statusCode === 0) {
        toast.success(res.message);
        dispatch(userSignUpSuccess(res.data.user));
        return true;
      }
      toast.error(res.message);
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
};
