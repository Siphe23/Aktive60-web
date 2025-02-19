import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore } from "firebase/firestore";
import "../styles/PasswordRecovery.css";
import RecoveryImage from "../assets/cuate.png";

const PasswordRecovery = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  // Firestore setup
  const db = getFirestore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    try {
      // Call Firebase Cloud Function to send the recovery code
      const sendRecoveryCode = firebase.functions().httpsCallable("requestPasswordReset");
      await sendRecoveryCode({ email });

      // Redirect to the page where user can enter the recovery code
      navigate("/enter-recovery-code");
    } catch (error) {
      console.error("Error during password recovery:", error);
      setError("There was an error sending the recovery code. Please try again.");
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-form">
        <h1 className="reset-logo">Aktiv60</h1>
        <p className="reset-subtitle">Enter your email to receive a recovery code</p>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="reset-button">
            Submit
          </button>
        </form>
      </div>

      {/* Right Side Image */}
      <div className="reset-image">
        <img src={RecoveryImage} alt="Password Recovery Illustration" />
      </div>
    </div>
  );
};

export default PasswordRecovery;
