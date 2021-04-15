import React from 'react';
import App from '../App';
import ProfileInfo from './ProfileInfo';
import Trending from './Trending';
import { useSelector, connect } from "react-redux";
import { useDispatch } from "react-redux";


// get user info to load into profile info
const select = appState => ({
    // isLoggedIn: appState.loginReducer.isLoggedIn,
    //username: appState.loginReducer.username,
    //pfpURL: appState.loginReducer.pfpURL,
  })


/*
Side bar - consists of logged in user profile info and trending posts
*/

function SideBar({username, pfpURL}) {
    return (
        <div classname = "SideBar">
            <ProfileInfo username = {username} pfpURL = {pfpURL}/>
            <Trending/>
        </div>
    );
}

export default connect(select)(SideBar);