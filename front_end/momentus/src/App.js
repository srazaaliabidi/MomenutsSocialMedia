import React, { Component } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import About from './pages/about';

function App() {
  // used to display loading text
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      //.then((res) => console.log(res))
      .then((res) => res.json())
      .then((data) => setData(data.message));
      
  }, []);

  return (
    <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
