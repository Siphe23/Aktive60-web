import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/twoFactorAuth.css";  // Changed to regular CSS import

const TwoFactorAuth = () => {
  const [recoveryCode, setRecoveryCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Add your API call here to verify the recovery code
      // const response = await verifyRecoveryCode(recoveryCode);
      
      toast.success("Recovery code verified successfully");
      navigate("/home");
    } catch (error) {
      toast.error("Invalid recovery code. Please try again.");
    }
  };

  return (
    <div className="auth-page">
      <button className="back-arrow">
        <img src="/back-arrow.svg" alt="Back" />
      </button>
      
      <div className="auth-container">
        <h1 className="auth-logo">Aktiv60</h1>

        <div className="auth-card">
          <p className="auth-description">
            Enter the recovery code we sent to your email
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="recoveryCode" className="input-label">
                Recovery Code
              </label>
              <input
                id="recoveryCode"
                type="text"
                value={recoveryCode}
                onChange={(e) => setRecoveryCode(e.target.value)}
                className="input-field"
                placeholder="Enter your recovery code"
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              Submit
            </button>

            <div className="progress-dots">
              <div className="dot active"></div>
              <div className="dot active"></div>
              <div className="dot"></div>
            </div>
          </form>
        </div>

        <div className="illustration">
          <img
            src="/authentication-illustration.svg"
            alt="Authentication illustration"
            className="illustration-img"
          />
        </div>
      </div>
    </div>
  );
};

export default TwoFactorAuth;