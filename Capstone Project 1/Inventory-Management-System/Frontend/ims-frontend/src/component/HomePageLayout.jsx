import React from "react";
import Header from "./HomeHeader"; 

const HomePageLayout = ({ children }) => {
    return (
        <div className="layout">
            <Header />
            <div className="main-content">
                {children}
            </div>
        </div>
    );
};

export default HomePageLayout;
