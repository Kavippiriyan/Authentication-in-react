import React, { useState } from 'react'
import './Register.css'
import { RegisterApi } from '../services/Api'
import { store_user_data } from '../services/storage'
import { isAuthenticated } from '../services/Auth'
import { Link, Navigate } from 'react-router-dom'
import { NavBar } from './Navbar'

function Register() {

    const InitialStateErrors = {
        email: { required: false },
        password: { required: false },
        name: { required: false },
        custom_error: null as string | null
    }
    const [errors, seterrors] = useState(InitialStateErrors)
    const [loading, setloading] = useState(false)
    const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let updatedErrors = { ...InitialStateErrors }; // Create a copy of InitialStateErrors
        let hasError = false;
        if (inputs.name === "") {
            updatedErrors.name.required = true;
            hasError = true;
        }
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
            RegisterApi(inputs)
                .then((response) => {

                    store_user_data(response.data.idToken)
                })
                .catch((err) => {
                    if (err.response.data.error.message == "EMAIL_EXISTS") {
                        seterrors({ ...errors, custom_error: "Already Email is Registered" })
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
    const [inputs, setinputs] = useState({
        email: "",
        password: "",
        name: ""
    })

    const handleinput = (e: any) => {
        setinputs({ ...inputs, [e.target.name]: e.target.value })
    }

    if (isAuthenticated()) {
        return <Navigate to="/dashboard" />
    }

    return (
        <>
            <NavBar />
            <section className="register-block">
                <div className="container">
                    <div className="row ">
                        <div className="col register-sec">
                            <h2 className="text-center">Register Now</h2>
                            <form onSubmit={handlesubmit} className="register-form" action="" >
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1" className="text-uppercase">Name</label>

                                    <input type="text" className="form-control" name="name" id="" onChange={handleinput} placeholder='name'></input>
                                    {errors.name.required ? (<span className="text-danger" >
                                        Name is required.
                                    </span>) : null}
                                </div>
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

                                    <input type="submit" className="btn btn-login float-right" value="Register" disabled={loading}></input>
                                </div>
                                <div className="clearfix"></div>
                                <div className="form-group">
                                    Already have account ? Please <Link to="/login">Login</Link>
                                </div>


                            </form>


                        </div>

                    </div>


                </div>
            </section>
        </>
    )
}

export default Register