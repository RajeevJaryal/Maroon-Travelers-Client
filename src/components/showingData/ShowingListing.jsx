import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListing } from "../../redux/fetchDataSlice";
import { fetchCategories } from "../../redux/categoriesSlice";

import SkeletonCard from "../layout/SkeletonCard";
import ListingsHeader from "./ListingsHeader";
import ListingsFilters from "./ListingsFilters";
import ListingGrid from "./ListingGrid";
import { useLocation, useNavigate } from "react-router-dom";

function normalize(text = "") {
  return text.toString().toLowerCase().trim();
}

function getSearchableText(item) {
  const street = item?.address?.street || item?.street || "";
  const city = item?.address?.city || item?.city || "";
  const pin = item?.address?.pin || item?.pin || "";

  return normalize(`${item?.placeName || ""} ${street} ${city} ${pin}`);
}

export default function ShowingListing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Listings + categories from redux
  const {
    items: listings = [],
    loading,
    error,
  } = useSelector((s) => s.listings || {});
  const { items: categories = [] } = useSelector((s) => s.categories || {});

  // URL search
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = normalize(queryParams.get("search") || "");

  // Filters
  const [showFilters, setShowFilters] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [availability, setAvailability] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Pagination
  const [page, setPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    dispatch(fetchListing());
    dispatch(fetchCategories());
  }, [dispatch]);

  const safeItems = useMemo(
    () => (Array.isArray(listings) ? listings : []),
    [listings],
  );

  // Filter + search + sort logic
  const filteredItems = useMemo(() => {
    let list = [...safeItems];

    // Search
    if (searchQuery) {
      const keywords = searchQuery.split(" ").filter(Boolean);
      list = list.filter((item) =>
        keywords.every((word) => getSearchableText(item).includes(word)),
      );
    }

    // Category filter
    if (categoryId) {
      list = list.filter((item) => item.categoryId === categoryId);
    }

    // Price filter
    if (minPrice)
      list = list.filter(
        (item) => Number(item.pricePerNight) >= Number(minPrice),
      );
    if (maxPrice)
      list = list.filter(
        (item) => Number(item.pricePerNight) <= Number(maxPrice),
      );

    // Availability filter
    if (availability !== "all") {
      const want = availability === "available";
      list = list.filter((item) => item.isAvailable === want);
    }

    // Sort
    const sorted = [...list];
    if (sortBy === "priceLow")
      sorted.sort((a, b) => a.pricePerNight - b.pricePerNight);
    else if (sortBy === "priceHigh")
      sorted.sort((a, b) => b.pricePerNight - a.pricePerNight);
    else if (sortBy === "name")
      sorted.sort((a, b) =>
        (a.placeName || "").localeCompare(b.placeName || ""),
      );
    else
      sorted.sort(
        (a, b) =>
          (b.updatedAt || b.createdAt || 0) - (a.updatedAt || a.createdAt || 0),
      );

    return sorted;
  }, [
    safeItems,
    searchQuery,
    categoryId,
    minPrice,
    maxPrice,
    availability,
    sortBy,
  ]);

  // Paging
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));
  const pagedItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredItems.slice(start, start + pageSize);
  }, [filteredItems, page]);

  const handleResetFilters = () => {
    setCategoryId("");
    setMinPrice("");
    setMaxPrice("");
    setAvailability("all");
    setSortBy("newest");
  };

  const handleSearchChange = (value) => {
    if (!value) navigate("/listings");
    else navigate(`/listings?search=${encodeURIComponent(value)}`);
  };

  return (
    <div className="container py-4">
      {/* HEADER + FILTER BUTTON */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <ListingsHeader
          total={safeItems.length}
          showing={filteredItems.length}
          sortBy={sortBy}
          setSortBy={setSortBy}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          searchQuery={searchQuery}
          clearSearch={() => navigate("/listings")}
        />
      </div>

      {/* FILTER PANEL */}
      {showFilters && (
        <ListingsFilters
          q={searchQuery}
          setQ={handleSearchChange}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          categories={categories}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          availability={availability}
          setAvailability={setAvailability}
          sort={sortBy}
          setSort={setSortBy}
          totalResults={filteredItems.length}
          onReset={handleResetFilters}
        />
      )}

      {/* ERROR */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* LOADING */}
      {loading && (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* EMPTY */}
      {!loading && filteredItems.length === 0 && (
        <div className="text-center py-5">
          <h4>No results found</h4>
          <p className="text-muted">Try adjusting your filters.</p>
          <button
            className="btn btn-outline-dark mt-3"
            onClick={() => navigate("/listings")}
          >
            Clear Search
          </button>
        </div>
      )}

      {/* GRID */}
      {!loading && filteredItems.length > 0 && (
        <>
          <ListingGrid items={pagedItems} />

          {/* PAGINATION */}
          <div className="d-flex justify-content-center mt-4">
            <ul className="pagination">
              {/* Previous */}
              <li className={`page-item ${page <= 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Prev
                </button>
              </li>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => (
                <li
                  key={i}
                  className={`page-item ${page === i + 1 ? "active" : ""}`}
                >
                  <button className="page-link" onClick={() => setPage(i + 1)}>
                    {i + 1}
                  </button>
                </li>
              ))}

              {/* Next */}
              <li
                className={`page-item ${page >= totalPages ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next
                </button>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
