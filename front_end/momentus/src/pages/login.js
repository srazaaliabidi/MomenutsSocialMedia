import React from 'react';
import './styles/login.css';
import logo from '../assets/momentuslogo.png';

function Login () {
  return (
    <div className="login">
      <img src={logo} />
      <form id="userlogin">
        <div className="input-box">
          <input type="text" placeholder="Username" /><br />
          <input type="text" placeholder="Email" /><br />
          <input type="password" placeholder="Password" /><br />
          <input type="password" placeholder="Confirm Password" /><br />
        </div>
        <input type="submit" className="submitlogin">Log in</input><br />
      </form><br />
      <a href="/register">New? Create an account!</a><br />
    </div>
  );
}

export default Login;
