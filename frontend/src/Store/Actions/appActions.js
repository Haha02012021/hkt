import { toast } from "react-toastify";
import actionTypes from "./actionTypes";

export const appStartUpComplete = () => ({
  type: actionTypes.APP_START_UP_COMPLETE,
});

export const appStartUpFail = () => ({
  type: actionTypes.APP_START_UP_FALSE,
});

export const receiveNotificationSuccess = (payload) => ({
  type: actionTypes.RECEIVE_NOTIFICATION,
  payload,
})

export const updateNotificationSuccess = (payload) => ({
  type: actionTypes.UPDATE_NOTIFCATION,
  payload,
})

export const receiveNotification = (data) => {
  return (dispatch) => {
    try {
      dispatch(receiveNotificationSuccess(data))
      return true;
    // eslint-disable-next-line no-unreachable
    } catch (err) {
      console.error("ACTION ERROR", err);
      toast.error(err.message);
      return false;
    }
  }
}

export const updateNotification = (data) => {
  return (dispatch) => {
    try {
      dispatch(updateNotificationSuccess(data))
      return true;
    // eslint-disable-next-line no-unreachable
    } catch (err) {
      console.error("ACTION ERROR", err);
      toast.error(err.message);
      return false;
    }
  }
}
