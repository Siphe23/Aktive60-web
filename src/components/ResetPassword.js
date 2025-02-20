import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";  // Firebase Authentication imports
import "../styles/resetPassword.css"; 
import ResetImage from "../assets/pana-removebg-preview.png"; 

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");  
  const [loading, setLoading] = useState(false); // For loading state
  const navigate = useNavigate();

  const auth = getAuth();  // Initialize Firebase Authentication

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    setError("");
    setLoading(true);

    // Send password reset email using Firebase Authentication
    try {
      await sendPasswordResetEmail(auth, email);
      // Redirect the user to a success page after sending the reset email
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
      <div className="reset-form">
        <h2 className="reset-logo">Aktiv60</h2>
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
            {loading ? "Sending..." : "Send Reset Email"}
          </button>
        </form>
      </div>

      <div className="reset-image">
        <img src={ResetImage} alt="Reset Password" />
      </div>
    </div>
  );
};

export default ResetPassword;
