import React from "react";

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
    <div className="card shadow-sm mb-4">
      <div className="card-body">

        {/* Top Row */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Filters</h5>
          <span className="badge text-bg-dark">
            {totalResults} Results
          </span>
        </div>

        <div className="row g-3">

          {/* Search */}
          <div className="col-md-4">
            <label className="form-label">Search</label>
            <input
              className="form-control"
              placeholder="Search place, city, pin..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>

          {/* Category */}
          <div className="col-md-3">
            <label className="form-label">Category</label>
            <select
              className="form-select"
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
            <label className="form-label">Min Price</label>
            <input
              type="number"
              className="form-control"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="0"
            />
          </div>

          {/* Max Price */}
          <div className="col-md-2">
            <label className="form-label">Max Price</label>
            <input
              type="number"
              className="form-control"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="50000"
            />
          </div>

          {/* Availability */}
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

          {/* Sort */}
          <div className="col-md-3">
            <label className="form-label">Sort By</label>
            <select
              className="form-select"
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
            <button className="btn btn-outline-secondary w-100" onClick={onReset}>
              Reset
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}