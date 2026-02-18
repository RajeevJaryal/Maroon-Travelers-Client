import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchListing } from "../../redux/fetchDataSlice";


function formatINR(value) {
  const n = Number(value || 0);
  return `₹${n.toLocaleString("en-IN")}`;
}

function getFullAddress(item) {
  const street = (item?.address?.street || item?.street || "").trim();
  const city = (item?.address?.city || item?.city || "").trim();
  const pin = String(item?.address?.pin || item?.pin || "").trim();
  const line = [street, city].filter(Boolean).join(", ");
  return line + (pin ? ` - ${pin}` : "");
}

function daysBetween(from, to) {
  const start = new Date(from);
  const end = new Date(to);
  const ms = end - start;
  if (!Number.isFinite(ms)) return 0;
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

export default function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items, loading, error } = useSelector((s) => s.listings);
  const safeItems = useMemo(() => (Array.isArray(items) ? items : []), [items]);
  const hotel = useMemo(
    () => safeItems.find((x) => String(x.id) === String(id)),
    [safeItems, id]
  );

  // if user refresh details page
  useEffect(() => {
    if (!safeItems.length) dispatch(fetchListing());
  }, [dispatch, safeItems.length]);

  // Modal + Form state
  const [showModal, setShowModal] = useState(false);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [people, setPeople] = useState(1);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [formError, setFormError] = useState("");

  const openModal = () => {
    setFormError("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const onSubmitBooking = (e) => {
    e.preventDefault();
    setFormError("");

    if (!hotel) return;

    const nameOk = fullName.trim().length >= 2;
    const phoneOk = /^\d{10}$/.test(phone.trim()); // India 10-digit basic
    const peopleNum = Number(people);

    if (!nameOk) return setFormError("Please enter your name.");
    if (!phoneOk) return setFormError("Enter a valid 10-digit phone number.");
    if (!peopleNum || peopleNum < 1) return setFormError("People must be at least 1.");
    if (!fromDate) return setFormError("Please select From date.");
    if (!toDate) return setFormError("Please select To date.");

    const nights = daysBetween(fromDate, toDate);
    if (nights <= 0) return setFormError("To date must be after From date.");

    // ✅ For now: show booking summary (later we will save to DB using thunk)
    const total = nights * Number(hotel.pricePerNight || 0);

    alert(
      `Booking Requested ✅\n\nHotel: ${hotel.placeName}\nName: ${fullName}\nPhone: ${phone}\nPeople: ${peopleNum}\nFrom: ${fromDate}\nTo: ${toDate}\nNights: ${nights}\nTotal: ₹${total.toLocaleString(
        "en-IN"
      )}\n\nNext step: we will save this to Firebase & set status "pending".`
    );

    // Reset & close
    setFullName("");
    setPhone("");
    setPeople(1);
    setFromDate("");
    setToDate("");
    closeModal();
  };

  if (loading && !hotel) {
    return (
      <div className="container py-4">
        <div className="alert alert-info">Loading hotel details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger">{error}</div>
        <button className="btn btn-dark" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="container py-4">
        <div className="alert alert-warning">Hotel not found.</div>
        <button className="btn btn-dark" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    );
  }

  const address = getFullAddress(hotel);
  const images = Array.isArray(hotel.images) ? hotel.images : [];
  const nights = fromDate && toDate ? daysBetween(fromDate, toDate) : 0;
  const total = nights > 0 ? nights * Number(hotel.pricePerNight || 0) : 0;

  return (
    <div className="container py-4">
      <button className="btn btn-outline-dark mb-3" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="row g-4">
        {/* Images */}
        <div className="col-12 col-lg-7">
          <div className="card border-0 shadow-sm">
            {images?.[0] ? (
              <img
                src={images[0]}
                alt={hotel.placeName}
                className="card-img-top"
                style={{ height: 360, objectFit: "cover" }}
              />
            ) : (
              <div
                className="d-flex align-items-center justify-content-center bg-light text-muted"
                style={{ height: 360 }}
              >
                No image
              </div>
            )}

            {images.length > 1 && (
              <div className="card-body">
                <div className="d-flex gap-2 flex-wrap">
                  {images.slice(1, 6).map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      alt={`preview-${idx}`}
                      style={{
                        width: 92,
                        height: 72,
                        objectFit: "cover",
                        borderRadius: 10,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Details + Book */}
        <div className="col-12 col-lg-5">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start gap-2">
                <h3 className="fw-bold mb-0">{hotel.placeName}</h3>
                <span className={hotel.isAvailable ? "badge bg-success" : "badge bg-secondary"}>
                  {hotel.isAvailable ? "Available" : "Not Available"}
                </span>
              </div>

              <p className="text-muted mt-2 mb-2">{address || "Address not provided"}</p>

              <div className="fs-4 fw-bold mb-2">
                {formatINR(hotel.pricePerNight)}{" "}
                <span className="text-muted fs-6">/ night</span>
              </div>

              <div className="mb-3">
                <span className="badge text-bg-dark me-2">
                  Category: {hotel.categoryId || "N/A"}
                </span>
              </div>

              <h6 className="fw-bold">About</h6>
              <p className="text-muted mb-4">{hotel.description || "No description added."}</p>

              <button
                className="btn btn-dark w-100"
                onClick={openModal}
                disabled={!hotel.isAvailable}
              >
                {hotel.isAvailable ? "Book Now" : "Not Available"}
              </button>

              <small className="text-muted d-block mt-2">
                Booking will be saved as <b>pending</b> (admin will approve).
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ BOOTSTRAP MODAL (no extra CSS) */}
      {showModal && (
        <>
          {/* backdrop */}
          <div className="modal-backdrop fade show" onClick={closeModal} />

          <div
            className="modal fade show"
            style={{ display: "block" }}
            role="dialog"
            aria-modal="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <div>
                    <h5 className="modal-title mb-0">Book: {hotel.placeName}</h5>
                    <small className="text-muted">{formatINR(hotel.pricePerNight)} / night</small>
                  </div>

                  <button type="button" className="btn-close" onClick={closeModal} />
                </div>

                <form onSubmit={onSubmitBooking}>
                  <div className="modal-body">
                    {formError && <div className="alert alert-danger py-2">{formError}</div>}

                    <div className="mb-3">
                      <label className="form-label">Full Name *</label>
                      <input
                        className="form-control"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your name"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Phone Number *</label>
                      <input
                        className="form-control"
                        value={phone}
                        onChange={(e) =>
                          setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                        }
                        placeholder="10-digit number"
                        inputMode="numeric"
                        required
                      />
                      <small className="text-muted">Only 10 digits (India)</small>
                    </div>

                    <div className="row g-2">
                      <div className="col-12 col-md-4">
                        <label className="form-label">People *</label>
                        <input
                          type="number"
                          className="form-control"
                          value={people}
                          min={1}
                          onChange={(e) => setPeople(e.target.value)}
                          required
                        />
                      </div>

                      <div className="col-6 col-md-4">
                        <label className="form-label">From *</label>
                        <input
                          type="date"
                          className="form-control"
                          value={fromDate}
                          onChange={(e) => setFromDate(e.target.value)}
                          required
                        />
                      </div>

                      <div className="col-6 col-md-4">
                        <label className="form-label">To *</label>
                        <input
                          type="date"
                          className="form-control"
                          value={toDate}
                          onChange={(e) => setToDate(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="mt-3 p-3 bg-light rounded">
                      <div className="d-flex justify-content-between">
                        <span className="text-muted">Nights</span>
                        <b>{nights > 0 ? nights : "-"}</b>
                      </div>
                      <div className="d-flex justify-content-between mt-1">
                        <span className="text-muted">Total</span>
                        <b>{nights > 0 ? `₹${total.toLocaleString("en-IN")}` : "-"}</b>
                      </div>
                      <small className="text-muted d-block mt-2">
                        After submit, booking status will be <b>pending</b>.
                      </small>
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button type="button" className="btn btn-outline-secondary" onClick={closeModal}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-dark">
                      Submit Booking
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
