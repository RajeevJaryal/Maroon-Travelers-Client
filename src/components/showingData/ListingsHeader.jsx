import React from "react";
import "./listingsHeader.css";

export default function ListingsHeader({
  total,
  showing,
  sortBy,
  setSortBy,
  showFilters,
  setShowFilters,
}) {
  return (
    <div className="listings-header">

      {/* LEFT */}
      <div className="listings-header-left">
        <h3 className="listings-title">Explore Listings</h3>
        <span className="listings-subtitle">
          Showing {showing} of {total}
        </span>
      </div>

      {/* RIGHT */}
      <div className="listings-header-right">

        <select
          className="listings-sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="latest">Latest</option>
          <option value="priceLow">Price: Low → High</option>
          <option value="priceHigh">Price: High → Low</option>
          <option value="name">Name: A → Z</option>
        </select>

        <button
          className="listings-filter-btn"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? "Close" : "Filters"}
        </button>

      </div>
    </div>
  );
}