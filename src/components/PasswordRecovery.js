import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore"; // Firestore imports
import RecoveryImage from "../assets/cuate.png";
import "../styles/PasswordRecovery.css";

const PasswordRecovery = () => {
  const [recoveryCode, setRecoveryCode] = useState("");  // To track user input
  const [error, setError] = useState("");  // For displaying errors if any
  const navigate = useNavigate();

  // Firestore setup
  const db = getFirestore();

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recoveryCode) {
      setError("Please enter the recovery code.");
      return;
    }

    try {
      // Query Firestore to check if the recovery code exists
      const codeRef = doc(db, "passwordRecoveryCodes", recoveryCode); // Assuming the code is the doc ID
      const codeDoc = await getDoc(codeRef);

      if (codeDoc.exists()) {
        const codeData = codeDoc.data();
        const currentTime = Date.now();

        // Check if the recovery code has expired (1 hour expiry)
        if (currentTime > codeData.expiration) {
          setError("The recovery code has expired. Please request a new one.");
        } else {
          // Code is valid and not expired, proceed to the reset password page
          navigate("/reset-password");  // Redirect to password reset page
        }
      } else {
        setError("Invalid recovery code. Please try again.");
      }
    } catch (error) {
      console.error("Error during recovery code validation:", error);
      setError("There was an error verifying the recovery code.");
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-form">
        {/* Logo Image */}
        <h2 className="logo">
          <img src={require("../assets/Screenshot 2023-08-19 at 15.11.22.png")} alt="Aktiv60 Logo" />
        </h2>

        <p className="reset-subtitle">
          Enter the recovery code we sent to your email
        </p>

        <form onSubmit={handleSubmit}>
          {/* Recovery Code Input */}
          <div className="reset-input-group">
            <label>Recovery Code</label>
            <input
              type="text"
              placeholder="Enter code"
              value={recoveryCode}
              onChange={(e) => setRecoveryCode(e.target.value)}  // Update state with input
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

      <div className="reset-image">
        <img src={RecoveryImage} alt="Password Recovery Illustration" />
      </div>
    </div>
  );
};

export default PasswordRecovery;