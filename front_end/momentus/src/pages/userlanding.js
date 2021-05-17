import React from 'react';

// only display if not logged in

function UserLanding() {
    return(
        <div>
        <h1>Welcome to Momentus.</h1>
        <a href = "/login">Login</a>
        <a href = "/register">Register</a>
        </div>
    );
}

export default UserLanding;