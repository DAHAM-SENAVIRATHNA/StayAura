import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
    const userJSON = localStorage.getItem('currentUser');
    console.log('User data from localStorage (userJSON):', userJSON);

    let user = null;

    try {
        user = userJSON ? JSON.parse(userJSON) : null;
    } catch (error) {
        console.error('Error parsing JSON:', error);
    }

    console.log('Parsed user data:', user);

    function logout() {
        localStorage.removeItem('currentUser');
        window.location.href = '/login';
    }

    return (
        <nav className="navbar navbar-expand-lg">
            <a className="navbar-brand" href="/">STAY AURA</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mr-4">
                    {user ? (
                        <li className="nav-item dropdown">
                            <div className="dropdown">
                                <button className="btn dropdown-toggle dropdown-button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <FontAwesomeIcon style={{ marginRight: '10px' }} icon={faUser} />
                                    {user.name}
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    {user.isAdmin && (
                                        <a className="dropdown-item" href="/admin">Admin Panel</a>
                                    )}
                                    <a className="dropdown-item" href="/profile">Profile</a>
                                    <a className="dropdown-item" href="/login" onClick={logout}>Logout</a>
                                </div>
                            </div>
                        </li>
                    ) : (
                        <>
                            <li className="nav-item active">
                                <a className="nav-link" href="/register">Register</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" style={{ marginLeft: '5px', marginRight: '10px' }} href="/login">Login</a>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
