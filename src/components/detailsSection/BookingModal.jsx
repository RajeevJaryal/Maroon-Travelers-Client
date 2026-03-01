import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBooking, clearBookingStatus } from "../../redux/bookingsSlice";
import { formatINR, daysBetween } from "./bookingUtils";

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

  if (!show || !hotel) return null;

  const nights = fromDate && toDate ? daysBetween(fromDate, toDate) : 0;
  const total = nights > 0 ? nights * hotel.pricePerNight : 0;

  const onSubmitBooking = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!userId) return setFormError("Please login again.");
    if (nights <= 0) return setFormError("Please select valid dates.");

    // 🔥 SAFE IMAGE DETECTION
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

      // ✅ Proper snapshot
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
    <>
      <div className="modal-backdrop fade show" onClick={onClose} />
      <div className="modal fade show" style={{ display: "block" }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Book: {hotel.placeName || hotel.title}</h5>
              <button className="btn-close" onClick={onClose} />
            </div>

            <form onSubmit={onSubmitBooking}>
              <div className="modal-body">
                {formError && (
                  <div className="alert alert-danger">{formError}</div>
                )}

                <input
                  className="form-control mb-2"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />

                <input
                  className="form-control mb-2"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                  required
                />

                <input
                  type="number"
                  min="1"
                  className="form-control mb-2"
                  placeholder="Number of People"
                  value={people}
                  onChange={(e) => setPeople(Number(e.target.value))}
                  required
                />

                <input
                  type="date"
                  className="form-control mb-2"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  required
                />

                <input
                  type="date"
                  className="form-control mb-2"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  required
                />

                <div className="mt-3">
                  Nights: <b>{nights || "-"}</b> <br />
                  Total: <b>{nights ? formatINR(total) : "-"}</b>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-dark">
                  {creating ? "Submitting..." : "Submit Booking"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}