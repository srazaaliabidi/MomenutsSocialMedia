const initialState = {
  _id: "",
  username: "",
  isLoggedIn: false,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return {
        ...state,
        username: action.payload.username,
        _id: action.payload._id,
        isLoggedIn: true,
      };
    case "GET_USERNAME":
      return state.username;
    case "GET_USER_ID":
      return state._id;
    case "USER_LOGOUT":
      return initialState;
    default:
      return initialState;
  }
};

export default loginReducer;
