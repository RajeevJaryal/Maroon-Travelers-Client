import React from "react";

export default function ListingsHeader({
  total,
  showing,
  sortBy,
  setSortBy,
  showFilters,
  setShowFilters,
}) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
      <div>
        <h3 className="fw-bold mb-0">Explore Listings</h3>
        <small className="text-muted">
          Showing {showing} of {total}
        </small>
      </div>

      <div className="d-flex gap-2">
        <select
          className="form-select"
          style={{ width: 200 }}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="latest">Latest</option>
          <option value="priceLow">Price: Low → High</option>
          <option value="priceHigh">Price: High → Low</option>
          <option value="name">Name: A → Z</option>
        </select>

        <button className="btn btn-dark" onClick={() => setShowFilters(!showFilters)}>
          {showFilters ? "Close" : "Filters"}
        </button>
      </div>
    </div>
  );
}
