// src/pages/OrderHistory.jsx
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings } from "../../redux/bookingsSlice";

function formatINR(n) {
  const val = Number(n || 0);
  return `₹${val.toLocaleString("en-IN")}`;
}

export default function OrderHistory() {
  const dispatch = useDispatch();

  const user = useSelector((s) => s.auth.user); // adjust to your auth slice
  const { items, loading, error } = useSelector((s) => s.bookings);

  useEffect(() => {
    if (user?.uid) dispatch(fetchBookings({uderId:user.uid}));
  }, [dispatch, user?.uid]);

  const totalBooked = items.length;

  const sorted = useMemo(() => {
    return [...items].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  }, [items]);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="text-white m-0">My Bookings</h3>
        <span className="badge bg-danger">{totalBooked} booked</span>
      </div>

      {loading && <p className="text-secondary">Loading bookings...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && sorted.length === 0 && (
        <div className="p-4 rounded bg-dark text-white">
          No bookings yet.
        </div>
      )}

      <div className="row g-3">
        {sorted.map((b) => {
          const snap = b.listingSnapshot || {};
          return (
            <div className="col-md-6" key={b.id}>
              <div className="card bg-black text-white h-100 border border-secondary">
                <div className="row g-0">
                  <div className="col-4">
                    <img
                      src={snap.image || "https://via.placeholder.com/300x300?text=No+Image"}
                      alt={snap.title || "Booking"}
                      className="img-fluid h-100"
                      style={{ objectFit: "cover" }}
                    />
                  </div>

                  <div className="col-8">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start">
                        <h5 className="card-title mb-1">
                          {snap.title || "Apartment"}
                        </h5>
                        <span
                          className={`badge ${
                            b.status === "completed"
                              ? "bg-success"
                              : b.status === "approved"
                              ? "bg-primary"
                              : "bg-warning text-dark"
                          }`}
                        >
                          {b.status || "pending"}
                        </span>
                      </div>

                      <p className="text-secondary small mb-2">
                        {snap.location || ""}
                      </p>

                      <p className="card-text small text-secondary mb-2">
                        {(snap.description || "").slice(0, 80)}
                        {snap.description?.length > 80 ? "..." : ""}
                      </p>

                      <div className="d-flex justify-content-between small">
                        <span>
                          {b.checkIn} → {b.checkOut} ({b.days || "?"} days)
                        </span>
                      </div>

                      <div className="mt-2 d-flex justify-content-between align-items-center">
                        <div>
                          <div className="small text-secondary">
                            {formatINR(b.pricePerNight)} / night
                          </div>
                          <div className="fw-bold">
                            Total: {formatINR(b.totalPrice)}
                          </div>
                        </div>
                        {/* optional: details button */}
                        {/* <button className="btn btn-outline-light btn-sm">View</button> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}