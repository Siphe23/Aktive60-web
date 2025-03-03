import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import ResetImage from "../assets/Forgot-password.png";
import BackIcon from "../assets/Group (1).png";
import logo from "../assets/Aktiv60.png";
import KeyIcon from "../assets/key-01-stroke-rounded 1 (4).png"; // Make sure this path is correct
import "../styles/PasswordRecovery.css";

const PasswordRecovery = () => {
  const [recoveryCode, setRecoveryCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!recoveryCode) {
      setError("Please enter your recovery code");
      return;
    }

    try {
      setLoading(true);
      setError("");
      // Handle recovery code logic here
      console.log("Recovery code submitted:", recoveryCode);
    } catch (error) {
      setError("Failed to process recovery code. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="recovery-container">
      <div className="back-button" onClick={handleBack}>
        <img src={BackIcon} alt="Back" />
      </div>
      
      <div className="recovery-content">
        <div className="recovery-left">
          <div className="recovery-logo">
            <img src={logo} alt="Aktiv60 Logo" />
          </div>

          <div className="recovery-form-container">
            <h2>Recovery Code</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-container">
                <div className="input-group">
                  <img src={KeyIcon} alt="Key" className="input-icon" />
                  <input
                    type="text"
                    placeholder="Enter your recovery code"
                    value={recoveryCode}
                    onChange={(e) => setRecoveryCode(e.target.value)}
                  />
                </div>
              </div>
              
              <button type="submit" className="submit-button" disabled={loading}>
                Submit
              </button>
            </form>
            {error && <div className="error-message">{error}</div>}
          </div>
        </div>
        
        <div className="recovery-right">
          <div className="illustration-container">
            <img src={ResetImage} alt="Password Recovery" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordRecovery;