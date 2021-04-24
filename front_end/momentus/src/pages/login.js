import React, {useState} from 'react';
import './styles/login-reg.css';
import logo from '../assets/momentuslogo.png';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import {userLogin} from '../redux/actions/loginActions';
import './styles/home.css';

function Login () {
  const dispatch = useDispatch ();
  const [usernameToSubmit, setUsername] = React.useState ('');
  const [passwordToSubmit, setPassword] = React.useState ('');
  let username = '';
  let userID = '';
  let userData = {};

  const handleSubmit = e => {};

  return (
      <div className="login-reg-wrapper">
        <div className="login-reg-box">
          <img src={logo} />
          <h1>Welcome Back!</h1>
          <form id="/userlogin">
            <div className="input-box">
              <input
                type="text"
                placeholder="Username"
                onChange={e => setUsername (e.target.value)}
              />
              <br />
              <input
                type="password"
                placeholder="Password"
                onChange={e => setPassword (e.target.value)}
              />
              <br />
            </div>
            <input type="submit" className="submit-login" value="Login" /><br />
          </form><br />
          <a href="/register">New? Create an account!</a><br />
        </div>
      </div>
  );
}

export default Login;
