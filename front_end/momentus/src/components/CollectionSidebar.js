import React from 'react';
import App from '../App';
import './styles/sidebar.css';
import ProfileInfo from './ProfileInfo';

/*
Top 5 trending posts to be placed in sidebar
TODO: Add in logic to get trending posts and actually add them lol
*/

function CollectionSidebar({username, pfpURL}) {
  const [collections, setCollections] = React.useState ({
    collectionName: 'Birthday 2020',
    totalMedia: 9,
  });

  return (
    <div class="rightside">
      <div class="collectionsidebar">
        <div class="collection-sidebar-wrapper">
          <div class="profileinfobar">
            <ProfileInfo username={username} pfpURL={pfpURL} />
          </div>
          <div class="collectionstext">
            <h3><u>Your collections</u></h3>
            <a href="#">{collections.collectionName}</a>
            <p class="mediacount">{collections.totalMedia} photo total</p>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollectionSidebar;
