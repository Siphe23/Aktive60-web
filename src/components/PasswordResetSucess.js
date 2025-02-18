import React from "react";
import { Link } from "react-router-dom";
import SuccessImage from "../assets/pana-removebg-preview.png"; 

import "../styles/styles.css";

const PasswordResetSuccess = () => {
  return (
    <div className="password-reset-success-container">
      <div className="content-container">
        {/* Left side - Image */}
        <div className="image-container">
          <img src={SuccessImage} alt="Success Illustration" />
        </div>

        {/* Right side - Text Content */}
        <div className="text-container">
          <h1 className="logo">Aktiv60</h1>
          <h2>Password Reset Successful!</h2>
          <Link to="/login" className="login-button">Go to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetSuccess;
