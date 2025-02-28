import React from "react";
import { Link } from "react-router-dom";
import SuccessImage from "../assets/rafiki-removebg-preview.png";
import "../styles/PasswordSuccess.css";

const PasswordResetSuccess = () => {
  return (
    <div className="auth-container">
      {/* Left Section */}
      <div className="left-content">
        <h2 className="logo">
          <img src={require("../assets/Aktiv60.png")} alt="Aktiv60 Logo" />
        </h2>
        <p className="subtitle">We have sent you a reset link to your email account</p>
        {/* Navigation Button */}
        <Link to="/login" className="auth-button">Go to login</Link>
      </div>
      
      {/* Right Section */}
      <div className="success-image-container">
        <img src={SuccessImage} alt="Password Reset Success" className="success-image" />
      </div>
    </div>
  );
};

export default PasswordResetSuccess;
