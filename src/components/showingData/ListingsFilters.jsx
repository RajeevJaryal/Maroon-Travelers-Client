import React from "react";

export default function ListingsFilters({
  q, setQ,
  minPrice, setMinPrice,
  maxPrice, setMaxPrice,
  availability, setAvailability,
  onReset,
}) {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Search</label>
            <input
              className="form-control"
              placeholder="Search place or address"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>

          <div className="col-md-2">
            <label className="form-label">Min Price</label>
            <input
              type="number"
              className="form-control"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>

          <div className="col-md-2">
            <label className="form-label">Max Price</label>
            <input
              type="number"
              className="form-control"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Availability</label>
            <select
              className="form-select"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
            >
              <option value="all">All</option>
              <option value="available">Available</option>
              <option value="not">Not Available</option>
            </select>
          </div>

          <div className="col-md-1 d-flex align-items-end">
            <button className="btn btn-outline-secondary w-100" onClick={onReset}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
