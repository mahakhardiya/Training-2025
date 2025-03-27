import React from "react";
import { Link } from "react-router-dom";

const HomeHeader = () => {

  return (
    <div className="header">
      <h1 className="ims">Brewventory 
        <>
        <p>Smooth inventory management</p></></h1> 
      <ul className="nav-links">

          <li>
            <Link to="/login">Login</Link>
          </li>

          <li>
          <Link to="/register">Register</Link>
          </li>

      </ul>
    </div>
  );
};

export default HomeHeader;
