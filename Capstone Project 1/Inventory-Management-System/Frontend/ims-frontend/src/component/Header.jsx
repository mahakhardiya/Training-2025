import React, { useState } from "react";
import { Link } from "react-router-dom";
import ApiService from "../service/ApiService";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isAuth = ApiService.isAuthenticated();
  const isAdmin = ApiService.isAdmin();

  const logout = () => {
    ApiService.logout();
  };

  return (
    <div className="header">
      <h1 className="ims">
        Brewventory ☕
        <p>Smooth inventory management</p>
      </h1>
      
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        {isAuth && <li><Link to="/dashboard">Dashboard</Link></li>}
        {isAuth && <li><Link to="/transaction">Transactions</Link></li>}
        {isAdmin && <li><Link to="/category">Categories</Link></li>}
        {isAdmin && <li><Link to="/product">Products</Link></li>}
        {isAdmin && <li><Link to="/supplier">Suppliers</Link></li>}
        {isAuth && <li><Link to="/purchase">Purchases</Link></li>}
        {isAuth && <li><Link to="/sell">Sales</Link></li>}
        {isAuth && <li><Link to="/profile">Profile</Link></li>}
        {isAuth && (
          <li>
            <Link onClick={logout} to="/login">Logout</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Header;
