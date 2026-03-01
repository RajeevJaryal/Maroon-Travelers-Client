import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CartIcon = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{ cursor: "pointer", position: "relative" }}
      onClick={() => navigate("/my-bookings")}
    >
      <FaShoppingCart size={24} color="white" />
    </div>
  );
};

export default CartIcon;