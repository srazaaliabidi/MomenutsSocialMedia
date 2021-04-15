<<<<<<< HEAD
import React, {useEffect} from 'react';
=======
import React, { useEffect, useState } from 'react';
>>>>>>> 1235101ab91d5cdfa550b7d1ee40dd39878aeb47
import ReactDOM from 'react-dom';
// import '../App.css';
import Post from '../components/Post';
import logo from '../assets/momentuslogo.png';
const axios = require ('axios');

/*
20 or so most recent posts from the users the logged in users follows
Basically the equivalent of the feed on FB
(used to be named Home)

TODO: make it so it pulls posts from users you are following,
right now it just pulls 20 recent posts from everyone
*/

<<<<<<< HEAD
function Stream () {
  let posts = [];
  axios.get ('/getHome').then (res => {
    posts = res.data.output;
  });
=======

function Stream() {
  const [posts, setPosts] = useState([]);
  const addPost = (newPost) => setPosts(state => [...state, newPost])
  React.useEffect(() => {
    axios.get('/getHome').then(response => 
      response.data.forEach(post => addPost(post))
    )
  }, [])
>>>>>>> 1235101ab91d5cdfa550b7d1ee40dd39878aeb47

  return (
<<<<<<< HEAD
    <div class="centergrid">
      <div className="Stream">
        {posts.map (post => (
          <div id="post" className="Post" key={post.postID}>
            <Post post={post} />
          </div>
        ))}
      </div>
=======

    <div className = "Stream">
      {posts.map(post => (
        <div id = "post" className = "Post" key = {post.postID}>
          <Post post= {post}/>
        </div>
      ))}
>>>>>>> 1235101ab91d5cdfa550b7d1ee40dd39878aeb47
    </div>
  );
}

export default Stream;
