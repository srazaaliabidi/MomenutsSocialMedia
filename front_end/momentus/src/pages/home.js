import React from 'react';
import ReactDOM from 'react-dom';
import '../App.css';
import Post from '../components/Post';


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

const dummyPost = {postID: 1, text: "ppeeeep"};


function Home() {
  let responseData = [];
// grab posts and user data for vertical prototype
// returned as an array of arrays - first posts, then users
React.useEffect(() => {
  fetch("/api/prototype")
    //.then((res) => console.log(res))
    .then((res) => res.json())
    .then((data) => console.log(data))
    .then((data) => responseData.push(data))
    ;
}, []);

console.log("response data: ", responseData);
    return(
        <div>
        <div className = "Post">
        Posts:
            <Post postID = {dummyPost.postID} text = {dummyPost.text}/>
            <Post postID = {dummyPost.postID} text = {dummyPost.text}/>
        </div>
        </div>
        
    );
}

export default Home;
