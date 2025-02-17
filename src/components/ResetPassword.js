import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/resetPassword.css"; 
import TwoFAImage from "../assets/bro.jpg";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");  // For displaying error messages
  const [isPasswordFocused, setIsPasswordFocused] = useState(false); // Track if password input is focused
  const navigate = useNavigate(); // For navigating to different routes

  const isPasswordValid = (password) => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /\d/.test(password) &&
      /[!@#$%^&*]/.test(password)
    );
  };

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (!isPasswordValid(newPassword)) {
      setError("Password must be at least 8 characters long, contain an uppercase letter, a number, and a special character.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError("");  // Reset the error if everything is valid
    navigate("/password-reset-success");  // Navigate to the success route
  };

  return (
    <div className="reset-container">
      <div className="reset-box">
        <h2 className="reset-logo">Aktiv60</h2>
        <p className="reset-subtitle">Enter your new password</p>

        <form onSubmit={handleResetPassword}>
          <div className="reset-input-group">
            <input 
              type="password" 
              placeholder="New Password" 
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)} 
              onFocus={() => setIsPasswordFocused(true)} 
              required
            />
            {isPasswordFocused && (
              <ul className="password-requirements">
                <li className={newPassword.length >= 8 ? "valid" : "invalid"}>8+ characters</li>
                <li className={/[A-Z]/.test(newPassword) ? "valid" : "invalid"}>One uppercase letter</li>
                <li className={/\d/.test(newPassword) ? "valid" : "invalid"}>One number</li>
                <li className={/[!@#$%^&*]/.test(newPassword) ? "valid" : "invalid"}>One special character</li>
              </ul>
            )}
          </div>

          <div className="reset-input-group">
            <input 
              type="password" 
              placeholder="Confirm New Password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required
            />
          </div>

          {/* Display error message */}
          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="reset-button">Reset Password</button>
        </form>
      </div>
      <img src="/reset-password-image.png" alt="Reset Password" className="reset-illustration" />
    </div>
  );
};

export default ResetPassword;
