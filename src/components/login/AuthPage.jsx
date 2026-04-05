import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  signupUser,
  clearUserAuthError,
} from "../../redux/userAuthSlice";
import { useNavigate } from "react-router-dom";
import "./AuthPage.css";
export default function AuthPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, idToken } = useSelector((s) => s.userAuth);

  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (idToken) navigate("/");
  }, [idToken, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearUserAuthError());

    const payload = { email, password };

    const res =
      mode === "signup"
        ? await dispatch(signupUser(payload))
        : await dispatch(loginUser(payload));

    if (
      signupUser.fulfilled?.match?.(res) ||
      loginUser.fulfilled?.match?.(res)
    ) {
      navigate("/");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">

        {/* LEFT SIDE */}
        <div className="auth-left">
          <h1 className="auth-brand">Maroon Travelers</h1>
          <p className="auth-description">
            Discover beautiful destinations, book your stay easily, and
            experience travel like never before.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="auth-right">
          <h3 className="auth-title">
            {mode === "signup" ? "Create Account" : "Welcome Back"}
          </h3>

          <p className="auth-subtitle">
            {mode === "signup"
              ? "Sign up to start booking hotels."
              : "Login to continue your journey."}
          </p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={onSubmit} className="auth-form">

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="input-field"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="input-field"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
              />
              <small className="input-hint">
                Minimum 6 characters required
              </small>
            </div>

            <button className="auth-btn" disabled={loading}>
              {loading
                ? "Please wait..."
                : mode === "signup"
                ? "Create Account"
                : "Login"}
            </button>

          </form>

          <div className="auth-switch">
            <button
              type="button"
              onClick={() => {
                dispatch(clearUserAuthError());
                setMode((m) => (m === "login" ? "signup" : "login"));
              }}
            >
              {mode === "login"
                ? "Don't have an account? Sign Up"
                : "Already have an account? Login"}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}