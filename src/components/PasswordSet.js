import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../assets/Aktiv60.png";
import TwoFAImage from "../assets/pana.png";
import BackIcon from "../assets/Group (1).png";
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
  const handleBack = () => {
    navigate(-1);
  };


  return (
    <div className="password-reset-container">
      <div className="back-button" onClick={handleBack}>
        <img src={BackIcon} alt="Back" />
      </div>
      <div className="password-reset-card">
      <div className="recovery-logo">
            <img src={logo} alt="Aktiv60 Logo" />
          </div>
        <p>Enter your new password</p>
        
        <label>New Password</label>
        <div className="password-input">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <label>Confirm New Password</label>
        <div className="password-input">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {error && <p className="error-text">{error}</p>}

        <button className="reset-button" onClick={handleSubmit}>Reset Password</button>
      </div>

      <div className="illustration">
        <img src={TwoFAImage} alt="Reset Password Illustration" />
      </div>
    </div>
  );
};

export default PasswordSet;
