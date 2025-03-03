import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import "../styles/ForgotPassword.css";
import ResetImage from "../assets/Forgot-password.png";
import BackIcon from "../assets/Group (1).png";
import logo from "../assets/Aktiv60.png";
import EmailIcon from "../assets/email_svgrepo.com.png";

import EyeIcon from "../assets/eye.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");
    
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent. Please check your inbox.");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setError("Failed to send reset email. Please try again.");
      console.error("Password reset error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-content">
        <div className="back-button" onClick={handleBack}>
          <img src={BackIcon} alt="Back" />
        </div>
        
        <div className="forgot-password-form-section">
        <div className="forgot-password-logo">
  <img src={logo} alt="Aktiv60 Logo" className="login-logo" />
</div>

          
          <h1 className="forgot-password-title">Reset your password</h1>
          
          <form className="forgot-password-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <div className="input-container">
                <img src={EmailIcon} alt="Email" className="input-icon" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <img src={EyeIcon} alt="Show/Hide" className="eye-icon" />
              </div>
            </div>
            
            {message && <div className="success-message">{message}</div>}
            {error && <div className="error-message">{error}</div>}
            
            <button 
              type="submit" 
              className="submit-button"
              disabled={isLoading || !email}
            >
              {isLoading ? "Processing..." : "Submit"}
            </button>
          </form>
        </div>
        
        <div className="forgot-password-image-section">
          <img src={ResetImage} alt="Reset Password" className="reset-image" />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;