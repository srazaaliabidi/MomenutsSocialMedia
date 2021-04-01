import React from "react";

// user info for post
function UserInfo(username, pfpURL) {
    return (
        <div className = "User-info">
        <div className = "Profilepic-post"><img src = {pfpURL}></img></div>
        <div className = "Username-post">Posted by {username}</div>
        </div>
    );
}

export default UserInfo;