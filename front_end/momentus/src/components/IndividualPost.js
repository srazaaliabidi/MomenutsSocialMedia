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
import axios from "axios";

import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../redux/reducers/rootReducer';
import { Provider, useDispatch } from 'react-redux';
import { useSelector, connect } from 'react-redux';
import { createBrowserHistory } from 'history';

const select = appState => ({
	isLoggedIn: appState.loginReducer.isLoggedIn,
	username: appState.loginReducer.username,
	_id: appState.loginReducer._id,
  })

// individual post page

function IndividualPost({ isLoggedIn, username, _id, pfpURL }) {
    const { postID } = useParams();
	const [newPostID, setNewPostID] = useState(); // for url
	const [post, setPost] = useState();
	const addPost = newPost => setPost (state => [...state, newPost]);
	const getPostURL = '/getPostByID?postID=' + postID;
	let counter = 1;
	let loadedPost = [];
	// grab post info
	React.useEffect(() => {
		try {
		axios.post(getPostURL)
		.then(res => {
			  loadedPost = res.data;
			  console.log(loadedPost)
			  // store post info
			  setPost(loadedPost);
		  })
		}
		catch (err) {
		  console.error(err.message);
		}
	}, [])

	/* function getPost() {
		if (counter == 1) {
		try {
			axios.post(getPostURL)
			.then(res => {
				  loadedPost = res.data;
				  console.log(loadedPost)
				  // store post info
				  addPost(loadedPost);
				  
			  })
			}
			catch (err) {
			  console.error(err.message);
			}
		counter++;
		};
	}
	getPost() */
	return (
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
				</div> */}
				
				{/* <div className="Post-content">
					{post.content}
				</div> */}
			</div>
	);
}

export default connect(select)(IndividualPost);