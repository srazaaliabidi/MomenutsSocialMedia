import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
// import '../App.css';

import './styles/userposts.css';
const axios = require('axios');


/*
Will find all posts of users and display them on page
*/

function UserPosts() {
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

return ( <div className="">posts test</div>
      /*
    <div className="profile-collections-stream">
      {collections.map(collection => (
        <div className="collections-stream" key={collection.collectionID}>
          {collection.name}
        </div>
      ))}
    </div>*/
  );
}

export default UserPosts;
