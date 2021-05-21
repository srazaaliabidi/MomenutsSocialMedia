import React from 'react';
import { connect } from 'react-redux';
import './styles/userlanding.css';
import Logo from '../assets/momentus.png';

// only display if not logged in

const select = appState => ({
    isLoggedIn: appState.loginReducer.isLoggedIn,
    username: appState.loginReducer.username,
    _id: appState.loginReducer._id,
});

function UserLanding({ isLoggedIn }) {
    return (
        <div>
            {!isLoggedIn ?
                <div className="landing-wrapper">
                    <div className="landing-box">
                        <img src={Logo} />
                        <h3>A platform that puts your passions first</h3>
                        <div className="button-group">
                            <a href="/login" className="login-text">Login</a>
                            <a href="/register" className="reg-text">Register</a>
                        </div>
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