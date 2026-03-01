import React, { useEffect, useState, useMemo, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import CartIcon from "./CartIcon";
import UserIcon from "./UserIcon";
import "./navbar.css";

function normalize(text = "") {
  return text.toLowerCase().trim();
}

export default function HeaderSection() {
  const navigate = useNavigate();
  const location = useLocation();
  const { items } = useSelector((s) => s.listings);

  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const searchRef = useRef(null);

  // Sync search input with URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlSearch = params.get("search") || "";
    setSearchTerm(urlSearch);
  }, [location.search]);

  // Close search on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false);
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const suggestions = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const query = normalize(searchTerm);

    return (items || [])
      .filter((item) =>
        normalize(item.placeName || "").includes(query)
      )
      .slice(0, 6);
  }, [searchTerm, items]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    navigate(`/listings?search=${encodeURIComponent(searchTerm)}`);
    setShowDropdown(false);
    setIsFocused(false);
  };

  const handleSuggestionClick = (item) => {
    setSearchTerm(item.placeName);
    setShowDropdown(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
      <div className="container">

        {/* Brand */}
        <Link className="navbar-brand brand-logo" to="/">
          Maroon Travelers
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">

          {/* Nav Links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 nav-links">
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link ${
                  location.pathname === "/" ? "active-link" : ""
                }`}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/listings"
                className={`nav-link ${
                  location.pathname === "/listings" ? "active-link" : ""
                }`}
              >
                Listings
              </Link>
            </li>
          </ul>

          {/* ===== DESKTOP SEARCH ===== */}
          <form
            onSubmit={handleSearchSubmit}
            className={`search-form d-none d-lg-flex ${
              isFocused ? "expanded" : ""
            }`}
            ref={searchRef}
          >
            <input
              type="search"
              placeholder="Search destinations, hotels..."
              value={searchTerm}
              onFocus={() => setIsFocused(true)}
              onChange={(e) => {
                const value = e.target.value;
                setSearchTerm(value);
                setShowDropdown(value.trim().length > 0);
              }}
              className="search-input"
            />

            {showDropdown && suggestions.length > 0 && (
              <div className="search-dropdown">
                {suggestions.map((item) => (
                  <div
                    key={item.id}
                    className="dropdown-item"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleSuggestionClick(item);
                    }}
                  >
                    <strong>{item.placeName}</strong>
                    <div className="small text-muted">
                      ₹{item.pricePerNight} / night
                    </div>
                  </div>
                ))}
              </div>
            )}
          </form>

          {/* ===== MOBILE SEARCH ICON ===== */}
          <div className="d-lg-none mobile-search-wrapper position-relative">
            <button
              className="mobile-search-btn"
              onClick={() => setIsFocused((prev) => !prev)}
            >
              🔍
            </button>

            {isFocused && (
              <form
                onSubmit={handleSearchSubmit}
                className="mobile-search-form"
                ref={searchRef}
              >
                <input
                  type="search"
                  autoFocus
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSearchTerm(value);
                    setShowDropdown(value.trim().length > 0);
                  }}
                  className="mobile-search-input"
                />

                {showDropdown && suggestions.length > 0 && (
                  <div className="search-dropdown">
                    {suggestions.map((item) => (
                      <div
                        key={item.id}
                        className="dropdown-item"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleSuggestionClick(item);
                        }}
                      >
                        <strong>{item.placeName}</strong>
                        <div className="small text-muted">
                          ₹{item.pricePerNight} / night
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </form>
            )}
          </div>

          {/* Icons */}
          <div className="nav-icons ms-3">
            <CartIcon />
            <UserIcon />
          </div>

        </div>
      </div>
    </nav>
  );
}