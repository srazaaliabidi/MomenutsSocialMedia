import React, { Component } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Switch,
  useParams,
} from "react-router-dom";

import Stream from "./stream";
import About from "./about";
import Messages from "./messages";
import Notifs from "./notifs";
import Settings from "./settings";
import UserProfile from "./userprofile";
import SearchResults from "./searchresults";
import NavigationBar from "../components/NavigationBar";
import TrendingSideBar from "../components/TrendingSideBar";
import CollectionSidebar from "../components/CollectionSidebar";
import IndividualPost from "../components/IndividualPost";
import CollectionsImages from "../components/CollectionsImages";

// bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/home.css";

import { createStore, applyMiddleware } from "redux";
import rootReducer from "../redux/reducers/rootReducer";
import { Provider, useDispatch } from "react-redux";
import { useSelector, connect } from "react-redux";
import { createBrowserHistory } from "history";

const select = (appState) => ({
  isLoggedIn: appState.loginReducer.isLoggedIn,
  username: appState.loginReducer.username,
  _id: appState.loginReducer._id,
});

function Homepage({ isLoggedIn, username, _id, pfpURL }) {
  return (
    <div>
      {isLoggedIn ? (
        <div className="App">
          <div></div>
          <NavigationBar />
          <Container fluid className="grid-container">
            <Row className="row-container">
              <Col className="sidebar">
                <TrendingSideBar />
              </Col>
              <Col className="center-grid-wrapper">
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
                    <Route path="/searchresults">
                      <SearchResults />
                    </Route>
                    <Route path="/user/:userID">
                      <UserProfile/>
                    </Route>
                    <Route path="/post/:postID">
                      <IndividualPost />
                    </Route>
                    <Route path="/collection/:collectionID">
                      <CollectionsImages/>
                    </Route>
                  </Switch>
                </BrowserRouter>
              </Col>
              <Col className="sidebar">
                <CollectionSidebar username={username} pfpURL={pfpURL} />
              </Col>
            </Row>
          </Container>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default connect(select)(Homepage);
