import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/styles.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }
    toast.success("Login Successful!");
  };

  return (
    <div className="auth-container">
      {/* Logo and Header */}
      <h2 className="logo">Aktiv60</h2>
      <p className="subtitle">System v2.1.0 (Production)</p>

      {/* Illustration */}
      <img src="/login-image.png" alt="Login Illustration" className="illustration" />

      <h3>Sign into your account</h3>

      {/* Email Field */}
      <div className="input-group">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <i className="fas fa-envelope"></i>
      </div>

      {/* Password Field */}
      <div className="input-group">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <i className="fas fa-eye" onClick={() => setShowPassword(!showPassword)}></i>
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="auth-options">
        <label>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          Remember Me
        </label>
        <Link to="#">Forgot Password?</Link>
      </div>

      {/* Login Button */}
      <button className="auth-button" onClick={handleLogin}>Login</button>

      {/* OR Divider */}
      <p className="or-text">Or</p>

      {/* Social Login */}
      <div className="social-buttons">
        <button className="google-button">
          <img src="/google-logo.png" alt="Google" width="20" /> Continue with Google
        </button>
      </div>

      {/* Signup Link */}
      <p className="switch-auth">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
