import React, { useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import './styles/createPost.css';

function CreatePost() {
    const [postForm, setPostForm] = React.useState({
        textContent: '',
        imageUpload: ''
    })

    return (
        <div className="create-post-container">
            <div className="create-post-box">
                <input name="create-post" placeholder="Make a Post!" />
            </div>
            <div className="image-upload">
                <img src="https://via.placeholder.com/24"></img>
                <label>Upload</label>
            </div>
        </div>
    );
}

export default CreatePost;