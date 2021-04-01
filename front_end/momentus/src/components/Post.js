import React, { useEffect } from 'react';
import PostContent from "./PostContent";
import UserInfo from "./UserInfo";

// will make more modular in the future... 
/* function Post(props) {
    let post = props.post;
    let user = props.user;

    return (
      <div className = "Post">
          <UserInfo user = {user}/>
            <PostContent post = {post}/>
      </div>
    );
} */

function Post(props) {
    let id = props.post.postID;
    let text = props.post.text;
    let caption = props.post.caption;
    let type = props.post.type;
    let contentURL = props.post.contentURL;
    let date = props.post.dateCreated;
    let userID = props.post.userID;
    let username = props.post.username;
    let pfpURL = props.post.pfpURL;
    /* // need to get username and pfp from userID
    useEffect(() => {
        fetch(`/api/user/${userID}`)
        .then(res => res.json())
        .then(
          (result) => {
            setUserInfo(result);
            console.log(result);
          },
          (error) => {
            console.log(error)
          }
        )
      }, []) */
      if (type == 'text') {
        return (
            <div className = "Post">
                <div className = "User-info">
            <div className = "Profilepic-post"><img src = {pfpURL}></img></div>
            <div className = "Username-post">Posted by {username}</div>
            </div>
            <div className = "Post-content">
            {text}
            <div>Posted on {date}</div>
          </div>
          </div>
        );
      }

      else {
        return (
            <div className = "Post">
                <div className = "User-info">
            <div className = "Profilepic-post"><img src = {pfpURL}></img></div>
            <div className = "Username-post">Posted by {username}</div>
            </div>
          <div className = "Post-content">
            <div className = "Post-photo"><img src = {contentURL}/></div>
            <div>Posted on {date}</div>
            
          </div>
          </div>
        );
      }
   
    
}


export default Post;