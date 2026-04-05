import React from "react";
import { useNavigate } from "react-router-dom";
import "./ListingCard.css";

function formatINR(value) {
  const n = Number(value || 0);
  return `₹${n.toLocaleString("en-IN")}`;
}

function getFirstImage(listing) {
  const img = listing?.images?.[0];
  return img && String(img).trim().length > 0 ? img : null;
}

function getFullAddress(item) {
  const street = item?.address?.street || item?.street || "";
  const city = item?.address?.city || item?.city || "";
  const pin = item?.address?.pin || item?.pin || "";
  const line = [street, city].filter(Boolean).join(", ");
  return line + (pin ? ` - ${pin}` : "");
}

export default function ListingCard({ item }) {
  const navigate = useNavigate();
  const img = getFirstImage(item);
  const fullAddress = getFullAddress(item);

  const openDetails = () => navigate(`/hotels/${item.id}`);

  return (
    <div className="listing-col">
      <div className="listing-card" onClick={openDetails}>

        {img && (
          <div className="listing-image">
            <img src={img} loading="lazy" alt={item.placeName} />
          </div>
        )}

        <div className="listing-content">

          <div className="listing-top">
            <h5>{item.placeName}</h5>

            <span className={`status-badge ${item.isAvailable ? "available" : "unavailable"}`}>
              {item.isAvailable ? "Available" : "Not Available"}
            </span>
          </div>

          <p className="listing-address">
            {fullAddress || "Address not provided"}
          </p>

          <p className="listing-price">
            {formatINR(item.pricePerNight)} <span>/ night</span>
          </p>

          <p className="listing-desc">
            {item.description
              ? item.description.slice(0, 100) + (item.description.length > 100 ? "..." : "")
              : "No description available"}
          </p>

          <button
            className="listing-btn"
            onClick={(e) => {
              e.stopPropagation();
              openDetails();
            }}
          >
            View Details →
          </button>

        </div>
      </div>
    </div>
  );
}