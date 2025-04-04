import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import ApiService from "../service/ApiService";
import { FaBell } from "react-icons/fa"; // ✅ Import Bell Icon

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const isAuth = ApiService.isAuthenticated();
  const isAdmin = ApiService.isAdmin();

  // ✅ Function to check for product alerts
  const checkProductAlerts = useCallback((products) => {
    const alerts = [];

    products.forEach((product) => {
      if (product.stockQuantity <= 5) {
        alerts.push({
          id: `low-stock-${product.id}`,
          message: `⚠️ Low Stock: ${product.name} has only ${product.stockQuantity} left!`,
        });
      }

      if (product.expiryDate && isExpiringSoon(product.expiryDate)) {
        alerts.push({
          id: `expiry-${product.id}`,
          message: `⏳ Expiring Soon: ${product.name} expires on ${formatDate(product.expiryDate)}`,
        });
      }
    });

    console.log("Generated Alerts:", alerts); // ✅ Debugging
    return alerts;
  }, []);

  // ✅ Function to fetch notifications
  const fetchNotifications = useCallback(async () => {
    try {
      const productData = await ApiService.getAllProducts();

      if (productData.status === 200) {
        const products = productData.products;
        console.log("Products from API:", products); // ✅ Debugging
        setNotifications(checkProductAlerts(products));
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  }, [checkProductAlerts]);

  // ✅ Function to check if a product is expiring soon (within 7 days)
  const isExpiringSoon = (expiryDate) => {
    if (!expiryDate) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today's date

    const expiry = new Date(expiryDate);
    expiry.setHours(0, 0, 0, 0); // Normalize expiry date

    const diffInDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    return diffInDays > 0 && diffInDays <= 7;
  };

  // ✅ Function to format expiry dates nicely
  const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toLocaleDateString() : "N/A";
  };

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]); // ✅ Added dependency to avoid stale data

  const logout = () => {
    ApiService.logout();
  };

  return (
    <div className="header">
      <h1 className="ims">PantryPilot</h1>

      <div className="header-right">
        {/* Notification Icon with Badge */}
        <div className="notification-container">
          <FaBell className="notification-icon" onClick={() => setShowDropdown(!showDropdown)} />
          {notifications.length > 0 && <span className="notification-badge">{notifications.length}</span>}

          {/* Notification Dropdown */}
          {showDropdown && (
            <div className="notification-dropdown">
              {notifications.length === 0 ? (
                <p>No notifications</p>
              ) : (
                notifications.map((alert) => (
                  <div key={alert.id} className="notification-item">
                    {alert.message}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          {isAuth && <li><Link to="/dashboard">Dashboard</Link></li>}
          {isAuth && <li><Link to="/transaction">Reports</Link></li>}
          {isAdmin && <li><Link to="/category">Categories</Link></li>}
          {isAdmin && <li><Link to="/product">Products</Link></li>}
          {isAdmin && <li><Link to="/supplier">Suppliers</Link></li>}
          {isAuth && <li><Link to="/purchase">Purchases</Link></li>}
          {isAuth && <li><Link to="/sell">Sales</Link></li>}
          {isAuth && <li><Link to="/profile">Profile</Link></li>}
          {isAuth && (
            <li>
              <Link onClick={logout} to="/login">
                Logout
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
