import React from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="col">
      <div
        className="card h-100 shadow-sm border-0"
        role="button"
        onClick={openDetails}
        style={{ cursor: "pointer" }}
      >
        {img && (
          <img
            src={img}
            alt={item.placeName}
            className="card-img-top"
            style={{ height: 220, objectFit: "cover" }}
          />
        )}

        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5 className="fw-bold mb-0">{item.placeName}</h5>
            <span className={item.isAvailable ? "badge bg-success" : "badge bg-secondary"}>
              {item.isAvailable ? "Available" : "Not Available"}
            </span>
          </div>

          <small className="text-muted mb-2">
            {fullAddress || "Address not provided"}
          </small>

          <p className="fw-semibold mb-2">{formatINR(item.pricePerNight)} / night</p>

          <p className="text-muted small flex-grow-1">
            {item.description
              ? item.description.slice(0, 100) + (item.description.length > 100 ? "..." : "")
              : "No description available"}
          </p>

          {/* Important: stop click bubbling so card click doesn't also fire */}
          <button
            className="btn btn-outline-dark mt-auto"
            onClick={(e) => {
              e.stopPropagation();
              openDetails();
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
