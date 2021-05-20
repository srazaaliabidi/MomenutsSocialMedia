import React, { useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import './styles/post.css';
import {
	submitComment,
	loadComments,
	deletePost,
} from '../redux/actions/postActions';

import { useHistory, Link } from "react-router-dom";

const axios = require('axios');
// this is to figure out who is logged in
const select = appState => ({
	isLoggedIn: appState.loginReducer.isLoggedIn,
	username: appState.loginReducer.username,
	_id: appState.loginReducer._id,
});

// post for stream... may need to rename for clarity
function Post({ post, _id }) {
	const history = useHistory();
	const dispatch = useDispatch();
	let isOwnPost = false;
	const type = post.type;

	function favoritePost() {
    // add to user favs
    let favoriteURL = "/favorite?postID=" + post.postID;
    //console.log(favoriteURL)
    try {
      axios.post(favoriteURL).then((res) => {
        console.log(res);
        //if favorite succeeded, reload to show updated favorite count
        if (res.data == "1") {
          history.go(0);
        }
      });
    } catch (err) {
      console.error(err.message);
    }
	}
	
	var dateFormat = new Date(post.dateCreated).toString();

	const postLink = "/post/" + post.postID;
	// check to see if post is own, adjust options accordingly
	// if it is the users' post, an option to delete will appear in the top right corner.
	// need to add logic to remove post. 
	if (_id == post.userID) {
		isOwnPost = true;
		/*
		if (type == 'text') {
		return (
			<div class="post">
				<h3 class="user-edit">✖</h3>
				<div className="post-info">
					<img id="profilepic-post" src={post.pfpURL} />
					<div class="post-details">
						<h1>@{post.username}</h1>
						<h2>Posted on {post.dateCreated}</h2>
					</div>
				</div>
				
				<div className="Post-content">
					{post.content}
				</div>
			</div>
		);
	}
	 else if (type == 'photo') {
		return (
			<div class="post">
				<h3 class="user-edit">✖</h3>
				<div class="post-info">
					<img id="profilepic-post" src={post.pfpURL} />
					<div class="post-details">
						<h1>@{post.username}</h1>
						<h2>Posted on {post.dateCreated}</h2>
					</div>
				</div>
				<div class="post-content">
					<p class="post-caption">{post.caption}</p>
					<div class="Post-photo">
						<img src={post.contentURL} />
					</div>
				</div>

			</div>
		);
	}
		*/
	}
	if (type == 'text') {
		return (
			<div class="post">
				<a href={postLink}>
				<div className="post-info">
					<img className="profilepic-post" src={post.pfpURL} />
					<div class="post-details">
							<Link to={`/user/${post.userID}`}><h1>@{post.username}</h1></Link>
								
						<h2>Posted on {dateFormat}</h2>
							</div>
					
					{/* <div className="Username-post">@{post.username}</div>
					<div className="Post-date">Posted on {post.dateCreated}</div> */}
				</div>
				
				<div className="Post-content">
					{post.content}
				</div>
				 <div className="post-favorites">
              {post.numFav != null ? (
                <div className="post-num-favorites">
                  {post.numFav}  
              <button onClick={favoritePost} className="favorite-button">❤ </button>
                </div>
              ) : (
                <div className="post-num-favorites">0 
              <button onClick={favoritePost} className="favorite-button">❤ </button></div>
              )}
					</div>
					</a>
			</div>
		);
	} else if (type == 'photo') {
		return (
			<div class="post">
				<a href={postLink}>
					<div class="post-info">
						
					<img class="profilepic-post" src={post.pfpURL} />
					<div class="post-details">
						
            <Link to={`/user/${post.userID}`}><h1>@{post.username}</h1></Link>
						<h2>Posted on {dateFormat}</h2>
			
							</div>
				</div>
				<div class="post-content">
					<p class="post-caption">{post.caption}</p>
					<div className="post-photo">
							<img src={process.env.PUBLIC_URL + post.contentURL} />
					</div>
				</div>
 <div className="post-favorites">
              {post.numFav != null ? (
                <div className="post-num-favorites">
                  {post.numFav}  
              <button onClick={favoritePost} className="favorite-button">❤ </button>
                </div>
              ) : (
                <div className="post-num-favorites">0 
              <button onClick={favoritePost} className="favorite-button">❤ </button></div>
              )}
					</div>
					</a>
			</div>
		);
	}
}

export default connect(select)(Post);
