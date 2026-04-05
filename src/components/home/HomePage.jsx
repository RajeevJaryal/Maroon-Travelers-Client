import React from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";
const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">

      {/* HERO SECTION */}
      <section
        className="hero-section"
        style={{
          height: "85vh",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="hero-overlay">
          <h1 className="hero-title">Explore Beautiful Destinations</h1>
          <p className="hero-subtitle">
            Discover amazing hotels and unforgettable experiences.
          </p>

          <button
            className="hero-btn"
            onClick={() => navigate("/listings")}
          >
            Explore Now
          </button>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features-section">
        <h2 className="features-title">Why Choose Maroon Travelers?</h2>

        <div className="features-grid">
          <div className="feature-card">
            <h5 className="feature-heading">🌍 Best Locations</h5>
            <p className="feature-text">
              Handpicked destinations from around the world.
            </p>
          </div>

          <div className="feature-card">
            <h5 className="feature-heading">💰 Affordable Prices</h5>
            <p className="feature-text">
              Best deals guaranteed with transparent pricing.
            </p>
          </div>

          <div className="feature-card">
            <h5 className="feature-heading">⭐ Trusted Reviews</h5>
            <p className="feature-text">
              Thousands of happy travelers trust our service.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;