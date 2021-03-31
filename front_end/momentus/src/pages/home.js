import React from 'react';
import logo from '../logo.svg';
import '../App.css';

function Home() {
    return(
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    test! - front end stuff will go here
                </p>
                {/* <p>{!data ? "Loading..." : data}</p> */}
            </header>
        </div>
    );
}

export default Home;
