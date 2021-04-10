import React from 'react';
import App from '../App';

function NavigationBar () {
  return (
    <div classname="NavBar">
      <div class="navigation-content">
        <a href="/">Home</a>
        <a href="/settings">Settings</a>
        <a href="/register">Register</a>
      </div>
      <div class="search-bar">
        <input type="text" placeholder="Search" />
      </div>
    </div>
  );
}
