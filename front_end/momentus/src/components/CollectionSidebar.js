import React from 'react';
import App from '../App';
import '../pages/styles/sidebar.css';

/*
Top 5 trending posts to be placed in sidebar
TODO: Add in logic to get trending posts and actually add them lol
*/

function CollectionSidebar () {
  return (
    <div classname="rightside">
      <div class="collectionsidebar">
        <div class="collection-sidebar-wrapper">
          [Collections]
        </div>
      </div>
    </div>
  );
}

export default CollectionSidebar;
