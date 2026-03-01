import React from "react";
import { formatINR, getFullAddress } from "./bookingUtils";

export default function HotelInfo({ hotel, onBook }) {
  const address = getFullAddress(hotel);

  return (
    <div className="col-12 col-lg-5">
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start gap-2">
            <h3 className="fw-bold mb-0">{hotel.placeName}</h3>
            <span
              className={
                hotel.isAvailable
                  ? "badge bg-success"
                  : "badge bg-secondary"
              }
            >
              {hotel.isAvailable ? "Available" : "Not Available"}
            </span>
          </div>

          <p className="text-muted mt-2 mb-2">
            {address || "Address not provided"}
          </p>

          <div className="fs-4 fw-bold mb-2">
            {formatINR(hotel.pricePerNight)}
            <span className="text-muted fs-6"> / night</span>
          </div>

          <p className="text-muted mb-4">
            {hotel.description || "No description added."}
          </p>

          <button
            className="btn btn-dark w-100"
            onClick={onBook}
            disabled={!hotel.isAvailable}
          >
            {hotel.isAvailable ? "Book Now" : "Not Available"}
          </button>
        </div>
      </div>
    </div>
  );
}