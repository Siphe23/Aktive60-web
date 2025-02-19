import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth"; // Firebase Authentication imports
import "../styles/resetPassword.css"; 
import ResetImage from "../assets/pana-removebg-preview.png"; 

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");  
  const navigate = useNavigate();

  // Firebase Authentication setup
  const auth = getAuth();  // Initialize Firebase Authentication

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    setError("");  

    // Send password reset email
    try {
      await sendPasswordResetEmail(auth, email);
      // Redirect the user to the success page
      navigate("/password-reset-success"); // Navigate to the success page after sending the reset email
    } catch (error) {
      console.error("Error sending reset email:", error);
      setError("There was an error sending the password reset email. Please try again.");
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-form">
        <h2 className="reset-logo">Aktiv60</h2>
        <p className="reset-subtitle">Reset your password</p>

        <form onSubmit={handleResetPassword}>
          {/* Email Input */}
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

          {/* Error Message */}
          {error && <p className="error-message">{error}</p>}

          {/* Submit Button */}
          <button type="submit" className="reset-button">Submit</button>
        </form>
      </div>

      {/* Right Side Image */}
      <div className="reset-image">
        <img src={ResetImage} alt="Reset Password" />
      </div>
    </div>
  );
};

export default ResetPassword;
