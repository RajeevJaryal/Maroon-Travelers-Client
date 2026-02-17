import React from "react";
import CartIcon from "./CartIcon";
import UserIcon from "./UserIcon";

const HeaderSection = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 py-3 shadow">
      <div className="container-fluid">
        {/* Brand */}
        <a className="navbar-brand fw-bold" href="/" style={{ color: "#ffffff" }}>
          Maroon Travelers
        </a>

        {/* Toggler (mobile) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navBarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Content */}
        <div className="collapse navbar-collapse" id="navBarContent">
          {/* Search (center) */}
          <form className="d-flex mx-lg-auto my-3 my-lg-0" style={{ width: "100%", maxWidth: 520 }}>
            <input
              className="form-control rounded-pill px-4"
              type="search"
              placeholder="Search destinations, hotels, packages..."
            />
          </form>

          {/* Icons (right) */}
          <div className="d-flex align-items-center gap-4 ms-lg-3">
            <CartIcon />
            <UserIcon />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HeaderSection;
