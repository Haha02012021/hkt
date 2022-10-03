const initialState = {
  started: true,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 1:
      return {
        ...state,
        random: action.payload,
      };
    default:
      return state;
  }
};

export default appReducer;
