import React from 'react';
import { connect } from 'react-redux';
import './styles/userlanding.css';

// only display if not logged in

const select = appState => ({
    isLoggedIn: appState.loginReducer.isLoggedIn,
    username: appState.loginReducer.username,
    _id: appState.loginReducer._id,
});

function UserLanding({isLoggedIn}) {
    return (
        <div>
            {!isLoggedIn ?
                
        <div className="landing-wrapper">
            <div className="landing-box">
                    <h1>Welcome to Momentus.</h1>
            <p className="landing-content">- A platform that puts your passions first -</p>
            <p className="login-text"><a href = "/login">Login</a></p>
            <p className="reg-text"><a href = "/register">Register</a></p>
                </div>
                </div>
        :
        <div>
        </div>
        }   
        </div>
    );
}

export default connect(select)(UserLanding);