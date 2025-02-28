import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import "../styles/resetPassword.css";
import ResetImage from "../assets/pana-removebg-preview.png";
import AktivLogo from "../assets/Aktiv60.png";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError("Please enter your email.");
      return;
    }
    
    setError("");
    setLoading(true);
    
    try {
      await sendPasswordResetEmail(auth, email);
      navigate("/password-reset-success");
    } catch (error) {
      console.error("Error sending password reset email:", error);
      setError("There was an error while sending the reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-container">
      {/* Left side - Form */}
      <div className="reset-form">
        <div className="reset-logo">
          <img src={AktivLogo} alt="Aktiv60 Logo" />
        </div>
        
        <p className="reset-subtitle">Reset your password</p>
        
        <form onSubmit={handleResetPassword}>
          <div className="reset-input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          {error && <p className="error-message">{error}</p>}
          
          <button type="submit" className="reset-button" disabled={loading}>
            {loading ? "Sending..." : "Submit"}
          </button>
        </form>
      </div>
      
      {/* Right side - Illustration */}
      <div className="reset-image">
        <img src={ResetImage} alt="Reset Password" />
      </div>
    </div>
  );
};

export default ResetPassword;
