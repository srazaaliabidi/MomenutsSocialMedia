import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Post from '../components/Post';
import CreatePost from '../components/CreatePost'
import './styles/userprofile.css'

function UserProfile() {
    
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
                <td>Posts</td>
                <td>Collections</td>
                    </tr>
                    </table>
            </div>
            <div class="profile-body">
                I am the content! Woo!
            </div>
        </div>
    );
}

export default UserProfile;