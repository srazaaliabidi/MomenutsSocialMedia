import React, { useEffect, useState, Component } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Post from '../components/Post';
import CreatePost from '../components/CreatePost'
import './styles/userprofile.css'
import CollectionsProfile from '../components/CollectionsProfile';
import CollectionsImages from '../components/CollectionsImages';
import UserPosts from '../components/UserPosts';
import {
  useParams,
} from "react-router-dom";
const axios = require("axios");


/*
TO DO: working on conditional rendering for the posts and collections pages. 
*/

function UserProfile() {



  const { username } = useParams();

    
  const [profile, setProfile] = useState();

    const [content, setContent] = useState({
        postsVisible: true,
        collectionsVisible: false,
        imagesVisible: false
    });

    React.useEffect(() => {
    getProfile()
  });

    function getProfile() {
    if (profile == undefined) {
      let getProfileURL = 'getProfileUsername?username=' + username
    //console.log(getProfileURL)
    try {
      axios
        .get(getProfileURL)
        .then (response => {
          //console.log(response.data[0])
          setProfile(response.data[0])
        });
    } catch (err) {
      console.error (err.message);
    }
    }
  }
    

    const renderPosts = () => {
        if (!content.postsVisible) return '';
        return (
            <UserPosts />
        );
    }

    const renderCollections = () => {
        if (content.collectionsVisible) return (
            <CollectionsProfile />
        );
    }
    // will render the individual images 
/*
      const renderImages = () => {
        if (content.imagesVisible) return (
            <CollectionsImages />
        );

        // {renderImages()} = add to html with other routes //
    }*/

    function handleClickPosts() {
        setContent({postsVisible: true, collectionsVisible: false /*,imagesVisible: false*/});
    }
    
    function handleClickCollections() {
        setContent({postsVisible: false, collectionsVisible: true /*, imagesVisible: false*/});
    }
/*
    function handleClickCollectionsImages() {
        setContent({postsVisible: false, collectionsVisible: false, imagesVisible: true});
    }*/
    
    return (
        <div class="userprofile">
            <div class="header-image"></div>
            <div class="user-pfp">
                <img src="http://mattrbolles.com/bluecircle.png"/>
            </div>
            <div class="user-info">
                <div class="follow-info">
                    <tr>
                        <td>16.7k Followers</td>
                        <td>3k Following</td>
                        <td>[Follow]</td>
                    </tr>
            </div>
                <div class="displayname">
                    ///
                <div class="username">@{username}</div>
                </div>
                <div class="displaytext"></div>
            </div>
            <div class="profile-links">
                <table cellspacing="14">
                <tr>
                <td onClick={() => handleClickPosts()}>Posts</td>
                <td onClick={() =>handleClickCollections()}>Collections</td>
                    </tr>
                    </table>
            </div>
            <div class="profile-body">
                {renderCollections()}
                {renderPosts()}
            </div>
        </div>
    );
}

export default UserProfile;