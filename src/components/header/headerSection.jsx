import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logoutUser } from "../../redux/userAuthSlice";

import CartIcon from "./CartIcon";
import UserIcon from "./UserIcon";

const HeaderSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { idToken, email } = useSelector((s) => s.userAuth || {});

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/", { replace: true });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // ✅ prevent reload
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 py-3 shadow">
      <div className="container-fluid">

        {/* Brand */}
        <Link
          className="navbar-brand fw-bold"
          to="/"
          style={{ color: "#ffffff" }}
        >
          Maroon Travelers
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navBarContent"
          aria-controls="navBarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Content */}
        <div className="collapse navbar-collapse" id="navBarContent">

          {/* Search */}
          <form
            onSubmit={handleSearchSubmit}
            className="d-flex mx-lg-auto my-3 my-lg-0"
            style={{ width: "100%", maxWidth: 520 }}
          >
            <input
              className="form-control rounded-pill px-4"
              type="search"
              placeholder="Search destinations, hotels..."
            />
          </form>

          {/* Right Side */}
          <div className="d-flex align-items-center gap-3 ms-lg-3">

            <CartIcon />
            <UserIcon />

            {/* Not Logged In */}
            {!idToken && (
              <button
                className="btn btn-outline-light"
                onClick={() => navigate("/auth")}
              >
                Login
              </button>
            )}

            {/* Logged In */}
            {idToken && (
              <div className="d-flex align-items-center gap-2">

                {/* My Bookings Link */}
                <Link
                  to="/my-bookings"
                  className="btn btn-sm btn-outline-light"
                >
                  My Bookings
                </Link>

                <span className="text-white small d-none d-lg-inline">
                  {email}
                </span>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={handleLogout}
                >
                  Logout
                </button>

              </div>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
};

export default HeaderSection;