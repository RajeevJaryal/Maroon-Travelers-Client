import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListing } from "../../redux/fetchDataSlice";
import SkeletonCard from "../layout/SkeletonCard";

import ListingsHeader from "./ListingsHeader";
import ListingsFilters from "./ListingsFilters";
import ListingGrid from "./ListingGrid";

function getFullAddress(item) {
  const street = item?.address?.street || item?.street || "";
  const city = item?.address?.city || item?.city || "";
  const pin = item?.address?.pin || item?.pin || "";
  const line = [street, city].filter(Boolean).join(", ");
  return line + (pin ? ` - ${pin}` : "");
}

export default function ShowingListing() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((s) => s.listings);

  const [showFilters, setShowFilters] = useState(false);
  const [q, setQ] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [availability, setAvailability] = useState("all");
  const [sortBy, setSortBy] = useState("latest");

  useEffect(() => {
    dispatch(fetchListing());
  }, [dispatch]);

  const safeItems = useMemo(() => (Array.isArray(items) ? items : []), [items]);

  const filteredItems = useMemo(() => {
    let list = [...safeItems];
    const query = q.trim().toLowerCase();

    if (query) {
      list = list.filter((it) => {
        const name = String(it?.placeName || "").toLowerCase();
        const addr = getFullAddress(it).toLowerCase();
        return name.includes(query) || addr.includes(query);
      });
    }

    if (minPrice) list = list.filter((it) => Number(it.pricePerNight) >= Number(minPrice));
    if (maxPrice) list = list.filter((it) => Number(it.pricePerNight) <= Number(maxPrice));

    if (availability !== "all") {
      const want = availability === "available";
      list = list.filter((it) => it.isAvailable === want);
    }

    if (sortBy === "priceLow") list.sort((a, b) => Number(a.pricePerNight) - Number(b.pricePerNight));
    else if (sortBy === "priceHigh") list.sort((a, b) => Number(b.pricePerNight) - Number(a.pricePerNight));
    else if (sortBy === "name") list.sort((a, b) => String(a.placeName || "").localeCompare(String(b.placeName || "")));
    else list.sort((a, b) => Number(b.updatedAt || b.createdAt || 0) - Number(a.updatedAt || a.createdAt || 0));

    return list;
  }, [safeItems, q, minPrice, maxPrice, availability, sortBy]);

  const resetFilters = () => {
    setQ("");
    setMinPrice("");
    setMaxPrice("");
    setAvailability("all");
  };

  return (
    <div className="container py-4">
      <ListingsHeader
        total={safeItems.length}
        showing={filteredItems.length}
        sortBy={sortBy}
        setSortBy={setSortBy}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
      />

      {showFilters && (
        <ListingsFilters
          q={q} setQ={setQ}
          minPrice={minPrice} setMinPrice={setMinPrice}
          maxPrice={maxPrice} setMaxPrice={setMaxPrice}
          availability={availability} setAvailability={setAvailability}
          onReset={resetFilters}
        />
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      {loading && (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {!loading && <ListingGrid items={filteredItems} />}
    </div>
  );
}
