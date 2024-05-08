import React, { useState } from 'react'
import "./Loginpage.css"
import { LoginApi } from '../services/Api'
import { store_user_data } from '../services/storage'
import { isAuthenticated } from '../services/Auth'
import { Link, Navigate } from 'react-router-dom'
import { NavBar } from './Navbar'


const Loginpage = () => {

    const InitialStateErrors = {
        email: { required: false },
        password: { required: false },
        custom_error: null as string | null
    }
    const [errors, seterrors] = useState(InitialStateErrors)
    const [loading, setloading] = useState(false)
    const [inputs, setinputs] = useState({
        email: "",
        password: ""
    })
    const handleinput = (e: any) => {
        setinputs({ ...inputs, [e.target.name]: e.target.value })
    }

    const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let updatedErrors = { ...InitialStateErrors }; // Create a copy of InitialStateErrors
        let hasError = false;

        if (inputs.email === "") {
            updatedErrors.email.required = true;
            hasError = true;
        }
        if (inputs.password === "") {
            updatedErrors.password.required = true;
            hasError = true;
        }
        if (!hasError) {
            setloading(true);
            LoginApi(inputs)
                .then((response) => {

                    store_user_data(response.data.idToken)
                })
                .catch((err) => {
                    if (err.code == "ERR_BAD_REQUEST") {
                        seterrors({ ...errors, custom_error: "Invalid Credentials" })
                    }
                    else if (String(err.response.data.error.message).includes("WEAK_PASSWORD")) {
                        seterrors({ ...errors, custom_error: "Password should contain Minimum 6 charecters" })
                    }
                })
                .finally(() => {
                    setloading(false);
                });
        }
        seterrors({ ...updatedErrors }); // Update state with the modified copy
    }

    if (isAuthenticated()) {
        return <Navigate to="/dashboard" />
    }

    return (
        <>
            <NavBar />
            <section className="login-block">
                <div className="container">
                    <div className="row ">
                        <div className="col login-sec">
                            <h2 className="text-center">Login Now</h2>
                            <form onSubmit={handlesubmit} className="login-form" action="">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1" className="text-uppercase">Email</label>

                                    <input type="text" className="form-control" name="email" id="" onChange={handleinput} placeholder='email'></input>
                                    {errors.email.required ? (<span className="text-danger" >
                                        Email is required.
                                    </span>) : null}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                                    <input className="form-control" type="password" name="password" id="" onChange={handleinput} placeholder='password'></input>
                                    {errors.password.required ? (<span className="text-danger" >
                                        Password is required.
                                    </span>) : null}
                                </div>
                                <div className="form-group">

                                    {errors.custom_error ? (
                                        <p>{errors.custom_error}</p>) : null}
                                    {loading ? (<div className="text-center">
                                        <div className="spinner-border text-primary " role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>) : null}

                                    <input type="submit" className="btn btn-login float-right" value="Login" />
                                </div>
                                <div className="clearfix"></div>
                                <div className="form-group">
                                    Create new account ? Please <Link to="/register">Register</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Loginpage