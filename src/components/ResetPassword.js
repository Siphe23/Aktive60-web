import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";

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
    // Simulate successful password reset
    navigate("/password-reset-success");
  };

  return (
    <div className="auth-container">
      <h2 className="logo">Aktiv60</h2>
      <p className="subtitle">Enter your new password</p>
      
      <form onSubmit={handleResetPassword}>
        <div className="input-group">
          <input 
            type="password" 
            placeholder="New Password" 
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)} 
            required
          />
        </div>
        
        <div className="input-group">
          <input 
            type="password" 
            placeholder="Confirm New Password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required
          />
        </div>

        <button type="submit" className="auth-button">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
