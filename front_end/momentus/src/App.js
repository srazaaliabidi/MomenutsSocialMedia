import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
// import './App.css';
import Stream from './pages/stream';
import About from './pages/about';
import Messages from './pages/messages';
import Notifs from './pages/notifs';
import Settings from './pages/settings';
import SearchResults from './pages/searchresults';
import Login from './pages/login';
import Register from './pages/register';
import NavigationBar from './components/NavigationBar';
import TrendingSideBar from './components/TrendingSideBar';
import CollectionSidebar from './components/CollectionSidebar';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers/rootReducer';
import { Provider, useDispatch } from 'react-redux';
import { useSelector, connect } from 'react-redux';
import { createBrowserHistory } from 'history';

// bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import 'bootstrap/dist/css/bootstrap.min.css';
import './pages/styles/home.css';

export const history = createBrowserHistory();

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

/*
TODO: Dynamically change what is displayed based on whether
the user is logged in (i.e. show the landing page if not logged in)
But for now we will assume the user is logged in
*/

function App({ username, pfpURL }) {
  return (
    <div className="App">
      <NavigationBar />
      <Container fluid className="grid-container">
        <Row className="row">
          <Col><TrendingSideBar /></Col>
          <Col>
            <BrowserRouter history={history}>
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
                <Route path="/searchresults">
                  <SearchResults />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/register">
                  <Register />
                </Route>
              </Switch>
            </BrowserRouter>
          </Col>
          <Col><CollectionSidebar username={username} pfpURL={pfpURL} /></Col>
        </Row>
        <React.StrictMode>
        </React.StrictMode>
      </Container>
    </div>
  );
}

export default connect(select)(App);
