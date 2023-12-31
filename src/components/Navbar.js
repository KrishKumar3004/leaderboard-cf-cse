import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MyNavbar = () => {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

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
                    aria-expanded={!isNavCollapsed}
                    aria-label="Toggle navigation"
                    onClick={handleNavCollapse}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isNavCollapsed ? '' : 'show'}`} id="navbarNav">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/" onClick={handleNavCollapse}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/register" onClick={handleNavCollapse}>Register</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="https://github.com/KrishKumar3004/leaderboard-cf-cse" target="_blank" onClick={handleNavCollapse}>Repository</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default MyNavbar;