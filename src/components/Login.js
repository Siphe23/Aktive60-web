import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TwoFAImage from "../assets/amico-removebg-preview.png";
import "../styles/styles.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google && document.getElementById("google-login")) {
        window.google.accounts.id.initialize({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          callback: handleGoogleSignIn,
        });
        window.google.accounts.id.renderButton(
          document.getElementById("google-login"),
          { theme: "outline", size: "large" }
        );
      }
    };

    return () => document.body.removeChild(script);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }
    toast.success("Login Successful!");
  };

  const handleGoogleSignIn = (response) => {
    console.log("Google Sign-in Response:", response);
    toast.success("Logged in with Google!");
  };

  return (
    <div className="auth-container">
      <div className="login-section">
        <h2 className="logo">Aktiv60</h2>
        <p className="subtitle">System v2.1.0 (Production)</p>
        <h3>Sign into your account</h3>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">
              <i className="fas fa-envelope"></i> Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">
              <i className="fas fa-lock"></i> Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i
              className="fas fa-eye"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Toggle password visibility"
              role="button"
            ></i>
          </div>

          {/* Remember me button */}
          <div className="auth-options">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember Me
            </label>
          </div>

          {/* Login button */}
          <button className="auth-button" type="submit">
            Login
          </button>
        </form>

        <div>
          <Link to="#">Forgot Password?</Link>
        </div>

        <p className="or-text">
          <hr className="line" />
          Or
          <hr className="line" />
        </p>
        <div id="google-login"></div>

        <p className="switch-auth">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>

      {/* Right Side: Image */}
      <div className="image-container">
        <img src={TwoFAImage} alt="Two Factor Authentication" />
      </div>
    </div>
  );
};

export default Login;
