import React from 'react';
import App from '../App';
import '../pages/styles/profileinfo.css';

/*
Profile info that is loaded into sidebar
*/

function ProfileInfo({username,userID, pfpURL}) {
    let profileURL="/user/"+userID
  return (
    <div className="ProfileInfo">
      <div className="ProfileInfo-pfp">
        <a href={profileURL}>
            <img src={pfpURL}/>
        </a>
      </div>
      <div className="ProfileInfo-username">
       <a href={profileURL}>@{username}</a>
      </div>
    </div>
  );
}

export default ProfileInfo;
