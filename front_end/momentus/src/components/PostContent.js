import React from "react";

/* 
The actual content of the posts. Combines with userInfo to make a full post.
*/
function PostContent(props) {
    const [userInfo, setUserInfo] = React.useState([]);
    let id = props.post.postID;
    let text = props.post.text;
    let caption = props.post.caption;
    let type = props.post.type;
    let contentURL = props.post.contentURL;
    let date = props.post.dateCreated;
    let userID = props.post.userID;
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

    return (
      <div className = "Post">
        
        postID: {id}
        text: {text}
      </div>
    );
}

export default PostContent;
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