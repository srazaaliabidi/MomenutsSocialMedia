const initialState = {
    postID: "",
    userID: "",
    title: "",
    caption: "",
    type: "",
    contentURL: "",
    content: "",
    dateCreated: ""
  };
  
  const listingReducer = (state = initialState, action) => {
    switch (action.type) {
      case "LOAD_POSTS_SUCCESS":
        return { ...state, posts: action.payload };
      case "DELETE_POST_SUCCESS":
        return state;
      case "UPDATE_LISTING":
        return { ...state, ...action.payload };
  
      default:
        return state;
    }
  };
  
  export default listingReducer;
  