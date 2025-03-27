import React from "react";
import Header from "./Header"; // Renamed Sidebar to be used as the Header

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <Header />
            <div className="main-content">
                {children}
            </div>
        </div>
    );
};

export default Layout;
