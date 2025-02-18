import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Passwordset.css"; 
import { FaEye, FaEyeSlash } from "react-icons/fa";
import TwoFAImage from "./assets/two-fa-image.jpg"; // Adjust the path to your image

const PasswordSet = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate password
    if (newPassword.length < 8 || !/\d/.test(newPassword)) {
      setError("Password must be at least 8 characters long and include a number.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // If validation passes
    setError("");
    toast.success("Password reset successfully!");
    navigate("/password-reset-success");
  };

  return (
    <div className="password-set-container">
      <div className="form-container">
        <h1>Aktiv80</h1>
        <p>Enter your new password</p>
        <form onSubmit={handleSubmit}>
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
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
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
              <span
                className="eye-icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          {error && <div className="error-message">{error}</div>}
          <p>Password must include:</p>
          <ul>
            <li>Eight characters</li>
            <li>One number</li>
            <li>One special character</li>
          </ul>
          <button type="submit" className="reset-button">
            Reset Password
          </button>
        </form>
      </div>
      <div className="image-container">
        <img src={TwoFAImage} alt="Reset Password" />
      </div>
    </div>
  );
};

export default PasswordSet;