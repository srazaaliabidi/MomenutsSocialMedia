import React from 'react';
import { connect } from 'react-redux';

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
            <div>
            <h1>Welcome to Momentus.</h1>
            <a href = "/login">Login</a>
            <a href = "/register">Register</a>
            </div>
        :
        <div>
        </div>
        }   
        </div>
    );
}

export default connect(select)(UserLanding);