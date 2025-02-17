import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/resetPassword.css"; 

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    navigate("/password-reset-success");
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
              required
            />
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

          <button type="submit" className="reset-button">Reset Password</button>
        </form>
      </div>
      <img src="/reset-password-image.png" alt="Reset Password" className="reset-illustration" />
    </div>
  );
};

export default ResetPassword;

