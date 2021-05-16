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

function CollectionsProfile() {
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

return ( <div className="">collections test</div>
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

export default CollectionsProfile;
