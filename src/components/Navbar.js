import React from 'react';
import { Link } from 'react-router-dom';

const MyNavbar = () => {


    // Define styles as JavaScript objects
    const iconStyle = {
        color: '#ffffff',
        margin: '0 1em',
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark custom-nav-foot-style">
            <div className="container-fluid">
                <i className="fa-solid fa-ranking-star" style={iconStyle}></i>
                <Link className="navbar-brand" to="/">LeaderBoard</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/register">Register</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="https://github.com/KrishKumar3004/leaderboard-cf-cse" target="_blank">Repository</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default MyNavbar;