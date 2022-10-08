import actionTypes from "./actionTypes";
import {
  handleLoginApi,
  handleSignUpApi,
  handleLoginByTokenApi,
} from "../../Services/auth";
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
        localStorage.setItem("token", res.data.token);
        dispatch(userLoginSuccess(res.data.user));
        return true;
      }
      toast.error(res.message);
      return false;
    } catch (err) {
      console.error("ACTION ERROR", err);
      toast.error(err.message);
      return false;
    }
  };
};

export const userLoginByToken = () => {
  return async (dispatch) => {
    try {
      if (!localStorage.getItem("token")) {
        return false;
      }
      const res = await handleLoginByTokenApi();
      if (res.statusCode === 0) {
        dispatch(userLoginSuccess(res.data));
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
        localStorage.setItem("token", res.data.token);
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
