import React, { useState } from 'react';
import ReactDom from 'react-dom';
import { useDispatch, connect } from 'react-redux';
import './styles/createPost.css';
import axios from "axios";

function CreatePost() {
	const [postForm, setPostForm] = useState({
		textContent: '',
		imageUpload: ''
	});

	function upload(e) {
		e.preventDefault();
		try {
			axios
				.post('/newPostText', {
					createPost: postForm.textContent
				})
				.then(response => {
					console.log("post uploaded!")
				});
		}
		catch (err) {
			console.error(err.message);
		}
		document.getElementById("textContent").value = '';
	}
	function updateForm(e) {
		const postData = { ...postForm }
		postData[e.target.name] = e.target.value
		setPostForm(postData)
		console.log(postData)
	}

	return (
		<div className="create-post-wrapper">
			<form id="postForm">
				<div className="create-post-box">
					<input
						id="textContent"
						type="text"
						name="textContent"
						value={postForm.textContent}
						placeholder="Make a Post!"
						onChange={(e) => updateForm(e)}
					/>
				</div>
				<div className="image-upload">
					<button type="button" onClick={(e) => upload(e)}>
					<img src="https://via.placeholder.com/24"></img>
					Upload</button>
				</div>
			</form>
		</div>
	);
}

export default CreatePost;