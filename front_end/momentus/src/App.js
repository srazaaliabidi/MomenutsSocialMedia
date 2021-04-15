import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
// import './App.css';
import Stream from './pages/stream';
import About from './pages/about';
import Messages from './pages/messages';
import Notifs from './pages/notifs';
import Settings from './pages/settings';
import Search from './pages/search';
import Login from './pages/login';
import Register from './pages/register';
import NavigationBar from './components/NavigationBar';
import SideBar from './components/SideBar';
import { createStore, applyMiddleware, } from "redux";
import rootReducer from "./redux/reducers/rootReducer";
import { Provider, useDispatch } from "react-redux";
import { connect } from 'react-redux';


const store = createStore(rootReducer);

/* 
Grabs states and their default values needed.
Get whether user is logged in, and if so their name and id. 
*/
const select = appState => ({
  isLoggedIn: appState.loginReducer.isLoggedIn,
  username: appState.loginReducer.username,
  _id: appState.loginReducer._id,
})

/*
TODO: Dynamically change what is displayed based on whether
the user is logged in (i.e. show the landing page if not logged in)
But for now we will assume the user is logged in
*/

function App () {
  return (
    <div className="App">
      <Provider store={store}>
        <React.StrictMode>
          <BrowserRouter>
          <NavigationBar />
          <SideBar />
            <Switch>
              <Route exact path="/">
                <Stream />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/messages">
                <Messages />
              </Route>
              <Route path="/notifs">
                <Notifs />
              </Route>
              <Route path="/settings">
                <Settings />
              </Route>
              <Route path="/search">
                <Search />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
            </Switch>
          </BrowserRouter>
        </React.StrictMode>
      </Provider>
    </div>
  );
}

export default App;
