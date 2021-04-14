import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
// import '../App.css';
import Post from '../components/Post';
import logo from '../assets/momentuslogo.png';
const axios = require('axios');

/*
20 or so most recent posts from the users the logged in users follows
Basically the equivalent of the feed on FB
(used to be named Home)

TODO: make it so it pulls posts from users you are following,
right now it just pulls 20 recent posts from everyone
*/

function Stream() {
  let posts = {};
  axios.get('/getHome')
  .then(res => {
    posts = res.data.output;
  });


  return (
    <div className = "Stream">
      {posts.map(post => (
        <div id = "post" className = "Post" key = {post.postID}>
          <Post post= {post}/>
        </div>
      ))}
    </div>
  );
}

export default Stream;
