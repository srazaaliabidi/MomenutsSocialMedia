import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
// import '../App.css';
import './styles/collectionsprofile.css';

import { Link } from 'react-router-dom';
const axios = require('axios');

/*
Finds list of collections based on user id, then shows the collections.
Ultimately plan on showing image file folder icons with the name of the collection
or something.
*/

function CollectionsProfile(props) {

  let userID = props.userID;
    const [collections, setCollections] = useState([]);
    React.useEffect(() => {
      getCollections()
      /* f (collections == undefined) {
        try {
          axios
            .post(getCollectionsURL)
            .then(response => 
              {
                console.log("get collections")
                console.log(response)
                console.log(response.data)
                response.data.forEach(collection => addCollection(collection))
              });
        }
        catch (err) {
          console.error(err.message);
        }
      } */
    });

    function getCollections() {
      if (collections.length == 0) {
      let getCollectionsURL = 'getCollections?userID=' + userID;
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


return ( 
     <div class="profile-collections">
       {(collections != undefined && collections.length > 0) ? 
        <div>
        {collections.map(collection => (
          <Link to={`/collection/${collection.collectionID}`}>
            <div className="profile-single-collection" key={collection.collectionID}>
            <img src = {collection.iconURL} alt = "collection"/>
            <p>{collection.name}</p>
            </div>
            </Link>
          ))}
        </div>
       : 
       <div>
         <p>This user does not have any collections yet. Encourage them to create one!</p>
        </div>
       }
          
        </div>
  );
}

export default CollectionsProfile;
