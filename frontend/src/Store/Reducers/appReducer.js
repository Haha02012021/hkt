import actionTypes from "../Actions/actionTypes";
const initialState = {
  started: true,
  notifications: []
};

console.log(initialState.notifications);

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
    case actionTypes.RECEIVE_NOTIFICATION:
      return {
        ...state,
        notifications: [...action.payload, ...state.notifications],
      }
    case actionTypes.UPDATE_NOTIFCATION:
      return {
        ...state,
        notifications: action.payload,
      }
    default:
      return state;
  }
};

export default appReducer;
