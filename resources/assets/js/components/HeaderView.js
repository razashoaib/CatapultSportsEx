import React from "react";
import { Link } from 'react-router-dom';

export const HeaderView = (props) => {
    return (
        

        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
          <span className="navbar-brand" href="#">Catapult Sports</span>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to={"/athletes"} activestyle={{color: "red"}}>Athletes</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/teams"} activestyle={{color: "red"}}>Teams</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/sports"} activestyle={{color: "red"}}>Sports</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/login"} activestyle={{color: "red"}}>Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/register"} activestyle={{color: "red"}}>Register</Link>
            </li>
            
          </ul>
        </nav>
    );
};

export default HeaderView