import React, {useEffect, useState} from 'react';
import { useDispatch, connect } from 'react-redux';
import App from '../App';
import './styles/sidebar.css';
import ProfileInfo from './ProfileInfo';
const axios = require ('axios');

/*
Top 5 trending posts to be placed in sidebar
TODO: Add in logic to get trending posts and actually add them lol
*/
const select = appState => ({
  isLoggedIn: appState.loginReducer.isLoggedIn,
  username: appState.loginReducer.username,
  _id: appState.loginReducer._id,
  })

function CollectionSidebar({username, _id}) {
  /*
  const [collections, setCollections] = React.useState ({
    collectionName: 'Birthday 2020',
    totalMedia: 9,
  });*/

  const [profile, setProfile] = useState();
  const [collections, setCollections] = useState ([]);
  const [collectionIDs, setCollectionIDs] = useState ([]);
  /* // "collectionID":[array of collection images]
  // access by images[collectionID] - returns the array of images
  // leaving for future usage
  const [images, setImages] = useState ({}); */
  const [images, setImages] = useState([]);
  React.useEffect(() => {
    // get profile - don't need this anymore lmao
    //getProfile()
    //console.log(profile)
    // get collection
    getCollections()
    console.log(collections)
    // get images
    //getCollectionImages()
  });

  
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

  function addCollection(newCollection) {
    setCollections(state => [...state, newCollection]);
  }

  function addCollectionID(newCollectionID) {
    setCollectionIDs(state => [...state, newCollectionID]);
  }

  // leaving this for future collection usage possibly
  /* // not 100% sure if this works properly, may need to rework
  function addCollectionImageArray(collectionID, imageArray) {
    setImages(state => [...state, images[collectionID] = imageArray]);
  } */

  // Reformatted functions
  function getProfile() {
    if (profile == undefined) {
      let getProfileURL = 'getProfile?userID=' + _id
    console.log(getProfileURL)
    try {
      axios
        .get(getProfileURL)
        .then (response => {
          console.log(response)
          console.log(response.data)
          setProfile(response.data)
        });
    } catch (err) {
      console.error (err.message);
    }
    }
    
  }

  

  function getCollections() {
    if (collections.length == 0) {
    let getCollectionsURL = 'getCollections?userID=' + _id
    console.log(getCollectionsURL)
    try {
      axios
        .post(getCollectionsURL)
        .then (response => {
          console.log(response.data)
          /* response.data.forEach (collection => {
              addCollection(collection)
          }) */
        });
    } catch (err) {
      console.error (err.message);
    }
    }
  }

  // grab first image of each collection to display
  function getCollectionImages() {
    collectionIDs.forEach(collectionID => {
      let getCollectionImageURL = 'viewCollection?collectionID=' + collectionID
      let imageToAdd = ""
      console.log(getCollectionImageURL)
      try {
        axios
          .get('getCollectionsURL')
          .then (response => {
            console.log(response)
            // waiting for the ability to grab a specific post by post ID
            // then we will grab the first post of each collection and add to images
          });
      } catch (err) {
        console.error (err.message);
      }
    })

  }

  function getImageFromPost(postID) {
    // add this in
  }
  

  return (
    <div class="collection-sidebar-wrapper">
      <div class="collection-sidebar-container">
        <div class="profileinfobar">
          <ProfileInfo username={username} pfpURL="http://mattrbolles.com/bluecircle.png" />
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

export default connect(select)(CollectionSidebar);
