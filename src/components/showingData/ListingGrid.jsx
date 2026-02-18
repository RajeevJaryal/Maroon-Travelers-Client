import React from "react";
import ListingCard from "./ListingCard";

export default function ListingGrid({ items }) {
  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {items.map((item) => (
        <ListingCard key={item.id} item={item} />
      ))}
    </div>
  );
}
