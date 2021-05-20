import React, { Component, useEffect, useState } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Switch,
  useParams,
} from "react-router-dom";
import SearchResults from '../pages/searchresults';
import NavigationBar from './NavigationBar';
import TrendingSideBar from './TrendingSideBar';
import CollectionSidebar from './CollectionSidebar';
import SinglePostComment from './singlepostcomment';
import axios from "axios";

import { createStore, applyMiddleware } from "redux";
import rootReducer from "../redux/reducers/rootReducer";
import { Provider, useDispatch } from "react-redux";
import { useSelector, connect } from "react-redux";
import { createBrowserHistory } from "history";
import { useHistory } from "react-router-dom";

import "./styles/individualpost.css";

const select = (appState) => ({
  isLoggedIn: appState.loginReducer.isLoggedIn,
  username: appState.loginReducer.username,
  _id: appState.loginReducer._id,
});

// individual post page

function IndividualPost({ isLoggedIn, username, _id, pfpURL }) {
  const history = useHistory();
  const { postID } = useParams();
  const [newPostID, setNewPostID] = useState(); // for url
  const [post, setPost] = useState();
  const [comments, setComments] = useState();
  const [favorited, isFavorited] = useState(false);
  const [newComment, setNewComment] = useState();
  const addPost = (newPost) => setPost((state) => [...state, newPost]);

  let counter = 1;
  let loadedPost = [];
  // grab post info
  React.useEffect(() => {
    getPost();
    getComments();
    console.log(comments);
    //getComments()
  });

  function favoritePost() {
    // add to user favs
    let favoriteURL = "/favorite?postID=" + postID;
    //console.log(favoriteURL)
    try {
      axios.post(favoriteURL).then((res) => {
        console.log(res);
        //if favorite succeeded, reload to show updated favorite count
        if (res.data == "1") {
          history.push(`/post/${postID}`);
          history.go(0);
        }
      });
    } catch (err) {
      console.error(err.message);
    }
  }

  function getPost() {
    if (post == undefined) {
      let getPostURL = "/getPostByID?postID=" + postID;
      console.log(getPostURL);
      try {
        axios.post(getPostURL).then((res) => {
          loadedPost = res.data[0];
          // store post info
          setPost(loadedPost);
        });
      } catch (err) {
        console.error(err.message);
      }
    }
  }

  function getComments() {
    // comments is an array of json objects
    if (comments == undefined && post != undefined) {
      setComments(post.comments);
    }
  }

  function updateNewComment(e) {
    setNewComment(e.target.value);
  }

  function handleComment(e) {
    e.preventDefault();
    try {
      axios
		  .post("/addComment", {
			  postID: postID,
          comment: newComment,
        })
        .then((response) => {
          console.log("Comment uploaded!");
        });
    } catch (err) {
      console.error(err.message);
	}
	  history.go(0)
  }

  return (
    <div>
      {post != undefined ? (
        <div>
          <div className="post">
            <div className="post-info">
              <img className="profilepic-post" src={post.pfpURL} />
              <div class="post-details">
                <h1>@{post.username}</h1>
                <h2>Posted on {post.dateCreated}</h2>
              </div>
            </div>
              {post.type=="photo"?(
                  <div className="post-content">
                      <p class="post-caption">{post.caption}</p>
                      <div className="post-photo">
                          <img src={process.env.PUBLIC_URL + post.contentURL} />
                      </div>
                  </div>
              ):(
                  <div className="post-content">
                      <p className="content">{post.content}</p>
                  </div>

              )}
            <div className="post-favorites">
              {post.numFav != null ? (
                <div className="post-num-favorites">
                  {post.numFav} 
              <button onClick={favoritePost} className="favorite-button">❤</button>
                </div>
              ) : (
                <div className="post-num-favorites">0  
              <button onClick={favoritePost} className="favorite-button">❤</button></div>
              )}
            </div>
				  </div>
				  <div className="comment-input-wrap">
<form onSubmit={(e) => handleComment(e)}>
                <input
                  id="new-comment"
                  className="new-comment"
                  name="new-comment"
                  value={newComment}
                  placeholder="Thoughts?"
                  onChange={(e) => updateNewComment(e)}
                />
					  </form>
					  </div>
          {comments != undefined && comments.length > 0 ? (
				<div class="comment-wrap">
						  
              {comments.map((comment) => (
                <div className="post-comments" key={comment.commentID}>
                  <SinglePostComment comment={comment} />
                </div>
              ))}
            </div>
          ) : (
            <div className="comment-wrap">
              No comments yet. Add your thoughts!
            </div>
          )}
        </div>
      ) : (
        <div>Loading post...</div>
      )}
    </div>
  );
}

export default connect(select)(IndividualPost);
