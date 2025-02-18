import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore"; // Firebase Firestore imports
import RecoveryImage from "../assets/cuate.png";
import "../styles/PasswordRecovery.css";

const PasswordRecovery = () => {
  const [recoveryCode, setRecoveryCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Firestore setup
  const db = getFirestore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recoveryCode) {
      setError("Please enter the recovery code.");
      return;
    }

    try {
      // Query Firestore for the recovery code (assuming you store it under the "superadmin" collection)
      const userRef = doc(db, "superadmin", recoveryCode); // Assuming recoveryCode is stored as a document ID
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        // If recovery code exists, navigate to the reset password page
        navigate("/reset-password");
      } else {
        setError("Invalid recovery code. Please try again.");
      }
    } catch (error) {
      console.error("Error during code verification:", error);
      setError("There was an error validating the recovery code.");
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-form">
        <h1 className="reset-logo">Aktiv60</h1>
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
              onChange={(e) => setRecoveryCode(e.target.value)}
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
