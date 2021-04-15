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
<<<<<<< HEAD
import CreatePost from './pages/createpost';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './redux/reducers/rootReducer';
import {Provider, useDispatch} from 'react-redux';
import {useSelector, connect} from 'react-redux';
//import './App.css';
import './pages/styles/home.css';
import CollectionSidebar from './components/CollectionSidebar';

const store = createStore (rootReducer);

/* 
Grabs states and their default values needed.
Get whether user is logged in, and if so their name and id. 
*/

=======
import { createStore, applyMiddleware, } from "redux";
import rootReducer from "./redux/reducers/rootReducer";
import { Provider, useDispatch } from "react-redux";
import { useSelector, connect } from "react-redux";


const store = createStore(rootReducer);
>>>>>>> 1235101ab91d5cdfa550b7d1ee40dd39878aeb47
const select = appState => ({
  // isLoggedIn: appState.loginReducer.isLoggedIn,
  // username: appState.loginReducer.username,
  // userID: appState.loginReducer.userID
  isLoggedIn: true,
<<<<<<< HEAD
  pfpURL: 'http://mattrbolles.com/charles.jpg',
  username: 'test',
  userID: 1,
});
=======
  pfpURL: "http://mattrbolles.com/charles.jpg",
  username: "test",
  userID: 1
})
>>>>>>> 1235101ab91d5cdfa550b7d1ee40dd39878aeb47


/*
TODO: Dynamically change what is displayed based on whether
the user is logged in (i.e. show the landing page if not logged in)
But for now we will assume the user is logged in
*/

<<<<<<< HEAD
function App({username, pfpURL}) {
  return (
    <div className="App">
      <div class="grid-container">
        <React.StrictMode>
          <React.StrictMode>
            <BrowserRouter>
              <NavigationBar />
              <CollectionSidebar />
              <SideBar username={username} pfpURL={pfpURL} />
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
                <Route path="/createpost">
                  <CreatePost />
                </Route>;

              </Switch>
            </BrowserRouter>
          </React.StrictMode>

        </React.StrictMode>
      </div>
=======
function App ({username, pfpURL}) {
  return (
    <div className="App">
        <React.StrictMode>
          <BrowserRouter>
          <NavigationBar />
          <SideBar username = {username} pfpURL = {pfpURL} />
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
>>>>>>> 1235101ab91d5cdfa550b7d1ee40dd39878aeb47
    </div>
  );
}

export default connect(select)(App);
