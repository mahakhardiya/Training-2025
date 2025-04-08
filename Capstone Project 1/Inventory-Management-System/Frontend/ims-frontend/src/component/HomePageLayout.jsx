import React from "react";
import Header from "./HomeHeader";
import Footer from "./Footer";

const HomePageLayout = ({ children }) => {
    return (
        <div className="layout">
            <Header />
            <div className="main-content">
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default HomePageLayout;
