import React, {useEffect, useState} from 'react';

import App from '../App';
import './styles/sidebar.css';
import ProfileInfo from './ProfileInfo';
const axios = require ('axios');

/*
Top 5 trending posts to be placed in sidebar
TODO: Add in logic to get trending posts and actually add them lol
*/

function CollectionSidebar({ username, pfpURL }) {
  /*
  const [collections, setCollections] = React.useState ({
    collectionName: 'Birthday 2020',
    totalMedia: 9,
  });*/

  const select = appState => ({
  isLoggedIn: appState.loginReducer.isLoggedIn,
  username: appState.loginReducer.username,
  _id: appState.loginReducer._id,
  })
  
  
  const [profile, setProfile] = useState();

  
  /////////////// [[[ CHECK FUNCTION ]]]
  /*
  const addProfile = newProfile =>
    setProfile (state => [...state, newProfile]);
  React.useEffect (() => {
    try {
      axios
        .get('/getProfile')
        .then (response =>
          setProfile(response.data)
        );
    } catch (err) {
      console.error (err.message);
    }
  });
*/
  ////////////////

  /*
  const [collections, setCollections] = useState ([]);
  const [images, setImages] = useState ([]);

  const addCollection = newCollections =>
    setCollections (state => [...state, newCollections]);
  React.useEffect (() => {
    try {
      axios
        .get ('/getCollections')
        .then (response =>
          response.data.forEach (collections => addCollection (collections))
        );
    } catch (err) {
      console.error (err.message);
    }
  }, []);

  const addImages = newImages => setImages (state => [...state, newImages]);
  React.useEffect (() => {
    try {
      axios
        .get ('/viewCollection')
        .then (response =>
          response.data.forEach (images => addImages (images))
        );
    } catch (err) {
      console.error (err.message);
    }
  }, []);*/

  return (
    <div class="collection-sidebar-wrapper">
      <div class="collection-sidebar-container">
        <div class="profileinfobar">
          <ProfileInfo username={username} pfpURL={pfpURL} />
        </div>
        <div class="collectionstext">
          <h3><u>Your collections</u></h3>
          <a href="#"></a>
          <p class="mediacount"> photo total</p>
          <div class="collectionsimages">

            <img src="https://via.placeholder.com/150" />
            <img src="https://via.placeholder.com/150" />
            <img src="https://via.placeholder.com/150" />
            <img src="https://via.placeholder.com/150" />
            <img src="https://via.placeholder.com/150" />
            <img src="https://via.placeholder.com/150" />
            <img src="https://via.placeholder.com/150" />
            <img src="https://via.placeholder.com/150" />
            <img src="https://via.placeholder.com/150" />
            <img src="https://via.placeholder.com/150" />
            <img src="https://via.placeholder.com/150" />
            <img src="https://via.placeholder.com/150" />
            <img src="https://via.placeholder.com/150" />
            <img src="https://via.placeholder.com/150" />
            <img src="https://via.placeholder.com/150" />
            <img src="https://via.placeholder.com/150" />
            <img src="https://via.placeholder.com/150" />
            <img src="https://via.placeholder.com/150" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollectionSidebar;
