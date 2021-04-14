import React from 'react';
import App from '../App';
import logo from "../assets/momentuslogo.png";


/*
Nav bar for the top of the page
*/

function NavigationBar () {
  return (
    <div classname="NavBar">
      <div classname="NavBar-logo">
        <img src = {logo} alt = "Momentus logo"/>
      </div>
      <nav>
        <div class="navigation-content">
          <a href="/">Home</a>
          <a href="/notifications">Notifications</a>
          <a href="/settings">Settings</a>
          <a href="/createpost">Create Post</a>
          <a href="/logout">Logout</a>
        </div>
      </nav>
      <div class = "search-bar">
        <input id = "search-text" type = "search" placeholder = "Looking for something?"/>
        <button type = "submit" id = "search-button">Search</button>
      </div>
    </div>
  );
}

export default NavigationBar;