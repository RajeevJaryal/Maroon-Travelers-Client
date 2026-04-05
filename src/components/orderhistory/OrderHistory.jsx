import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings } from "../../redux/bookingsSlice";
import "./OrderHistory.css";

function formatINR(n) {
  const val = Number(n || 0);
  return `₹${val.toLocaleString("en-IN")}`;
}

export default function OrderHistory() {
  const dispatch = useDispatch();

  const { localId } = useSelector((s) => s.userAuth || {});
  const { items = [], loading, error } = useSelector((s) => s.bookings || {});

  useEffect(() => {
    if (localId) {
      dispatch(fetchBookings({ userId: localId }));
    }
  }, [dispatch, localId]);

  const sorted = useMemo(() => {
    return [...items].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  }, [items]);

  return (
    <div className="orders-container">
      {/* HEADER */}
      <div className="orders-header">
        <h3 className="orders-title">My Bookings</h3>
        <span className="orders-badge">{sorted.length} booked</span>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="orders-loading">
          <div className="spinner" />
          <p>Loading bookings...</p>
        </div>
      )}

      {/* ERROR */}
      {error && <div className="orders-error">{error}</div>}

      {/* EMPTY */}
      {!loading && sorted.length === 0 && (
        <div className="orders-empty">
          <h5>No bookings yet</h5>
          <p>Your booking history will appear here.</p>
        </div>
      )}

      {/* GRID */}
      <div className="orders-grid">
        {sorted.map((b) => {
          const snap = b.listingSnapshot || {};
          const imageUrl =
            snap.image ||
            "https://dummyimage.com/600x400/cccccc/000&text=No+Image";

          return (
            <div className="booking-card" key={b.id}>
              <div className="booking-image">
                <img src={imageUrl} alt={snap.title || "Booking"} />
              </div>

              <div className="booking-content">
                <div className="booking-top">
                  <h5>{snap.title || "Apartment"}</h5>

                  <span className={`status ${b.status}`}>
                    {b.status || "pending"}
                  </span>
                </div>

                <p className="booking-location">{snap.location}</p>

                <p className="booking-desc">
                  {(snap.description || "").slice(0, 80)}
                  {snap.description?.length > 80 ? "..." : ""}
                </p>

                <div className="booking-dates">
                  {b.fromDate || "N/A"} → {b.toDate || "N/A"} ({b.nights || "?"}{" "}
                  days)
                </div>

                <div className="booking-price">
                  <span>{formatINR(b.pricePerNight)} / night</span>
                  <strong>Total: {formatINR(b.totalPrice)}</strong>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
