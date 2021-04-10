import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
// import '../App.css';
import Post from '../components/Post';
import PostContent from '../components/PostContent';
import logo from '../assets/momentuslogo.png';
const axios = require('axios');


// this will house the vertical prototype for now... will change later of course

// this won't pass through right now lol
// const dummyPost = {
//     date: new Date(),
//     caption: 'Test post!!!!!',
//     user: {
//       name: 'Coolio',
//       pfpurl: '../bluecircle.png',
//     }
//   };

const dummyPost = { postID: 1, text: "ppeeeep" };




function Home() {
  const [posts, setPosts] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  useEffect(() => {
    fetch('/api/getAllPosts')
      .then(res => res.json())
      .then(
        (result) => {
          setPosts(result);
          console.log(result);
        },
        (error) => {
          console.log(error)
        }
      )
      .then(fetch('/api/getAllUsers')
        .then(res => res.json())
        .then(
          (result) => {
            setUsers(result);
            console.log(result);
          },
          (error) => {
            console.log(error)
          }
        )


      )
  }, [])




  /*   function processPosts(data) {
      for (let i = 0; i < data.length; i++) {
        const newPost = {
          postID: data[0].postID,
          userID: data[0].userID,
          text: data[0].text
        };
        console.log(data[0].postID);
        posts.push(newPost);
      }
    } */


  return (
    <div>
      <header className="App-header">
        <img src={logo} className="Momentus-logo" alt="Momentus" />
      </header>
      <div className="Users">
      </div>
      <div className="Posts">
        {posts.map(post => (
          <div className="Post" key={post.postID}>
            <Post post={post} />
          </div>
        ))}

      </div>
    </div>

  );
}

export default Home;
