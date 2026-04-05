import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBooking, clearBookingStatus } from "../../redux/bookingsSlice";
import { formatINR, daysBetween } from "./bookingUtils";
import "./BookingModal.css";

export default function BookingModal({ show, onClose, hotel }) {
  const dispatch = useDispatch();
  const { idToken, uid, localId } = useSelector((s) => s.userAuth || {});
  const userId = uid || localId;

  const { creating } = useSelector((s) => s.bookings);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [people, setPeople] = useState(1);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [formError, setFormError] = useState("");

  // ✅ Lock background scroll
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);

  if (!show || !hotel) return null;

  const nights = fromDate && toDate ? daysBetween(fromDate, toDate) : 0;
  const total = nights > 0 ? nights * hotel.pricePerNight : 0;

  const onSubmitBooking = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!userId) return setFormError("Please login again.");
    if (nights <= 0) return setFormError("Please select valid dates.");

    const hotelImage =
      hotel.imageUrl ||
      hotel.image ||
      (Array.isArray(hotel.images) ? hotel.images[0] : "") ||
      "";

    const bookingData = {
      listingId: hotel.id,
      userId,
      name: fullName,
      phone,
      people,
      fromDate,
      toDate,
      nights,
      pricePerNight: hotel.pricePerNight,
      totalPrice: total,
      status: "pending",
      createdAt: Date.now(),
      listingSnapshot: {
        title: hotel.placeName || hotel.title || "Apartment",
        image: hotelImage,
        location: hotel.location || "",
        description: hotel.description || "",
      },
    };

    await dispatch(createBooking({ bookingData, idToken, userId }));
    dispatch(clearBookingStatus());
    onClose();
  };

  return (
    <div className="booking-modal">
      <div className="modal-backdrop-custom" onClick={onClose} />

      <div className="modal-container">
        <div className="modal-box">

          

          {/* ✅ IMPORTANT: form is flex */}
          <form className="modal-form" onSubmit={onSubmitBooking}>
            <div className="modal-header-custom">
            <h5>Book: {hotel?.placeName || hotel?.title}</h5>
            <button className="modal-close-btn" onClick={onClose}>✕</button>
          </div>
            <div className="modal-body-custom">
              {formError && <div className="error-box">{formError}</div>}

              <input className="input-field" placeholder="Full Name"
                value={fullName} onChange={(e) => setFullName(e.target.value)} required />

              <input className="input-field" placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                required />

              <input type="number" min="1" className="input-field"
                value={people} onChange={(e) => setPeople(Number(e.target.value))} required />

              <input type="date" className="input-field"
                value={fromDate} onChange={(e) => setFromDate(e.target.value)} required />

              <input type="date" className="input-field"
                value={toDate} onChange={(e) => setToDate(e.target.value)} required />

              <div className="booking-summary">
                Nights: <b>{nights || "-"}</b><br />
                Total: <b>{nights ? formatINR(total) : "-"}</b>
              </div>
            </div>

            <div className="modal-footer-custom">
              <button type="button" className="btn-cancel" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn-submit" disabled={creating}>
                {creating ? "Submitting..." : "Submit Booking"}
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
}