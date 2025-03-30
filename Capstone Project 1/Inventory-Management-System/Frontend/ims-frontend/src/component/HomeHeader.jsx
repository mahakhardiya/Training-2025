import React, { useState } from "react";
import { Link } from "react-router-dom";


const HomeHeader = () => {

const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="header">
          <h1 className="ims">
          <Link to="/" className="logo-link">PantryPilot</Link>
            {/* <p>Navigate Inventory with Ease</p> */}
          </h1>
          
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
    
          <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
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
