import React from 'react';
import App from '../App';
import logo from '../assets/momentuslogo.png';
import './styles/navbar.css';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

/*
Nav bar for the top of the page
*/

function NavigationBar () {
  const [search, setSearch] = React.useState ('');
  const history = useHistory ();

  const handleSearch = evt => {
    evt.preventDefault ();
    let searchTerm = search;
    let searchURL = '/searchresults?search=';
    let fullSearch = searchURL.concat(searchTerm);
    console.log('Going to search for:' + search);
    history.push (fullSearch);
    //alert (`Looking for ${search}`);
  };

  const logout = () =>{
    axios
      .post ('/logout')
      .then(function(result) {
        console.log("Not Logged In");
      }).catch(function(status, errorCode) {
        console.log("could not logout");
      });
    console.log("out");
  }

  return (
    <div classname="NavBar">

      <nav>
        <div className="navigation-content">
          <img src={logo} alt="Momentus logo" height="10%" width="10%" />

          <span class="navimg"><a href="/">Home</a></span>
          <span class="navimg"><a href="/settings">Settings</a></span>
          <span class="navimg"><a href="/logout">Logout</a></span>
        </div>
      </nav>
      <div className="search-bar">
        <form onSubmit={handleSearch}>
          <input
            class="search-text"
            type="search"
            placeholder="Looking for something?"
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
