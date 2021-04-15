import React from 'react';
import App from '../App';
import '../pages/styles/sidebar.css';
import ProfileInfo from './ProfileInfo';

/*
Top 5 trending posts to be placed in sidebar
TODO: Add in logic to get trending posts and actually add them lol
*/

function CollectionSidebar({username, pfpURL}) {
  return (
    <div class="rightside">
      <div class="collectionsidebar">
        <div class="collection-sidebar-wrapper">
          <div class="profileinfobar">
            <ProfileInfo username={username} pfpURL={pfpURL} />
          </div><br /><br /><br />
          <div class="collectionstext">
            [Collections]
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollectionSidebar;
