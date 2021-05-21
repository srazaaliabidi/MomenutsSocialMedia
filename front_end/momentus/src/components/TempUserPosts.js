import React, { useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import './styles/tempuserposts.css';
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
function TempUserPosts() {
	
	
	return (
			<div class="post">
				<div className="post-info">
					<img className="profilepic-post" src="https://i.pinimg.com/564x/7d/30/af/7d30af5fab847c50dbc1964f4f26b8cf.jpg" />
					<div class="post-details">
						<h1>@username</h1>
						<h2>Posted on [date]</h2>
					</div>
				</div>
				
				<div class="post-content">
					<p class="post-caption">caption</p>
					<div className="post-photo">
						<img src="https://ugc.reveliststatic.com/gen/constrain/640/640/80/2019/06/05/14/8i/5d/pooxrfjxc01bw.png"/>
					</div>
				</div>
			</div>
		);
		
}

export default TempUserPosts;
