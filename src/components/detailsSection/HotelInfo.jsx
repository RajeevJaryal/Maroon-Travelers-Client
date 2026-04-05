import React from "react";
import { formatINR, getFullAddress } from "./bookingUtils";
import "./HotelInfo.css";

export default function HotelInfo({ hotel, onBook }) {
  const address = getFullAddress(hotel);

  return (
    <div className="col-12 col-lg-5">
  <div className="hotel-info-card">
    <div className="hotel-info-body">

      <div className="hotel-info-header">
        <h3 className="hotel-title">{hotel.placeName}</h3>

        <span
          className={
            hotel.isAvailable
              ? "hotel-badge available"
              : "hotel-badge not-available"
          }
        >
          {hotel.isAvailable ? "Available" : "Not Available"}
        </span>
      </div>

      <p className="hotel-address">
        {address || "Address not provided"}
      </p>

      <div className="hotel-price">
        {formatINR(hotel.pricePerNight)}
        <span> / night</span>
      </div>

      <p className="hotel-description">
        {hotel.description || "No description added."}
      </p>

      <button
        className="hotel-book-btn"
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