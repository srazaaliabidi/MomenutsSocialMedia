import React from 'react';
import App from '../App';

/*
Profile info that is loaded into sidebar
*/

function ProfileInfo({username, pfpURL}) {
    return (
        <div className = "ProfileInfo">
            <div className = "ProfileInfo-pfp">
                <img src = {pfpURL}/>
            </div>
            <div className = "ProfileInfo-username">
                <a href = "/profile">@{username}</a>
            </div>
        </div>
    );
}

export default ProfileInfo;