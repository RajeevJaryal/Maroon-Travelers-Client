import React from "react";
import "./HotelGallery.css";
export default function HotelGallery({ images = [], title }) {
  return (
    <div className="col-12 col-lg-7 hotel-gallery">
      <div className="gallery-card">

        {/* MAIN IMAGE */}
        {images?.[0] ? (
          <img
            src={images[0]}
            alt={title}
            className="gallery-main-img"
          />
        ) : (
          <div className="gallery-no-img">
            No image
          </div>
        )}

        {/* THUMBNAILS */}
        {images.length > 1 && (
          <div className="gallery-body">
            <div className="gallery-thumbs">
              {images.slice(1, 6).map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`preview-${idx}`}
                  className="gallery-thumb"
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}