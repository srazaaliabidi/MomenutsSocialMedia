import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../redux/reducers/rootReducer';
import loginReducer from "../redux/reducers/loginReducer";
import { userLogin, userLogout } from '../redux/actions/loginActions';
import { connect } from 'react-redux';
import {useHistory} from 'react-router-dom';


// testing redux to make sure states get updated

const select = appState => ({
  isLoggedIn: appState.loginReducer.isLoggedIn,
  username: appState.loginReducer.username,
  userID: appState.loginReducer.userID,
  // isLoggedIn: true,
  // pfpURL: 'https://t3.ftcdn.net/jpg/02/22/39/64/240_F_222396430_Yvf2e080ejpzCOQmETC2zbk6EwCsfHm4.jpg',
  // username: 'test',
  // userID: 1,
});

function ReduxTest({username, isLoggedIn}) {
  const history = useHistory ();
  const dispatch = useDispatch();
  const [usernameToSubmit, setUsername] = useState('');
  const [passwordToSubmit, setPassword] = useState('');
  //let username = "";
  let _id = "";
  let userData = {};

  
  function loginTest() {
    dispatch(userLogin("test"));
  }

  function logoutTest() {
    dispatch(userLogout);
  }



  return (
    <div>
        <div>
            <button onClick = {loginTest()}>Login Test</button>
        </div>
        <div>
            <button onClick = {logoutTest()}>Logout Test</button>
        </div>
        username: {username}
        isLoggedIn: {isLoggedIn}
    </div>
    
  );
}

export default connect(select)(ReduxTest);
