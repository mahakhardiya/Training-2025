import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <h2 className="footer-brand">PantryPilot</h2>
        <p className="footer-tagline">Smart Inventory, Simple Living.</p>
        <p className="footer-copy">
          &copy; {currentYear} PantryPilot. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
