import React from "react";
import HomePageLayout from "../component/HomePageLayout";
import { useNavigate } from "react-router-dom";

// Import images correctly
import feature1 from "../images/feature1.jpg";
import feature2 from "../images/feature2.jpg";
import feature3 from "../images/feature3.jpg";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <HomePageLayout>
      <div className="home-container">
        
        {/* Hero Section */}
        <div className="hero">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h1 className="hero-title">Take Control of Your Pantry Like Never Before</h1>
            <p className="hero-subtitle">
             Keep Your Shelves Stocked and Your Business Running Smoothly with Intelligent Pantry Management
            </p>
            <button onClick={() => navigate("/login")} className="btn">
              Get Started
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="features">
          <h2 className="section-title">Savor the Smart Features</h2>
          <div className="feature-cards">
            {[
              {
                img: feature1,
                title: "Fresh Stock Alerts",
                desc: "Never run out of essential pantry items! Get real-time notifications when stock levels drop.",
              },
              {
                img: feature2,
                title: "Seamless Order Management ",
                desc: "Restock with confidence using predictive analytics.",
              },
              {
                img: feature3,
                title: "Smooth & Simple Interface",
                desc: "Manage inventory with ease using a clutter-free, user-friendly interface designed for efficiency.",
              }
              // ,
              // {
              //   img: feature4,
              //   title: "🔒 Secure & Barista-Friendly",
              //   desc: "Fast, reliable, and protected with modern security – because your café’s data should be as safe as your secret recipes.",
              // }
            ].map((feature, index) => (
              <div key={index} className="feature">
                <img src={feature.img} alt={feature.title} />
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </HomePageLayout>
  );
};

export default HomePage;
