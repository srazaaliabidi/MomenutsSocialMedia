import React, { useEffect, useState, Component } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Post from '../components/Post';
import CreatePost from '../components/CreatePost'
import './styles/userprofile.css'
import CollectionsProfile from '../components/CollectionsProfile';
import UserPosts from '../components/UserPosts';

/*
TO DO: working on conditional rendering for the posts and collections pages. 
*/

function UserProfile() {

    const [content, setContent] = useState({
        postsVisible: true,
        collectionsVisible: false
  });

    function renderPosts() {
        if (!content.postsVisible) return '';
        return (
            <UserPosts />
        );
    }

    function renderCollections() {
        if (!content.collectionsVisible) return (
            <UserPosts />
        );
        if (content.collectionsVisible) return (
            <CollectionsProfile />
        );
    }

    function handleClickPosts() {
        setContent(true, false);
    }
    
    function handleClickCollections() {
        setContent(false, true);
    }
    
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
                    ThisIsAUser
                <div class="username">@HiIt'sMe</div>
                </div>
                <div class="displaytext">hello?</div>
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
                <renderCollections />
                <renderPosts/>
            </div>
        </div>
    );
}

export default UserProfile;