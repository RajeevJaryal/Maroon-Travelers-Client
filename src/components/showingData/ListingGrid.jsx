import React from "react";
import ListingCard from "./ListingCard";
import "./ListingGrid.css";

export default function ListingGrid({ items }) {
  return (
    <div className="listing-grid">
      {items.map((item) => (
        <ListingCard key={item.id} item={item} />
      ))}
    </div>
  );
}