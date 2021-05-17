export const userLogin = (username) => {
  return {
    type: "USER_LOGIN",
    payload: { username },
  };
};

export const getUsername = () => {
  return {
    type: "GET_USERNAME"
  };
};

export const getUserID = () => {
  return {
    type: "GET_USER_ID"
  };
};