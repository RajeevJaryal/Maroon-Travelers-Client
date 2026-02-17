import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const UserIcon = () => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <FaUserCircle
        size={28}
        style={{ color:"white",cursor: "pointer" }}
        onClick={() => setOpen(!open)}
      />

      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "40px",
            background: "#fff",
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
            padding: "10px",
            borderRadius: "8px",
            width: "150px",
          }}
        >
          <p style={{ margin: "5px 0" }}>Profile</p>
          <p style={{ margin: "5px 0" }}>Orders</p>
          <p style={{ margin: "5px 0", color: "red" }}>Logout</p>
        </div>
      )}
    </div>
  );
};

export default UserIcon;
