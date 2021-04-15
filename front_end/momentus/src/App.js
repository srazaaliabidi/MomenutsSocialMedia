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
import TrendingSidebar from './components/TrendingSidebar';
import CollectionSidebar from './components/CollectionSidebar';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './redux/reducers/rootReducer';
import {Provider, useDispatch} from 'react-redux';
import {useSelector, connect} from 'react-redux';
import './pages/styles/home.css';

const store = createStore (rootReducer);
const select = appState => ({
  // isLoggedIn: appState.loginReducer.isLoggedIn,
  // username: appState.loginReducer.username,
  // userID: appState.loginReducer.userID
  isLoggedIn: true,
  pfpURL: 'http://mattrbolles.com/charles.jpg',
  username: 'test',
  userID: 1,
});

/*
TODO: Dynamically change what is displayed based on whether
the user is logged in (i.e. show the landing page if not logged in)
But for now we will assume the user is logged in
*/

function App({username, pfpURL}) {
  return (
    <div className="App">
      <div class="grid-container">
        <React.StrictMode>
          <NavigationBar />
          <TrendingSidebar />
          <CollectionSidebar username={username} pfpURL={pfpURL} />
          <BrowserRouter>
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
      </div>
    </div>
  );
}

export default connect (select) (App);
