import React from 'react';
import App from '../App';
import logo from '../assets/momentuslogo.png';
import './styles/navbar.css';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { userLogout} from '../redux/actions/loginActions';

/*
Nav bar for the top of the page
*/

function NavigationBar () {
  const [search, setSearch] = React.useState ('');
  const history = useHistory ();
  const dispatch = useDispatch();

  const handleSearch = evt => {
    evt.preventDefault ();
    let searchTerm = search;
    let searchURL = '/searchresults?search=';
    let fullSearch = searchURL.concat(searchTerm);
    console.log('Going to search for:' + search);
    history.push (fullSearch);
    history.go (0);
    //alert (`Looking for ${search}`);
  };

  function logout() {
    axios
      .post('/logout')
      .then(res => {
        console.log("logged out");
        console.log(res);
    })
    .catch(function (error) {
      console.log(error);
    });
    dispatch(userLogout());
    history.push('/');
    history.go (0);
    console.log("out");
  }

  return (
    <div className="NavBar">

      <nav>
        <div className="navigation-content">
          <img src={logo} alt="Momentus logo" height="20%" width="20%" />

          <span class="navimg"><a href="/">Home</a></span>
          <span class="navimg"><a href="/settings">Settings</a></span>
          <span class="navimg"><a href="#" onClick = {logout}>Logout</a></span>
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
