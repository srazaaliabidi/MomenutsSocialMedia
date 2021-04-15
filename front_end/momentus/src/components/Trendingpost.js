import React, {useEffect, useState} from 'react';
import App from '../App';
import '../pages/styles/sidebar.css';
const axios = require ('axios');

/*
Top 5 trending posts to be placed in sidebar
TODO: Add in logic to get trending posts and actually add them lol
*/

function Trendingpost () {
  const [posts, setPosts] = useState ([]);
  const addPost = newPost => setPosts (state => [...state, newPost]);
  React.useEffect (() => {
    axios
      .get ('/getTrending')
      .then (response => response.data.forEach (post => addPost (post)));
  }, []);

  return (
    <div class="trending-sidebar">
      <div class="trendingstream">
        {posts.map (post => <img src={post.pfpURL} />)}
      </div>
    </div>
  );
}

export default Trendingpost;
