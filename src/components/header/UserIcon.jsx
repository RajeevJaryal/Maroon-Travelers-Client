import { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/userAuthSlice";
import { useNavigate } from "react-router-dom";
import "./UserIcon.css";

const UserIcon = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email, localId } = useSelector((s) => s.userAuth || {});

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
    navigate("/login");
  };

  return (
    <div className="user-icon-wrapper" ref={dropdownRef}>
      <FaUserCircle
        size={28}
        className="user-icon"
        onClick={() => setOpen(!open)}
      />

      {open && (
        <div className="user-dropdown">
          {localId ? (
            <>
              <p className="user-email">{email}</p>

              <p className="dropdown-item" onClick={() => navigate("/profile")}>
                Profile
              </p>

              <p className="dropdown-item" onClick={() => navigate("/orders")}>
                Orders
              </p>

              <p className="dropdown-item logout" onClick={handleLogout}>
                Logout
              </p>
            </>
          ) : (
            <p
              className="dropdown-item"
              onClick={() => navigate("/login")}
            >
              Login
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserIcon;