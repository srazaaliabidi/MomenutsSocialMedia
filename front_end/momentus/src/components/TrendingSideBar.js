import React, { useEffect, useState } from 'react';
import App from '../App';
import ProfileInfo from './ProfileInfo';
import Trending from './Trending';
import { useSelector, connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import './styles/sidebar.css';
const axios = require ('axios');

// get user info to load into profile info
const select = appState => ({
  // isLoggedIn: appState.loginReducer.isLoggedIn,
  //username: appState.loginReducer.username,
  // pfpURL: appState.loginReducer.pfpURL,
});

/*
Side bar - consists of logged in user profile info and trending posts
*/

function TrendingSideBar() {
  const [posts, setPosts] = useState ([]);
  const addPost = newPost => setPosts (state => [...state, newPost]);
  React.useEffect (() => {
    axios
      .get ('/getTrending')
      .then (response => response.data.forEach(post => addPost (post)));
  }, []);

  return (
    <div class="trending-wrapper">
      <div class="trending-container">
        <div class="trending-header">
        <h1>Trending</h1>
        </div>
        <div class="trending-content-block">
          {posts.map (post => (
            <div className="trending-post" key={post.postID}>
              <a href ={"/post/"+post.postID}>
                <img src={post.contentURL} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default connect(select)(TrendingSideBar);
