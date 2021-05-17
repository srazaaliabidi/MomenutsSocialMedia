import React, {useEffect, useState} from 'react';
import './styles/sidebar.css';
import ProfileInfo from './ProfileInfo';
const axios = require('axios');

function CollectionSidebarImages() {
  /*
  const [collections, setCollections] = React.useState ({
    collectionName: 'Birthday 2020',
    totalMedia: 9,
  });*/

  
  const [images, setImages] = useState ([]);


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
  }, []);

  return (
    <div class="collection-sidebar-images">
      {posts.map(post => (
        <div className="collection-images-stream" key={post.postID}>
          <img src={post.contentURL} />
        </div>
      ))}
    </div>
  );
}

export default CollectionSidebarImages;
