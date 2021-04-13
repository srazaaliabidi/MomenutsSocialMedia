import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
// import './App.css';
import Home from './pages/home';
import About from './pages/about';
import Messages from './pages/messages';
import Notifs from './pages/notifs';
import Settings from './pages/settings';
import Search from './pages/search';
import Login from './pages/login';
import Register from './pages/register';
import { createStore, applyMiddleware, } from "redux";

function App () {
  // used to display loading text - will reimplement later
  /*   const [data, setData] = React.useState(null);
  
    React.useEffect(() => {
      fetch("/api")
        //.then((res) => console.log(res))
        .then((res) => res.json())
        .then((data) => setData(data.message));  
    }, []);
   */

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {/* <p>{!data ? "Loading..." : data}</p> */}
            <Home />
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
    </div>
  );
}

export default App;
