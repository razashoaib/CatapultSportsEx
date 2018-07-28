import React from "react";
import { Link } from 'react-router-dom';

export const HeaderView = (props) => {
    return (

        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to={"/"}>Admin Panel</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/athletes"}>Athletes</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/teams"}>Teams</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/sports"}>Sports</Link>
                    </li>
                </ul>
            </div>
            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to={"/login"}>Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/register"}>Register</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default HeaderView