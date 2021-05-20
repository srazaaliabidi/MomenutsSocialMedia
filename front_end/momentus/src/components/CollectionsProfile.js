import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
// import '../App.css';
import './styles/collectionsprofile.css';
const axios = require('axios');

/*
Finds list of collections based on user id, then shows the collections.
Ultimately plan on showing image file folder icons with the name of the collection
or something.
*/

function CollectionsProfile(props) {

  let userID = props.userID;

    let postURL = "getCollections?userID=" + userID;
    const [collections, setCollections] = useState([]);
    const addCollection = newCollection => setCollections(state => [...state, newCollection]);
    React.useEffect(() => {
      try {
        axios
          .get(postURL)
          .then(response => response.data.forEach(collection => addCollection(collection)));
      }
      catch (err) {
        console.error(err.message);
      }

    }, []);
    /*
  const [collections, setCollections] = useState([]);
  const addCollection = newCollection => setCollections(state => [...state, newCollection]);
  React.useEffect(() => {
    try {
      axios
        .get('/getCollections')
        .then(response => response.data.forEach(collection => addCollection(collection)));
    }
    catch (err) {
      console.error(err.message);
    }

  }, []);*/

return ( 
     <div class="profile-collections">
          {collections.map(collection => (
            <div className="profile-single-collection" key={collection.collectionID}>
            <img src = {collection.iconURL} alt = "collection"/>
            <p>{collection.name}</p>
              </div>
          ))}
        </div>
  );
}

export default CollectionsProfile;
