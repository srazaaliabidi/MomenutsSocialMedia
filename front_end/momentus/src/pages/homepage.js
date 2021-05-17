import React, { Component } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

import Stream from './stream';
import About from './about';
import Messages from './messages';
import Notifs from './notifs';
import Settings from './settings';
import UserProfile from './userprofile';
import SearchResults from './searchresults';
import NavigationBar from '../components/NavigationBar';
import TrendingSideBar from '../components/TrendingSideBar';
import CollectionSidebar from '../components/CollectionSidebar';

// bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/home.css';

import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../redux/reducers/rootReducer';
import { Provider, useDispatch } from 'react-redux';
import { useSelector, connect } from 'react-redux';
import { createBrowserHistory } from 'history';

function Homepage({ isLoggedIn, username, _id, pfpURL }) {
	return (
		<div className="App">
			<NavigationBar />
			<Container fluid className="grid-container">
				<Row className="row-container">
					<Col className="sidebar"><TrendingSideBar /></Col>
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
								<Route path="/userprofiletest">
									<UserProfile />
								</Route>
							</Switch>
						</BrowserRouter>
					</Col>
					<Col className="sidebar"><CollectionSidebar username={username} pfpURL={pfpURL} /></Col>
				</Row>
				<React.StrictMode>
				</React.StrictMode>
			</Container>
		</div>
	);
}

export default Homepage