import React from "react";
import { Link } from "react-router-dom";
import SuccessImage from "../assets/pana-removebg-preview.png"; // Success image import

import "../styles/styles.css";

const PasswordResetSuccess = () => {
  return (
    <div className="auth-container">
      <h2 className="logo">Aktiv60</h2>
      <p className="subtitle">Password Reset Successful!</p>

      {/* Success Image */}
      <div className="success-image-container">
        <img src={SuccessImage} alt="Password Reset Success" className="success-image" />
      </div>

      {/* Navigation Button */}
      <Link to="/login" className="auth-button">Go to Login</Link>
    </div>
  );
};

export default PasswordResetSuccess;
