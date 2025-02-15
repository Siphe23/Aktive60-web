import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/styles.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = () => {
    if (!email || !phone || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if (!termsAccepted || !privacyAccepted) {
      toast.error("You must accept the terms & conditions and privacy policy!");
      return;
    }
    toast.success("Registration Successful!");
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        {/* Header Section */}
        <h2 className="logo">Aktiv60</h2>
        <h2>Welcome!</h2>
        <p className="app-description">Join our community to get started.</p>

        {/* Registration Form */}
        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="input-group password-box">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>👁</span>
        </div>

        <div className="input-group password-box">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>👁</span>
        </div>

        <label className="terms">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={() => setTermsAccepted(!termsAccepted)}
          />
          Accept Terms & Conditions
        </label>

        <label className="terms">
          <input
            type="checkbox"
            checked={privacyAccepted}
            onChange={() => setPrivacyAccepted(!privacyAccepted)}
          />
          Accept Privacy Policy
        </label>

        <button className="auth-button" onClick={handleRegister}>Register</button>

        {/* Social Media Registration Options */}
        <p className="or-text">Or sign up with</p>
        <div className="social-buttons">
          <button className="google-button">Google</button>
          <button className="facebook-button">Facebook</button>
          <button className="apple-button">Apple</button>
        </div>

        {/* Navigation Elements */}
        <p className="switch-auth">
          Already have an account? <Link to="/login">Login</Link>
        </p>
        <p className="help-links">
          <Link to="#">Help</Link> | <Link to="#">Contact Support</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;