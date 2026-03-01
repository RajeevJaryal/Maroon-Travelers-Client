import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings } from "../../redux/bookingsSlice";

function formatINR(n) {
  const val = Number(n || 0);
  return `₹${val.toLocaleString("en-IN")}`;
}

export default function OrderHistory() {
  const dispatch = useDispatch();

  const { localId } = useSelector((s) => s.userAuth || {});
  const { items = [], loading, error } = useSelector(
    (s) => s.bookings || {}
  );

  useEffect(() => {
    if (localId) {
      dispatch(fetchBookings({ userId: localId }));
    }
  }, [dispatch, localId]);

  const sorted = useMemo(() => {
    return [...items].sort(
      (a, b) => (b.createdAt || 0) - (a.createdAt || 0)
    );
  }, [items]);

  return (
    <div className="container py-5">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-semibold text-dark mb-0">My Bookings</h3>
        <span className="badge bg-danger fs-6 px-3 py-2">
          {sorted.length} booked
        </span>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-dark" />
          <p className="mt-3 text-muted">Loading bookings...</p>
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && sorted.length === 0 && (
        <div className="card text-center py-5 shadow-sm">
          <div className="card-body">
            <h5>No bookings yet</h5>
            <p className="text-muted">
              Your booking history will appear here.
            </p>
          </div>
        </div>
      )}

      {/* BOOKINGS GRID */}
      <div className="row g-4">
        {sorted.map((b) => {
          const snap = b.listingSnapshot || {};

          const imageUrl =
            snap.image ||
            "https://dummyimage.com/600x400/cccccc/000&text=No+Image";

          return (
            <div className="col-lg-6 col-md-12" key={b.id}>
              <div className="card shadow-sm border-0 h-100 booking-card">

                <div className="row g-0 h-100">

                  {/* IMAGE */}
                  <div className="col-4">
                    <img
                      src={imageUrl}
                      alt={snap.title || "Booking"}
                      className="img-fluid rounded-start h-100"
                      style={{ objectFit: "cover" }}
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="col-8">
                    <div className="card-body d-flex flex-column h-100">

                      {/* TITLE + STATUS */}
                      <div className="d-flex justify-content-between align-items-start">
                        <h5 className="card-title mb-1 fw-semibold">
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

                      {/* LOCATION */}
                      <p className="text-muted small mb-2">
                        {snap.location}
                      </p>

                      {/* DESCRIPTION */}
                      <p className="card-text small text-secondary mb-3">
                        {(snap.description || "").slice(0, 80)}
                        {snap.description?.length > 80 ? "..." : ""}
                      </p>

                      {/* DATES */}
                      <div className="small text-dark mb-2">
                        {b.fromDate || "N/A"} → {b.toDate || "N/A"} (
                        {b.nights || "?"} days)
                      </div>

                      {/* PRICE */}
                      <div className="mt-auto">
                        <div className="small text-muted">
                          {formatINR(b.pricePerNight)} / night
                        </div>
                        <div className="fw-bold fs-6">
                          Total: {formatINR(b.totalPrice)}
                        </div>
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