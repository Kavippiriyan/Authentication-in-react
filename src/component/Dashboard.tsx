import React, { useEffect, useState } from "react";
import { userDetailsapi } from "../services/Api";
import { NavBar } from "./Navbar";
import { isAuthenticated, logout } from "../services/Auth";
import { Navigate, useNavigate } from "react-router-dom";

export const DashboardPage = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState({ name: "", email: "", localId: "" });

    useEffect(() => {
        if (isAuthenticated()) {
            userDetailsapi()
                .then((res) => {
                    setUser({
                        name: res.data.users[0].displayName,
                        email: res.data.users[0].email,
                        localId: res.data.users[0].localId,
                    });
                })
        }
    }, []);


    const logoutUser = () => {
        logout();
        navigate('/login')
    }
    if (!isAuthenticated()) {
        return <Navigate to="/login" />
    }

    return (
        <>
            <NavBar logoutUser={logoutUser} />
            <main role="main" className="container mt - 5">
                < div className="container" >
                    <div className="text-center mt-5">
                        <h3>Dashboard page</h3>
                        {user.name && user.email && user.localId ? (
                            <div>
                                <p className="text-bold">Hi {user.name}, your Firebase ID is {user.localId}</p>
                                <p className="text-bold">Your email is {user.email}</p>
                            </div>
                        ) : (
                            <p>...Loading</p>
                        )}
                    </div>
                </div >
            </main >
        </>
    );
};

export default DashboardPage;
