import React, { useState } from 'react';
import './styles/login-reg.css';
import logo from '../assets/momentuslogo.png';

function Login() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e) => {
    
  }

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
          <input type="submit" className="submit-login" value="Login" /><br />
        </form><br />
        <a href="/register">New? Create an account!</a><br />
        <p>Data testing</p>
        <p>username: {username}</p>
        <p>password: {password}</p>
      </div>
    </div>
  );
}

export default Login;
