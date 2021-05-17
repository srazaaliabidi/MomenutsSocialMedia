import React, { useState } from 'react';
import './styles/login-reg.css';
import logo from '../assets/momentuslogo.png';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import loginReducer from "../redux/reducers/loginReducer";
import { userLogin } from '../redux/actions/loginActions';
import './styles/home.css';
import { connect } from 'react-redux';

const select = appState => ({
  isLoggedIn: appState.loginReducer.isLoggedIn,
  username: appState.loginReducer.username,
  _id: appState.loginReducer._id,
});

function Login({isLoggedIn, username, _id}) {
  const dispatch = useDispatch();
  const [usernameToSubmit, setUsername] = useState('');
  const [passwordToSubmit, setPassword] = useState('');


  function submit(e) {
    e.preventDefault();
    axios.post('/verifyUser', {
      usernameToSubmit: usernameToSubmit,
      passwordToSubmit: passwordToSubmit,
    })
      .then(response => {
        console.log("Logged in")
        console.log(response.body)
        console.log(isLoggedIn)
        console.log(username)
        console.log(_id)
      });
      dispatch(userLogin(usernameToSubmit, passwordToSubmit));
  }


  return (
    <div className="login-reg-wrapper">
      <div className="login-reg-box">
        <img src={logo} />
        <h1>Welcome Back!</h1>
        <div>
          isLoggedIn: {isLoggedIn}
          username: {username}
          id: {_id}
        </div>
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

export default connect(select)(Login);
