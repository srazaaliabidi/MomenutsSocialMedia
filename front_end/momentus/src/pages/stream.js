import React, { useEffect, useState } from 'react';
// import '../App.css';
import Post from '../components/Post';
import CreatePost from '../components/CreatePost'
import { connect } from 'react-redux';
const axios = require('axios');

/*
20 or so most recent posts from the users the logged in users follows
Basically the equivalent of the feed on FB
(used to be named Home)

TODO: make it so it pulls posts from users you are following,
right now it just pulls 20 recent posts from everyone
*/

const select = appState => ({
	isLoggedIn: appState.loginReducer.isLoggedIn,
	username: appState.loginReducer.username,
	_id: appState.loginReducer._id,
  })

function Stream() {
  const [posts, setPosts] = useState([]);
  const addPost = newPost => setPosts(state => [...state, newPost]);
  React.useEffect(() => {
    try {
      axios
        .get('/getHome')
        .then(response => response.data.forEach(post => addPost(post)));
    }
    catch (err) {
      console.error(err.message);
    }

  }, []);

  return (
    <div className="stream">
      <CreatePost />
      {posts.map(post => (
        <div className="post-stream" key={post.postID}>
          <Post post={post} />
        </div>
      ))}
    </div>
  );
}

export default connect(select)(Stream);
