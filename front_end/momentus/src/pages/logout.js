import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import logo from '../assets/momentuslogo.png';
const axios = require ('axios');

function Logout () {

  //React.useEffect (() => {
    alert("In");  
    axios
      .post ('/logout')
      .then(function(result) {
        console.log("Not Logged In");
      }).catch(function(status, errorCode) {
        console.log("could not logout");
      });
    console.log("out");
  //[]);

  return(
    <div class="centergrid">
      <h2>You are not logged in</h2>
    </div>
  );
}

export default Logout;

