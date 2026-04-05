import React, { useEffect, useState, useMemo, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import CartIcon from "./CartIcon";
import UserIcon from "./UserIcon";
import "./header.css";

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
  const [scrolled, setScrolled] = useState(false);

  const searchRef = useRef(null);

  // Sync URL search
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchTerm(params.get("search") || "");
  }, [location.search]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Outside click
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

  return (
    <motion.nav
      className={`header ${scrolled ? "scrolled" : ""}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* LOGO */}
      <Link to="/" className="logo">
        Maroon <span>Travelers</span>
      </Link>

      {/* NAV LINKS */}
      <div className="nav-links">
        {["Home", "Listings"].map((item) => {
          const path = item === "Home" ? "/" : "/listings";
          const active = location.pathname === path;

          return (
            <Link
              key={item}
              to={path}
              className={`nav-link ${active ? "active" : ""}`}
            >
              {item}
            </Link>
          );
        })}
      </div>

      {/* SEARCH */}
      <div className="search-wrapper" ref={searchRef}>
        <motion.form
          onSubmit={handleSearchSubmit}
          className={`search-box ${isFocused ? "expanded" : ""}`}
        >
          <span className="search-icon">⌕</span>

          <input
            type="search"
            placeholder="Search destinations..."
            value={searchTerm}
            onFocus={() => setIsFocused(true)}
            onChange={(e) => {
              const value = e.target.value;
              setSearchTerm(value);
              setShowDropdown(value.trim().length > 0);
            }}
            className="search-input"
          />
        </motion.form>

        <AnimatePresence>
          {showDropdown && suggestions.length > 0 && (
            <motion.div
              className="search-dropdown"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {suggestions.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="dropdown-item"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setSearchTerm(item.placeName);
                    setShowDropdown(false);
                  }}
                >
                  <div className="place">{item.placeName}</div>
                  <div className="price">
                    ₹{item.pricePerNight} / night
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ICONS */}
      <div className="nav-icons">
        <div className="icon-btn">
          <CartIcon />
        </div>
        <div className="icon-btn">
          <UserIcon />
        </div>
      </div>
    </motion.nav>
  );
}