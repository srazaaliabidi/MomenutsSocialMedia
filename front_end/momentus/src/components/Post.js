import React, {useState} from 'react';
import {useDispatch, connect} from 'react-redux';
import '../pages/styles/post.css';
import {
  submitComment,
  loadComments,
  deletePost,
} from '../redux/actions/postActions';

// this is to figure out who is logged in
const select = appState => ({
  userID: appState.postReducer.postID,
});

/* 
Post consists of the content and user info
We can rearrange the stuff as needed
TODO: add comments/likes/reposts
TODO: add video post
*/
function Post({post, userID}) {
  const dispatch = useDispatch ();
  const isOwnPost = false;
  const type = post.type;
  // check to see if post is own, adjust options accordingly
  if (userID === post.userID) {
    isOwnPost = true;
  }
  if (type == 'text') {
    return (
      <div class="post">
        <div className="User-info">
          <div className="Profilepic-post"><img src={post.pfpURL} /></div>
          <div className="Username-post">@{post.username}</div>
        </div>
        <div className="Post-content">
          <div className="Post-date">Posted on {post.dateCreated}</div>
          <br />
          <br />
          {post.content}
        </div>
      </div>
    );
  } else if (type == 'photo') {
    return (
      <div class="Post">
        <div class="userinfo">
          <div class="Profilepic-post">
            <img src={post.pfpURL} />
          </div>
          <div class="Username-post">@{post.username}</div>
          <div class="Post-date">Posted on {post.dateCreated}</div>
        </div>
        <div class="post-content">
          <div class="Post-photo">
            <img src={post.contentURL} />
          </div>
          <div class="Post-caption">{post.caption}</div>
        </div>

      </div>
    );
  }
}

export default connect (select) (Post);
