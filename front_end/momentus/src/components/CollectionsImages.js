import React, { useEffect, useState } from "react";
import { Profiler } from "react";
import ReactDOM from "react-dom";
import { useDispatch, connect } from "react-redux";
import {
  useParams,
} from "react-router-dom";
// import '../App.css';

import "./styles/collectionsimages.css";
const axios = require("axios");

/*
Finds list of collections based on user id, then prints the images
*/

function CollectionsImages() {
  const { collectionID } = useParams();

  const [collection, setCollection] = useState([]);


  React.useEffect(() => {
    getCollection()
  });

  function addCollection(newCollection) {
    // first check if collection already loaded
    let collectionExists = collection.find(collection => collection.collectionID == newCollection.collectionID)
    //console.log(collectionExists)
    // if no results
    if (collectionExists == undefined) {
      console.log("adding collection")
      setCollection(state => [...state, newCollection]);
    }

  }


  function getCollection() {
    if (collection.length == 0) {
      let getCollectionURL = 'viewCollection?collectionID=' + collectionID
      console.log(getCollectionURL)
      try {
        axios
          .post(getCollectionURL)
          .then(response => {
            //console.log(response.data)
            // if not empty 
            if (response.data.length > 0) {
              //console.log(response.data)
              response.data.forEach(collection => {
                console.log(collection)
                addCollection(collection)
              })
            }
          });
      }
      catch (err) {
        console.error(err.message);
      }
    }
  }
  /*
  const [images, setImages] = useState([]);
  const addImages = newImage => setImages(state => [...state, newImage]);
  React.useEffect(() => {
    try {
      axios
        .get('/viewCollection')
        .then(response => response.data.forEach(image => addImages(image)));
    }
    catch (err) {
      console.error(err.message);
    }

  }, []);*/


  return (
    <div className="collections-images-stream">
      <div className="collections-header"><h1>{collectionID}</h1></div>
      <div className="collections-images">
      {collection.map(post => (
          <img id="gallery-pic" src={post.contentURL} />
      ))}
        
        </div>
    </div> /*
    <div className="collections-images-stream">
      {images.map(image => (
        <div className="collections-images">
          <img id="profilepic-post" src={image.contentURL} />
        </div>
      ))}
    </div>*/
  );
}

export default CollectionsImages;
