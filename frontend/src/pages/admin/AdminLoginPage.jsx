import { useState } from "react";
import { useAdmin, useToast } from "../../context/index.jsx";

export default function AdminLoginPage({ navigate }) {
  const { login } = useAdmin();
  const show = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.adminEmail.value.trim();
    const password = e.target.adminPassword.value;

    if (!email || !password) {
      show("Please enter your credentials", "error");
      return;
    }

    setLoading(true);

    try {
      const fakeToken = "mock-admin-token";
      login(fakeToken);
      show("Welcome back!", "success");
      navigate("admin-dashboard");
    } catch (err) {
      show("Invalid credentials", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="admin-logo">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <h1>
              Threadly<span className="admin-badge">ADMIN</span>
            </h1>
            <p className="tagline">Store Management Portal</p>
          </div>

          <div className="login-form-wrapper">
            <h2>Administrator Login</h2>
            <p className="login-subtitle">Please enter your credentials to manage Threadly</p>

            <form id="adminLoginForm" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>ADMIN EMAIL ADDRESS</label>
                <div className="input-wrapper">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <input type="email" name="adminEmail" placeholder="admin@threadly.shop" required />
                </div>
              </div>

              <div className="form-group">
                <div className="label-row">
                  <label>SECURITY KEY</label>
                  <a
                    href="#"
                    className="forgot-link"
                    onClick={(e) => {
                      e.preventDefault();
                      show("Password reset not available in demo", "info");
                    }}
                  >
                    Forgot key?
                  </a>
                </div>
                <div className="input-wrapper">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <input type="password" name="adminPassword" placeholder="••••••••" required />
                </div>
              </div>

              <div className="form-checkbox">
                <label>
                  <input type="checkbox" id="keepLogged" />
                  <span>Keep me logged in</span>
                </label>
              </div>

              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? "Authenticating..." : "Enter Admin Panel"}
                {!loading && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                )}
              </button>
            </form>

            <div className="ssl-indicator">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>SECURE SSL CONNECTION ACTIVE</span>
            </div>
          </div>

          <div className="login-footer">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("home");
              }}
            >
              ← Return to Storefront
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}