import React from "react";
//import PostContent from "./PostContent";
//import UserInfo from "./UserInfo";

function Post(props) {
    return (
      <div className = "Post">
        postID: {props.postID}
        text: {props.text}
      </div>
    );
}

export default Post;