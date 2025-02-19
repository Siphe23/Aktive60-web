import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import TwoFAImage from "../assets/pana.png";
import "../styles/passwordset.css";

const PasswordSet = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (newPassword.length < 8 || !/\d/.test(newPassword) || !/[!@#$%^&*]/.test(newPassword)) {
      setError("Password must be at least 8 characters long, include a number, and a special character.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    toast.success("Password reset successfully!");
    navigate("/password-reset-success");
  };

  return (
    <div className="password-set-container">
      <div className="form-container">
        <h2 className="logo">
          <img src={require("../assets/Aktiv60.png")} alt="Aktiv60 Logo" />
        </h2>
        <p>Enter your new password</p>
        <div className="form-group">
          <label>New Password</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        <div className="form-group">
          <label>Confirm New Password</label>
          <div className="password-input">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span className="eye-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        {error && <div className="error-message">{error}</div>}
        
        <button type="button" className="auth-button" onClick={handleSubmit}>
          Reset Password
        </button>
      </div>
      <div className="image-container">
        <img src={TwoFAImage} alt="Reset Password" />
      </div>
    </div>
  );
};

export default PasswordSet;