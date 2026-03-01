import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>

      {/* HERO SECTION */}
      <section
        className="text-white text-center d-flex align-items-center justify-content-center"
        style={{
          height: "85vh",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div style={{ background: "rgba(0,0,0,0.6)", padding: "40px", borderRadius: "10px" }}>
          <h1 className="display-4 fw-bold">Explore Beautiful Destinations</h1>
          <p className="lead mt-3">
            Discover amazing hotels and unforgettable experiences.
          </p>

          <button
            className="btn btn-warning btn-lg mt-4 px-4"
            onClick={() => navigate("/listings")}
          >
            Explore Now
          </button>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="container py-5">
        <h2 className="text-center mb-4">Why Choose Maroon Travelers?</h2>

        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <h5>🌍 Best Locations</h5>
            <p>Handpicked destinations from around the world.</p>
          </div>

          <div className="col-md-4 mb-4">
            <h5>💰 Affordable Prices</h5>
            <p>Best deals guaranteed with transparent pricing.</p>
          </div>

          <div className="col-md-4 mb-4">
            <h5>⭐ Trusted Reviews</h5>
            <p>Thousands of happy travelers trust our service.</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;