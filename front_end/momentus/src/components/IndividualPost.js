import React, { Component, useEffect, useState } from 'react';
import { BrowserRouter, Link, Route, Switch, useParams } from 'react-router-dom';

import Stream from '../pages/stream';
import About from '../pages/about';
import Messages from '../pages/messages';
import Notifs from '../pages/notifs';
import Settings from '../pages/settings';
import UserProfile from '../pages/userprofile';
import SearchResults from '../pages/searchresults';
import NavigationBar from './NavigationBar';
import TrendingSideBar from './TrendingSideBar';
import CollectionSidebar from './CollectionSidebar';
import SinglePostComment from './singlepostcomment';
import axios from "axios";

import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../redux/reducers/rootReducer';
import { Provider, useDispatch } from 'react-redux';
import { useSelector, connect } from 'react-redux';
import { createBrowserHistory } from 'history';
import {useHistory} from 'react-router-dom';

import './styles/individualpost.css';

const select = appState => ({
	isLoggedIn: appState.loginReducer.isLoggedIn,
	username: appState.loginReducer.username,
	_id: appState.loginReducer._id,
  })

// individual post page

function IndividualPost({ isLoggedIn, username, _id, pfpURL }) {
	const history = useHistory ();
    const { postID } = useParams();
	const [newPostID, setNewPostID] = useState(); // for url
	const [post, setPost] = useState();
	const [comments, getComments] = useState([]);
	const [favorited, isFavorited] = useState(false)
	const addPost = newPost => setPost (state => [...state, newPost]);
    
	let counter = 1;
	let loadedPost = [];
	// grab post info
	React.useEffect(() => {
		getPost()
		//getComments()
	})

	function favoritePost() {
		// add to user favs
		
		let favoriteURL = '/favorite?postID=' + postID;
		console.log(favoriteURL)
		// reload to show updated comments
		try {
			axios
			.post(favoriteURL)
			.then(res => {
				  console.log(res)
			  })
			}
			catch (err) {
			  console.error(err.message);
			}
		history.push(`/post/${postID}`)
		history.go (0);
	}

	function getPost() {
		if (post == undefined) {
			let getPostURL = '/getPostByID?postID=' + postID;
			console.log(getPostURL)
			try {
				axios
				.post(getPostURL)
				.then(res => {
					  loadedPost = res.data[0];
					  // store post info
					  setPost(loadedPost);
				  })
				}
				catch (err) {
				  console.error(err.message);
				}
		};
	}
	return (
		/*
            <div className="individual-post">
				<div>
      			postID: {postID}
				  
				  
    			</div>
				{loadedPost != undefined ? 
				<div>
					post loaded
					{loadedPost.postID}
				</div>
				: null}
				{/* <div className="post-info">
					<img id="profilepic-post" src={post.pfpURL} />
					<div class="post-details">
						<h1>@{post.username}</h1>
						<h2>Posted on {post.dateCreated}</h2>
					</div>
				</div> }
				
				{/* <div className="Post-content">
					{post.content}
				</div> }
			</div>*/
		
		/// Feel free to comment out, this was just the adjusted post ///

		<div>
			{post != undefined ? 
			<div>
				<div className="post">
			<div className="post-info">
				<img className="profilepic-post" src={post.pfpURL} />
				<div class="post-details">
					<h1>@{post.username}</h1>
					<h2>Posted on {post.dateCreated}</h2>
				</div>
			</div>
	
			<div className="post-content">
				<p class="post-caption">{post.caption}</p>
				<div className="post-photo">
					<img src={post.contentURL} />
				</div>
			</div>
			<div className="post-favorites">
				<button onClick = {favoritePost}>Add To Favorites</button>
				{post.numFav != null ? 
				<div>
					{post.numFav}
				</div>
				:
				0
				}
			</div>
		</div>
		<div class="comment-wrap">
	
			<SinglePostComment />
			<SinglePostComment />
		</div>
			</div>
			: 
			<div>
				Loading post...
			</div>
			}
				</div>
	);
}

export default connect(select)(IndividualPost);