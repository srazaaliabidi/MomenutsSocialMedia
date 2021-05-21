import React, {useEffect, useState} from 'react';
import { useDispatch, connect } from 'react-redux';
import App from '../App';
import './styles/sidebar.css';
import ProfileInfo from './ProfileInfo';

import { useHistory, Link  } from "react-router-dom";

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

function CollectionSidebar({ username, _id }) {

  const history = useHistory();
  /*
  const [collections, setCollections] = React.useState ({
    collectionName: 'Birthday 2020',
    totalMedia: 9,
  });*/

  const [profile, setProfile] = useState();
  const [pfpURL, setpfpURL] = useState();
  const [collections, setCollections] = useState ([]);
  const [newCollection, setNewCollection] = useState();


  /* // "collectionID":[array of collection images]
  // access by images[collectionID] - returns the array of images
  // leaving for future usage
  const [images, setImages] = useState ({}); */

  React.useEffect(() => {
    getProfile()
    //console.log(profile)
    getPFP()
    // get collections
    getCollections()
  });



  function addCollection(newCollection) {
    // first check if collection already loaded
    let collectionExists = collections.find(collection => collection.collectionID == newCollection.collectionID)
    //console.log(collectionExists)
    // if no results
    if (collectionExists == undefined) {
      //console.log("adding collection")
      setCollections(state => [...state, newCollection]);
    }

  }


  function getProfile() {
    if (profile == undefined) {
      let getProfileURL = '/getProfile?userID=' + _id
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

  function getPFP() {
    //console.log("getpfp")
    if (pfpURL == undefined && profile != undefined) {
      //console.log("getting pfp")
      setpfpURL(profile.pfpURL)
    }
  }



  function getCollections() {
    if (collections.length == 0) {
      let getCollectionsURL = 'getCollections?userID=' + _id
      //console.log(getCollectionsURL)
      try {
        axios
            .post(getCollectionsURL)
            .then (response => {
              //console.log(response.data)
              // if not empty
              if (response.data.length > 0) {
                //console.log(response.data)
                response.data.forEach (collection => {
                  //console.log(collection)
                  addCollection(collection)
                })
              }
            });
      }
      catch (err) {
        console.error (err.message);
      }
    }
  }
  function handleCollection(e) {
    e.preventDefault();
    try {
      axios
          .post("/newCollection", {
            name: newCollection,
          })
          .then((response) => {
            console.log(response)
            console.log("collection created");
          });
    } catch (err) {
      console.error(err.message);
    }
    history.go(0)
  }

  function updateNewCollection(e) {
    setNewCollection(e.target.value);
  }


  return (
      <div class="collection-sidebar-wrapper">
        <div class="collection-sidebar-container">
          <div class="profileinfobar">
            {pfpURL != undefined ?
                <ProfileInfo username={username}
                             userID = {_id}
                             pfpURL={pfpURL} />
                :
                <ProfileInfo username={username}
                             userID = {_id}
                             pfpURL="http://mattrbolles.com/bluecircle.png" />
            }
          </div>
          <div class="collectionstext">
            <h3>Your Collections</h3>
            {collections.length > 0 ?
                <div class="collectionsimages">
                  {collections.map(collection => (
                      <Link to={`/collection/${collection.collectionID}`}>
                        <div className="collection-sidebar-collection" key={collection.collectionID}>
                          <img src = {collection.iconURL} alt = "collection"/>
                          <p>{collection.name}</p>
                        </div>
                      </Link>
                  ))}
                  Create a collection!
                  <form onSubmit={(e) => handleCollection(e)}>
                    <input
                        id="newCollection"
                        type="text"
                        name="collectionName"
                        value={newCollection}
                        placeholder="Enter Name"
                        onChange={(e) => updateNewCollection(e)}
                    />
                  </form>
                </div>
                :
                <div>
                  Create a collection!
                  <form onSubmit={(e) => handleCollection(e)}>
                    <input
                        id="newCollection"
                        type="text"
                        name="collectionName"
                        value={newCollection}
                        placeholder="Enter Name"
                        onChange={(e) => updateNewCollection(e)}

                    />
                  </form>
                </div>
            }

          </div>

        </div>

      </div>
  );
}

export default connect(select)(CollectionSidebar);
