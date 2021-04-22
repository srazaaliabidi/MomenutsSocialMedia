import axios from "axios";

/*
Some of these may not be needed, and some more may be needed 
They are modified from my previous 667 project, so any terminology 
discrepancies are likely due to that, ask me if clarification is needed - Matt
*/

// for verifying if comment was posted
export const submitCommentSuccess = (comment, post) => {
  return {
    type: "SUBMIT_COMMENT_SUCCESS",
    payload: { comment, post },
  };
};

export const getPostAuthor = () => {
  return {
    type: "GET_POST_AUTHOR",
  }
}

/* needs modification to backend first before implementing these
export const submitComment = (comment, post) => {
  return (dispatch) => {
    axios
      .post(`/api/makeInquiry?listingId=${listing.id}`, { message })
      .then((res) => {
        dispatch(submitInquirySuccess(message, listing));
      });
  };
};


export const loadCommentsSuccess = (inquiries) => {
  return {
    type: "LOAD_INQUIRY_SUCCESS",
    payload: { inquiries },
  };
};
export const loadComments = (listing) => {
  return (dispatch) => {
    axios.get(`/api/getInquiries?listingId=${listing.id}`).then((res) => {
      dispatch(loadInquiriesSuccess(res.data.inquiries));
    });
  };
}; */


export const deletePostSuccess = (message) => {
  return {
    type: "DELETE_POST_SUCCESS",
    payload: { message },
  };
};

// TODO: add delete functionality to backend
/* export const deletePost = (post) => {
  return (dispatch) => {
    axios.get(`/api/deleteListing?id=${listing.id}`).then((res) => {
      dispatch(deleteListingSuccess(res.status));
    });
  };
}; */

// for post creation
export const submitPostSuccess = (post) => {
  return {
    type: "SUBMIT_POST_SUCCESS",
    payload: { post },
  };
};

/* export const submitListing = (post) => {
  return (dispatch) => {
    axios.post(`/api/createListing`, { ...post }).then((res) => {
      dispatch(submitInquirySuccess(post));
      dispatch(loadListings());
    });
  };
}; */

/* export const loadListings = () => {
  return (dispatch) => {
    axios.get(`/api/viewListings`).then((res) => {
      dispatch({ type: "LOAD_LISTINGS_SUCCESS", payload: res.data });
    });
  };
}; */

export const updatePost = (post) => {
  return {
    type: "UPDATE_POST",
    payload: post,
  };
};
