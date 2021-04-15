import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
<<<<<<< HEAD
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './redux/reducers/rootReducer';
import {Provider, useDispatch} from 'react-redux';
import {useSelector, connect} from 'react-redux';

const store = createStore (rootReducer);

/* 
Grabs states and their default values needed.
Get whether user is logged in, and if so their name and id. 
We are going to put in default values for now for testing purposes.
*/
const select = appState => ({
  // isLoggedIn: appState.loginReducer.isLoggedIn,
  // username: appState.loginReducer.username,
  // userID: appState.loginReducer.userID
  isLoggedIn: true,
  username: 'test',
  userID: 1,
});

ReactDOM.render (
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById ('root')
=======
import { createStore, applyMiddleware, } from "redux";
import rootReducer from "./redux/reducers/rootReducer";
import { Provider, useDispatch } from "react-redux";
import { useSelector, connect } from "react-redux";

const store = createStore(rootReducer);

/* 
Grabs states and their default values needed.
Get whether user is logged in, and if so their name and id. 
We are going to put in default values for now for testing purposes.
*/
const select = appState => ({
  // isLoggedIn: appState.loginReducer.isLoggedIn,
  // username: appState.loginReducer.username,
  // userID: appState.loginReducer.userID
  isLoggedIn: true,
  username: "test",
  userID: 1
})

ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
>>>>>>> 1235101ab91d5cdfa550b7d1ee40dd39878aeb47
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals ();
