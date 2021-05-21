import React, { useState } from 'react';
import './styles/singlepostcomment.css'
import axios from 'axios';


function SinglePostComment({comment}) {
	const [profile, setProfile] = useState();
	const [pfpURL, setpfpURL] = useState();
	const [username, setUsername] = useState();
	let commentText = comment.comment
	let date = comment.dateCommented
	let userID = comment.cuID
	// need a function to get username and pfp from id - use the getProfile func from collectionsidebar for basis
	React.useEffect(() => {
		getProfile()
		//console.log(profile)
		getPFP()
		//get username
		getUsername();
	});

	function getProfile() {
		if (profile === undefined) {
			let getProfileURL = 'getProfile?userID=' + userID
			//console.log(getProfileURL)
			try {
				axios
					.get(getProfileURL)
					.then(response => {
						//console.log(response.data[0])
						setProfile(response.data[0])
					});
			} catch (err) {
				console.error(err.message);
			}
		}
	}
	function getPFP() {
		//console.log("getpfp")
		if (pfpURL === undefined && profile !== undefined) {
			//console.log("getting pfp")
			setpfpURL(profile.pfpURL)
		}
	}
	function getUsername(){
		if(username === undefined && pfpURL !== undefined && profile !== undefined){
			setUsername(profile.username)
		}
	}

	return (
        <div className="comment-wrapper">
            <div className="post-info">
					<img className="profilepic-post" src={pfpURL} />
					<div class="post-details">
					<h1>@{username}</h1>
						<h2>Posted on {date}</h2>
					</div>
            </div>
            {commentText}
            </div>
		);
		
}

export default SinglePostComment;
