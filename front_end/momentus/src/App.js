import React from 'react';
import logo from './logo.svg';
import './App.css';




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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          test! - front end stuff will go here
        </p>
        <p>{!data ? "Loading..." : data}</p>
      </header>
    </div>
  );
}

export default App;
