import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
// import '../App.css';

import './styles/collectionsimages.css';
const axios = require('axios');

/*
Finds list of collections based on user id, then prints the images
*/

function CollectionsImages() {
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
      <div className=""></div> /*
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
