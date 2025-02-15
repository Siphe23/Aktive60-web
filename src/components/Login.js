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
      <div className="auth-form">
        {/* Header Section */}
        <h2 className="logo">Aktiv60</h2>
        <h2>Welcome Back!</h2>

        {/* Login Form */}
        <div className="input-group">
          <input
            type="email"
            placeholder="Email or Phone Number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group password-group">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "🙈" : "👁"}
          </span>
        </div>

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

        <button className="auth-button" onClick={handleLogin}>Login</button>

        {/* Social Media Login Options */}
        <p className="or-text">Or log in with</p>
        <div className="social-buttons">
          <button className="google-button">Google</button>
          <button className="facebook-button">Facebook</button>
          <button className="apple-button">Apple</button>
        </div>

        {/* Support Elements */}
        <p className="switch-auth">
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
        <p className="help-links">
          <Link to="#">Help Center</Link> | <Link to="#">Contact Support</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;