import React from 'react';
import App from '../App';
import logo from '../assets/momentuslogo.png';
import '../pages/styles/navbar.css';
import {useHistory} from 'react-router-dom';

/*
Nav bar for the top of the page
*/

function NavigationBar () {
  const [search, setSearch] = React.useState ('');
  const history = useHistory ();

  const handleSearch = evt => {
    /* evt.preventDefault ();
    let searchTerm = search;
    let searchURL = '/searchresults?search=';
    let fullSearch = searchURL.concat(searchTerm);
    console.log('Going to search for:' + search);
    history.push (fullSearch);
    history.go (0); */
    //alert (`Looking for ${search}`);
  };

  return (
    <div class="NavBar">

      <nav>
        <div class="navigation-content">
          <img src={logo} alt="Momentus logo" height="10%" width="10%" />

          <span class="navimg"><a href="/">Home</a></span>
          <span class="navimg"><a href="/notifications">Notifications</a></span>
          <span class="navimg"><a href="/settings">Settings</a></span>
          <span class="navimg"><a href="/logout">Logout</a></span>
        </div>
      </nav>
      <div class="search-bar">
        <form onSubmit={handleSearch}>
          <input
            class="search-text"
            type="search"
            placeholder="Looking for something??"
            value={search}
            onChange={e => setSearch (e.target.value)}
          />
          {/*  <button type="submit" id="search-button">Search</button> */}
        </form>
      </div>
    </div>
  );
}

export default NavigationBar;
