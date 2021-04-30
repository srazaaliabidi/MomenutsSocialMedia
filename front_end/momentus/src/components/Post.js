import React, { useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import './styles/post.css';
import {
	submitComment,
	loadComments,
	deletePost,
} from '../redux/actions/postActions';

// this is to figure out who is logged in
const select = appState => ({
	userID: appState.postReducer.postID,
});

/* 
Post consists of the content and user info
We can rearrange the stuff as needed
TODO: add comments/likes/reposts
TODO: add video post
*/
function Post({ post, userID }) {
	const dispatch = useDispatch();
	const isOwnPost = false;
	const type = post.type;
	// check to see if post is own, adjust options accordingly
	// if it is the users' post, an option to delete will appear in the top right corner.
	// need to add logic to remove post. 
	if (userID === post.userID) {
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
				<div className="post-info">
					<img id="profilepic-post" src={post.pfpURL} />
					<div class="post-details">
						<h1>@{post.username}</h1>
						<h2>Posted on {post.dateCreated}</h2>
					</div>
					
					{/* <div className="Username-post">@{post.username}</div>
					<div className="Post-date">Posted on {post.dateCreated}</div> */}
				</div>
				
				<div className="Post-content">
					{post.content}
				</div>
			</div>
		);
	} else if (type == 'photo') {
		return (
			<div class="post">
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
}

export default connect(select)(Post);
