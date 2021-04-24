import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
// import './App.css';
import Login from './pages/login';
import Register from './pages/register';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers/rootReducer';
import { Provider, useDispatch } from 'react-redux';
import { useSelector, connect } from 'react-redux';
import { createBrowserHistory } from 'history';

import 'bootstrap/dist/css/bootstrap.min.css';
import './pages/styles/home.css';
import Homepage from './pages/homepage';

/*
TODO: Dynamically change what is displayed based on whether
the user is logged in (i.e. show the landing page if not logged in)
But for now we will assume the user is logged in
*/

const store = createStore(rootReducer);
const select = appState => ({
  // isLoggedIn: appState.loginReducer.isLoggedIn,
  // username: appState.loginReducer.username,
  // userID: appState.loginReducer.userID
  isLoggedIn: true,
  pfpURL: 'https://t3.ftcdn.net/jpg/02/22/39/64/240_F_222396430_Yvf2e080ejpzCOQmETC2zbk6EwCsfHm4.jpg',
  username: 'test',
  userID: 1,
});

export const history = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <BrowserRouter history={history}>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <Homepage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default connect(select)(App);
