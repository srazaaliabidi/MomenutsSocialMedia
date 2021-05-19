import React, { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import {
	submitComment,
	loadComments,
	deletePost,
	getPostAuthor,
} from '../redux/actions/postActions';
import { 
  useParams } from 'react-router-dom';
import SinglePostComment from './singlepostcomment'

const axios = require('axios');

const select = appState => ({
  isLoggedIn: appState.loginReducer.isLoggedIn,
  username: appState.loginReducer.username,
  _id: appState.loginReducer._id,
  })


function TempSinglePost() {
	
	const { postid } = useParams();
	const dispatch = useDispatch();
	const isOwnPost = false;
	const [post, setPost] = useState();


	React.useEffect(() => {
		let getPostURL = 'getPostByID?postID=' + { postid }
		console.log("GETTING POST")
		try {
			axios
				.get(getPostURL)
				.then(response => {
					//console.log(response.data[0])
					setPost(response.data[0])
				});
		} catch (err) {
			console.error(err.message);
		}
    
	})

	

	if (post.type == 'text') {
		return (
			<div>
					<div class="post">
						<div className="post-info">
							<img className="profilepic-post" src={post.pfpURL} />
							<div class="post-details">
								<h1>@{post.username}</h1>
								<h2>Posted on {post.date}</h2>
							</div>
						</div>
				
						<div class="post-content">
							<p class="post-caption">{post.caption}</p>
						</div>
					</div>
					<div class="comment-wrap">
				
						<SinglePostComment />
						<SinglePostComment />
					</div>
				</div>
		);
	}
	else if (post.type == 'photo') {
			return (
				<div>
					<div class="post">
						<div className="post-info">
							<img className="profilepic-post" src={post.pfpURL} />
							<div class="post-details">
								<h1>@{post.username}</h1>
								<h2>Posted on {post.dateCreated}</h2>
							</div>
						</div>
				
						<div class="post-content">
							<p class="post-caption">{post.caption}</p>
							<div className="post-photo">
								<img src={post.contentURL} />
							</div>
						</div>
					</div>
					<div class="comment-wrap">
				
						<SinglePostComment />
						<SinglePostComment />
					</div>
				</div>

			);
		}
		
}

export default connect(select)(TempSinglePost);
