import React from 'react';
import App from '../App';
import ProfileInfo from './ProfileInfo';
import Trending from './Trending';
import Trendingpost from './Trendingpost';
import { useSelector, connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import './styles/sidebar.css';

// get user info to load into profile info
const select = appState => ({
  // isLoggedIn: appState.loginReducer.isLoggedIn,
  //username: appState.loginReducer.username,
  // pfpURL: appState.loginReducer.pfpURL,
});

/*
Side bar - consists of logged in user profile info and trending posts
*/

function TrendingSideBar() {
  return (
    <div class="trending-wrapper">
      <div class="trending-container">
        <h3>Trending Posts</h3>
        <Trendingpost />
      </div>
    </div>
  );
}

export default connect(select)(TrendingSideBar);
