import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
// import '../App.css';
import Post from '../components/Post';
import './styles/userposts.css';
const axios = require('axios');


/*
Will find all posts of users and display them on page
*/

function UserPosts(props) {
    /*
  const [collections, setCollections] = useState([]);
  const addCollection = newCollection => setCollections(state => [...state, newCollection]);
  React.useEffect(() => {
    try {
      axios
        .get('/getCollections')
        .then(response => response.data.forEach(collection => addCollection(collection)));
    }
    catch (err) {
      console.error(err.message);
    }

  }, []);*/

    let userID = props.userID;
    const [posts, setPosts] = useState([]);
    const addPost = newPost => setPosts(state => [...state, newPost]);
    React.useEffect(() => {
      let postURL = "/getPosts?userID=" + userID;
      //console.log(postURL)
      try {
        axios
          .post(postURL)
          .then(response => {
            //console.log(response)
            //console.log(response.data)
            response.data.forEach(post => addPost(post))
          });
      }
      catch (err) {
        console.error(err.message);
      }

    }, []);
  

  return (
  <div className="user-stream">
      {posts.map(post => (
        <div className="user-post-stream" key={post.postID}>
          <Post post={post} />
        </div>
      ))}
    </div>
  );
}

export default UserPosts;
