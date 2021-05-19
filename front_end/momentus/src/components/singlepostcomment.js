import React, { useState } from 'react';
import './styles/singlepostcomment.css'


function SinglePostComment({comment}) {
	let commentText = comment.comment
	let date = comment.dateCommented
	let userID = comment.cuID
	// need a function to get username and pfp from id - use the getProfile func from collectionsidebar for basis 
	return (
        <div className="comment-wrapper">
            <div className="post-info">
					<img className="profilepic-post" src="https://i.pinimg.com/564x/7d/30/af/7d30af5fab847c50dbc1964f4f26b8cf.jpg" />
					<div class="post-details">
						<h1>@username</h1>
						<h2>Posted on {date}</h2>
					</div>
            </div>
            {commentText}
            </div>
		);
		
}

export default SinglePostComment;
