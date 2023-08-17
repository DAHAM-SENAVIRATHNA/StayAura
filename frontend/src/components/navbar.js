import React from 'react';

function Navbar() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    console.log('User data from localStorage:', user);

    return (
        <nav className="navbar navbar-expand-lg">
            <a className="navbar-brand" href="/home">STAY AURA</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    {user ? (
                        <li className="nav-item">
                            <span className="nav-link" style={{ color: 'white' }}>{user.name}</span>
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
