import React from 'react';
import './styles/login-reg.css';
import logo from '../assets/momentuslogo.png';

function Register() {
  const [] = React.useState('');
  const [] = React.useState('');
  const [] = React.useState('');
  const [] = React.useState('');
  const [] = React.useState('');

  return (
    <div className="login-reg-wrapper">
      <div className="login-reg-box">
        <img src={logo} />
        <h1>Create Account</h1>
        <div className="input-box">
          <form id="/userregister" action="back_end/server/createUser" method="POST">
            <input type="text" placeholder="Username" id="username" /><br />
            <input type="text" placeholder="Email" id="email" /><br />
            <input type="password" placeholder="Password" id="password" /><br />
            <input
              type="password"
              placeholder="Confirm Password"
              id="confpassword"
            />
            <br />
            <input type="text" placeholder="Name" id="name" /><br />
            <input type="text" placeholder="Email" id="email" /><br />
            <input type="text" placeholder="Date of Birth" id="DOB" /><br />
            <input type="text" placeholder="City" id="city" /><br />
            <input type="text" placeholder="State" id="state" /><br />
            <br />
            <input type="submit" value="Register" /><br />
          </form>
          <br />
        </div>
        <a href="/login">Log in instead</a><br />
      </div>
    </div>
  );
}

export default Register;
