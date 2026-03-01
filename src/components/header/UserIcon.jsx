import { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/userAuthSlice";
import { useNavigate } from "react-router-dom";

const UserIcon = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email, localId } = useSelector((s) => s.userAuth || {});

  // ✅ close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    setOpen(false);
    navigate("/login"); // change if your login route is different
  };

  const goToOrders = () => {
    navigate("/orders"); // make sure this route exists
    setOpen(false);
  };

  const goToProfile = () => {
    navigate("/profile"); // optional
    setOpen(false);
  };

  return (
    <div style={{ position: "relative" }} ref={dropdownRef}>
      <FaUserCircle
        size={28}
        style={{ color: "white", cursor: "pointer" }}
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
            width: "170px",
            zIndex: 1000,
          }}
        >
          {localId ? (
            <>
              <p style={{ margin: "5px 0", fontSize: "13px", color: "#555" }}>
                {email}
              </p>

              <p
                style={{ margin: "8px 0", cursor: "pointer" }}
                onClick={goToProfile}
              >
                Profile
              </p>

              <p
                style={{ margin: "8px 0", cursor: "pointer" }}
                onClick={goToOrders}
              >
                Orders
              </p>

              <p
                style={{ margin: "8px 0", color: "red", cursor: "pointer" }}
                onClick={handleLogout}
              >
                Logout
              </p>
            </>
          ) : (
            <>
              <p
                style={{ margin: "8px 0", cursor: "pointer" }}
                onClick={() => navigate("/login")}
              >
                Login
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserIcon;