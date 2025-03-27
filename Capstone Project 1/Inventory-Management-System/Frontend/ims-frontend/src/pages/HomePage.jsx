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
            <h1 className="hero-title">Brew Efficiency, One Cup at a Time ☕</h1>
            <p className="hero-subtitle">
              Your café’s secret ingredient to effortless inventory management. 
              Keep your pantry stocked, your customers happy, and your business brewing!
            </p>
            <button onClick={() => navigate("/dashboard")} className="btn">
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
                desc: "Never run out of coffee beans, milk, or cookies! Get real-time stock updates.",
              },
              {
                img: feature2,
                title: "Daily Brew Insights",
                desc: "Track ingredient usage, sales trends, and pantry performance – because every espresso shot counts.",
              },
              {
                img: feature3,
                title: "Smooth & Simple Interface",
                desc: "Manage inventory with a sleek, café-inspired dashboard. No clutter, just easy controls.",
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
