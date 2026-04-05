import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchListing } from "../../redux/fetchDataSlice";

import HotelGallery from "./HotelGallery";
import HotelInfo from "./HotelInfo";
import BookingModal from "./BookingModal";
import "./HotelDetails.css";
export default function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items, loading, error } = useSelector((s) => s.listings);

  const hotel = useMemo(
    () => items?.find((x) => String(x.id) === String(id)),
    [items, id],
  );

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!items?.length) dispatch(fetchListing());
  }, [dispatch, items?.length]);

  if (loading && !hotel) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!hotel) return <div>Hotel not found</div>;

  return (
    <div className="container hotel-details-page py-4">
      <button
        className="btn btn-outline-dark mb-3"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="row g-4">
        <HotelGallery images={hotel.images} title={hotel.placeName} />
        <HotelInfo hotel={hotel} onBook={() => setShowModal(true)} />
      </div>

      <BookingModal
        show={showModal}
        onClose={() => setShowModal(false)}
        hotel={hotel}
      />
    </div>
  );
}
