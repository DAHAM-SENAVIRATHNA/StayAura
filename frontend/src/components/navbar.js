import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    console.log('User data from localStorage:', user);

    function logout(){
        localStorage.removeItem('currentUser');
        window.location.href = '/login';

    }

    return (
        <nav className="navbar navbar-expand-lg">
            <a className="navbar-brand" href="/home">STAY AURA</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
</button>


            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mr-4">
                    {user ? (
                        <li className="nav-item dropdown">
                          
                            <div class="dropdown  ">
                            <button class="btn dropdown-toggle  dropdown-button " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <FontAwesomeIcon style={{marginRight:'10px'}} icon={faUser} />
                                    {user.name}
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a class="dropdown-item" href="/profile">Profile</a>
                                    <a class="dropdown-item" href="/login" onClick={logout}>Logout</a>
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


