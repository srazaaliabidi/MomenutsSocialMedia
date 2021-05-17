import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import logo from '../assets/momentuslogo.png';
const axios = require ('axios');
import { userLogout} from '../redux/actions/loginActions';
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';


function Logout () {
  const history = useHistory ();
  const dispatch = useDispatch();
  //React.useEffect (() => {
    alert("In");  
    axios
      .post ('/logout')
      .then(function(result) {
        console.log("Not Logged In");
      }).catch(function(status, errorCode) {
        console.log("could not logout");
      });
    dispatch(userLogout);
    history.push('/');
    history.go (0);
    console.log("out");
  //[]);

  return(
    <div class="centergrid">
      <h2>You are not logged in</h2>
    </div>
  );
}

export default Logout;

