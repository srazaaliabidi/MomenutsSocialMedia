import React from 'react';
import './styles/login-reg.css';
import logo from '../assets/momentuslogo.png';
import './styles/home.css';

function Register () {
  const [email, setEmail] = React.useState ('');
  const [username, setUsername] = React.useState ('');
  const [password, setPassword] = React.useState ('');
  const [confirmPass, setConfirmPass] = React.useState ('');
  const [firstName, setFirstName] = React.useState ('');
  const [lastName, setLastName] = React.useState ('');
  const [city, setCity] = React.useState ('');
  const [state, setState] = React.useState ('');
  const [DOB, setDOB] = React.useState ('');

  return (
    <div className="centergrid">
      <div className="login-reg-wrapper">
        <div className="login-reg-box">
          <img src={logo} />
          <h1>Create Account</h1>
          <div className="input-box">
            <form
              id="/userregister"
              action="back_end/server/createUser"
              method="POST"
            >
              <input
                type="email"
                placeholder="Email"
                onChange={e => setEmail (e.target.value)}
              />
              <br />
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
              <input
                type="password"
                placeholder="Confirm Password"
                id="confirm-password"
                onChange={e => setConfirmPass (e.target.value)}
              />
              <input
                type="text"
                placeholder="First Name"
                onChange={e => setFirstName (e.target.value)}
              />
              <br />
              <input
                type="text"
                placeholder="Last Name"
                onChange={e => setLastName (e.target.value)}
              />
              <br />
              <input
                type="text"
                placeholder="City"
                id="city"
                onChange={e => setCity (e.target.value)}
              />
              <br />
              <input
                type="text"
                placeholder="State"
                id="state"
                onChange={e => setState (e.target.value)}
              />
              <br />
              <label for="DOB">Date of birth</label><br />
              <input
                type="date"
                placeholder="Date of Birth"
                id="DOB"
                onChange={e => setDOB (e.target.value)}
              />
              <br />
              <input type="submit" value="Register" /><br />
            </form>
            <br />
          </div>
          <a href="/login">Log in instead</a><br />
          <p>email: {email}</p>
          <p>username: {username}</p>
          <p>password: {password}</p>
          <p>confirmPass: {confirmPass}</p>
          <p>firstName: {firstName}</p>
          <p>lastName: {lastName}</p>
          <p>city: {city}</p>
          <p>state: {state}</p>
          <p>DOB: {DOB}</p>
        </div>
      </div>
    </div>
  );
}

export default Register;
