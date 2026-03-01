import React from "react";

export default function HotelGallery({ images = [], title }) {
  return (
    <div className="col-12 col-lg-7">
      <div className="card border-0 shadow-sm">
        {images?.[0] ? (
          <img
            src={images[0]}
            alt={title}
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
  );
}