import React, { useState } from 'react';
import './styles/login-reg.css';
import logo from '../assets/momentus.png';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../redux/reducers/rootReducer';
import loginReducer from "../redux/reducers/loginReducer";
import { userLogin } from '../redux/actions/loginActions';
import './styles/home.css';
import { connect } from 'react-redux';
import {useHistory} from 'react-router-dom';

const select = appState => ({
  isLoggedIn: appState.loginReducer.isLoggedIn,
  username: appState.loginReducer.username,
  userID: appState.loginReducer.userID,
  // isLoggedIn: true,
  // pfpURL: 'https://t3.ftcdn.net/jpg/02/22/39/64/240_F_222396430_Yvf2e080ejpzCOQmETC2zbk6EwCsfHm4.jpg',
  // username: 'test',
  // userID: 1,
});

function Login() {
  const history = useHistory ();
  const dispatch = useDispatch();
  const [usernameToSubmit, setUsername] = useState('');
  const [passwordToSubmit, setPassword] = useState('');
  let username = "";
  let _id = "";
  let userData = {};

  

  function submit(e) {
    e.preventDefault();
    axios.post('/verifyUser', {
      username: usernameToSubmit,
      password: passwordToSubmit,
    })
      /* .then(response => {
        console.log("Logged in")
        console.log(response)
      }); */
      .then(res => {
        console.log("logged in");
        console.log(res.data[0]);
        let userID = res.data[0].userID
        console.log(userID)
        dispatch(userLogin(usernameToSubmit, userID));
    })
    .catch(function (error) {
      console.log(error);
    });
    
    history.push('/');
    //history.go (0);
  }


  return (
    <div className="login-reg-wrapper">
      <div className="login-reg-box">
        <img src={logo} />
        <h1>Welcome Back!</h1>
        <form id="/userlogin" onSubmit={(e) => submit(e)}>
          <div className="input-box">
            <input
              type="text"
              placeholder="Username"
              value={usernameToSubmit}
              onChange={e => setUsername(e.target.value)}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              value={passwordToSubmit}
              onChange={e => setPassword(e.target.value)}
            />
            <br />
          </div>
          <input type="submit" className="submit-login" value="Login" /><br />
        </form>
        <a href="/register">New? Create an account!</a><br />
      </div>
    </div>
  );
}

export default Login;
