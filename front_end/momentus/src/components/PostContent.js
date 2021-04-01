import React from "react";


/* function ProfilePic(props) {
    return (
    <div>
        PFP
      <img
        className="ProfilePic"
        src={props.pfpURL}
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
} */

// line comments are ones to keep
// grab userID and use it to get user info
// function PostContent(props) {
//     // Will use this to dynamically display correct post type
//     const postType = props.postType;
//     switch(postType) {
//         case 'text':
//             return (
//                 <div className="Post">
//                   <div className="UserInfo">
//                       <UserInfo user={props.user} />
//                   </div>
//                   <div className="Post-date">
//                     Posted on: {props.date}
//                   </div>
//                   <div className="Post-caption">
//                     Caption: {props.caption}
//                   </div>
//                 </div>
//               );
//         case 'photo':
//             return (
//                 <div className="Post">
//                   <div className="UserInfo">
//                       <UserInfo user={props.user} />
//                   </div>
//                   <div className="Post-date">
//                     Posted on: {props.date}
//                   </div>
//                   <div className="Photo-post-content">
//                       <img src = {props.contentURL}/>
//                   </div>
//                   <div className="Post-caption">
//                     Caption: {props.caption}
//                   </div>
//                 </div>
//               );
//         // we'll implement video later lol
//     }
// }

 

 /*  ReactDOM.render(
    <Post
      date={dummyPost.date}
      caption={dummyPost.caption}
      author={dummyPost.author}
    />,
    document.getElementById('root')
  ); */

  // export default PostContent;