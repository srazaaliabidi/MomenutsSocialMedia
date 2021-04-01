import React from "react";



function ProfilePic(props) {
    return (
    <div>
        PFP
      <img
        className="ProfilePic"
        src={props.pfpurl}
        alt={props.name}
      />
    </div>
    );
}

function UserInfo(props) {
    return (
      <div className="UserInfo">
        <ProfilePic user={props} />
        <div className="UserInfo-name">Username: {props.name}</div>
      </div>
    );
}

function Post(props) {
    // Will use this to dynamically display correct post type
    //const postType = props.postType;
    return (
      <div className="Post">
          text: {props.text}
        <div className="UserInfo">
            <UserInfo user={props.user} />
        </div>
        <div className="Post-date">
          Posted on: {props.date}
        </div>
        <div className="Post-caption">
          Caption: {props.caption}
        </div>
      </div>
    );
}

 

 /*  ReactDOM.render(
    <Post
      date={dummyPost.date}
      caption={dummyPost.caption}
      author={dummyPost.author}
    />,
    document.getElementById('root')
  ); */

  export default Post;