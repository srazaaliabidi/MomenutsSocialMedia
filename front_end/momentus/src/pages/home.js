import React from 'react';
import ReactDOM from 'react-dom';
import '../App.css';
import Post from '../components/Post';


// this will house the vertical prototype for now... will change later of course

// this won't pass through right now lol
const dummyPost = {
    date: new Date(),
    caption: 'Test post!!!!!',
    user: {
      name: 'Coolio',
      pfpurl: '../bluecircle.png',
    }
  };

function Home() {
    return(
        <div>
            
        <div className = "Post">
        Posts:
            <Post props = {dummyPost}/>
        </div>
        </div>
        
    );
}

export default Home;
