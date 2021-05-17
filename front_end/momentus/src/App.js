import React from 'react';
//import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import './App.css';
import Login from './pages/login';
import Register from './pages/register';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';
import ReduxTest from './components/ReduxTest';
import 'bootstrap/dist/css/bootstrap.min.css';
import './pages/styles/home.css';
import Homepage from './pages/homepage';
import UserLanding from './components/UserLanding';

const select = appState => ({
  isLoggedIn: appState.loginReducer.isLoggedIn,
  username: appState.loginReducer.username,
  _id: appState.loginReducer._id,
})

export const history = createBrowserHistory();

function App({isLoggedIn, username, userID}) {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path = "/redux">
            <ReduxTest />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            {isLoggedIn ? <Homepage /> : <UserLanding /> }
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default connect(select)(App);
