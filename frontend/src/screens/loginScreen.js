import React, { useState } from 'react';

function LoginScreen() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function Login() {
        const user = {
            email,
            password,
        };
        console.log(user);
    }

    return (
        <div>
            <section className="vh-100" style={{ backgroundColor: "#eee" }}>
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ borderRadius: "25px" }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                            <p className="text-center h1 fw-bold mb-4 mx-1 mx-md-4 mt-3">Login</p>
                                            <form className="mx-1 mx-md-4">
                                                <div className="d-flex flex-row align-items-center mb-3">
                                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input className="form-control" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                                                        <input className="form-control" placeholder='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                                                        <button className='btn btn-primary' type='button' onClick={Login}>Login</button>
                                                    </div>
                                                </div>

                                                {/* Rest of the form elements */}

                                            </form>
                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                                className="img-fluid" alt="Sample" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}


export default LoginScreen;
