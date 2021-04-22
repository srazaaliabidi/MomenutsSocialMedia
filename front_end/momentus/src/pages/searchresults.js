import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
// import '../App.css';
import Post from '../components/Post';
import logo from '../assets/momentuslogo.png';
import { useLocation } from 'react-router-dom'
const queryString = require('query-string');
const axios = require ('axios');


function SearchResults () {
  const { search } = useLocation();
  // can add more params later for filtering
  const searchParams =  new URLSearchParams(search);
  const searchTerm = searchParams.get('search');
  const searchURL = 'search?search=';
  const [searchResults, setSearchResults] = useState ([]);
  const addResult = newResult => setSearchResults (state => [...state, newResult]);
  React.useEffect (() => {
    try {
    axios
      .get (searchURL.concat(searchTerm))
      .then (response => response.data.forEach (result => addResult (result)));
    }
    catch (err) {
      console.error(err.message);
    }
  }, []);

  return (
    <div className="centergrid">
      <div className="Search-results">
        <h1>Displaying search results for: {searchTerm}</h1>
        {searchResults.map (post => (
          <div id="post" className="Post" key={post.postID}>
            <Post post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}



export default SearchResults;
