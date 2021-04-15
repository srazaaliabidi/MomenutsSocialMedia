import React, { useState } from 'react';
import './styles/login-reg.css';
import logo from '../assets/momentuslogo.png';
import { useDispatch } from "react-redux";
import axios from "axios";
import { userLogin } from "../redux/actions/loginActions";

function Login() {
  const dispatch = useDispatch();
  const [usernameToSubmit, setUsername] = React.useState('');
  const [passwordToSubmit, setPassword] = React.useState('');
  let username = "";
  let userID = "";
  let userData = {};

  const handleSubmit = () => {
    axios.post('/verifyUser', {username: usernameToSubmit, password: passwordToSubmit})
    // we need to get back user info if login succesful, then dispatch it to global state
    // so we can tell who is logged in from anywhere in the app 
    .then(res => {
        username = res.data.username;
        userID = res.data.userID;
        userData = res.data; // whole user object
    });
    dispatch(userLogin(username, userID));
  };

  return (
    <div className="login-reg-wrapper">
      <div className="login-reg-box">
        <img src={logo} />
        <h1>Welcome Back!</h1>
        <form id="/userlogin">
          <div className="input-box">
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} /><br />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /><br />
          </div>
          <button type="submit" className="submit-login" value="Login" onClick = {() => {handleSubmit()}}>Login</button>
          <br />
        </form><br />
        <a href="/register">New? Create an account!</a><br />
      </div>
    </div>
  );
}

export default Login;
