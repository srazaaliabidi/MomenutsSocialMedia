import React, { useState } from 'react';
import './styles/login-reg.css';
import logo from '../assets/momentuslogo.png';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { userLogin } from '../redux/actions/loginActions';
import './styles/home.css';

function Login() {
  const dispatch = useDispatch();
  const [usernameToSubmit, setUsername] = useState('');
  const [passwordToSubmit, setPassword] = useState('');
  let username = '';
  let userID = '';
  let userData = {};


  function submit(e) {
    e.preventDefault();
    axios.post('/verifyUser', {
      usernameToSubmit: usernameToSubmit,
      passwordToSubmit: passwordToSubmit,
    })
      .then(response => {
        console.log("Logged in")
      })
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
        </form><br />
        <a href="/register">New? Create an account!</a><br />
      </div>
    </div>
  );
}

export default Login;
