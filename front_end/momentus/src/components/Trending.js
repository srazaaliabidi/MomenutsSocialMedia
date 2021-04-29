import React from 'react';
import App from '../App';
import './styles/sidebar.css';

/*
Top 5 trending posts to be placed in sidebar
TODO: Add in logic to get trending posts and actually add them lol
*/

function Trending () {
  return (
    <div class="trending-sidebar">
      <div className="Trending-sidebar-post">
        Trending post
      </div>

      <div className="Trending-sidebar-post">
        Trending post
      </div>

      <div className="Trending-sidebar-post">
        Trending post
      </div>

      <div className="Trending-sidebar-post">
        Trending post
      </div>

      <div className="Trending-sidebar-post">
        Trending post
      </div>
    </div>
  );
}

export default Trending;
