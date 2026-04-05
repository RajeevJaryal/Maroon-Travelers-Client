import React from "react";
import "./listingsFilters.css";

export default function ListingsFilters({
  q,
  setQ,
  categoryId,
  setCategoryId,
  categories = [],
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  availability,
  setAvailability,
  sort,
  setSort,
  totalResults,
  onReset,
}) {
  return (
    <div className="filters-card">
      <div className="filters-body">

        {/* Top Row */}
        <div className="filters-header">
          <h5>Filters</h5>
          <span className="filters-badge">
            {totalResults} Results
          </span>
        </div>

        <div className="row g-3">

          {/* Search */}
          <div className="col-md-4">
            <label className="filter-label">Search</label>
            <input
              className="filter-input"
              placeholder="Search place, city, pin..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>

          {/* Category */}
          <div className="col-md-3">
            <label className="filter-label">Category</label>
            <select
              className="filter-select"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Min Price */}
          <div className="col-md-2">
            <label className="filter-label">Min Price</label>
            <input
              type="number"
              className="filter-input"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="0"
            />
          </div>

          {/* Max Price */}
          <div className="col-md-2">
            <label className="filter-label">Max Price</label>
            <input
              type="number"
              className="filter-input"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="50000"
            />
          </div>

          {/* Availability */}
          <div className="col-md-3">
            <label className="filter-label">Availability</label>
            <select
              className="filter-select"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
            >
              <option value="all">All</option>
              <option value="available">Available</option>
              <option value="not">Not Available</option>
            </select>
          </div>

          {/* Sort */}
          <div className="col-md-3">
            <label className="filter-label">Sort By</label>
            <select
              className="filter-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="priceLow">Price: Low → High</option>
              <option value="priceHigh">Price: High → Low</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>

          {/* Reset */}
          <div className="col-md-2 d-flex align-items-end">
            <button className="filter-reset-btn w-100" onClick={onReset}>
              Reset
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}