import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  signupUser,
  clearUserAuthError,
} from "../../redux/userAuthSlice";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, idToken } = useSelector((s) => s.userAuth);

  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redirect after login
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
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row w-100" style={{ maxWidth: 1000 }}>
        
        {/* Left Side (Brand Section) */}
        <div className="col-lg-6 d-none d-lg-flex flex-column justify-content-center p-5 bg-dark text-white rounded-start">
          <h1 className="fw-bold">Maroon Travelers</h1>
          <p className="mt-3 text-white-50">
            Discover beautiful destinations, book your stay easily, and
            experience travel like never before.
          </p>
        </div>

        {/* Right Side (Auth Form) */}
        <div className="col-lg-6 col-12 bg-white p-5 rounded-end shadow">
          <h3 className="fw-bold mb-2">
            {mode === "signup" ? "Create Account" : "Welcome Back"}
          </h3>
          <p className="text-muted mb-4">
            {mode === "signup"
              ? "Sign up to start booking hotels."
              : "Login to continue your journey."}
          </p>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className="form-control form-control-lg"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
              />
              <small className="text-muted">
                Minimum 6 characters required
              </small>
            </div>

            <button
              className="btn btn-dark btn-lg w-100"
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : mode === "signup"
                ? "Create Account"
                : "Login"}
            </button>
          </form>

          <div className="text-center mt-4">
            <button
              className="btn btn-link text-decoration-none"
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
