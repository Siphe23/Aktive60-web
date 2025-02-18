import React from "react";
import { useNavigate } from "react-router-dom"; 
import "../styles/PasswordResetSuccess.css";
import SuccessImage from "../assets/pana-removebg-preview.png"; 

const PasswordResetSuccess = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login"); // Redirect to the login page
  };

  return (
    <div className="password-reset-success-container">
      <div className="content-container">
        <div className="text-container">
          <h1>Aktiv60</h1>
          <h2>Password Reset Successfully!</h2>
          <button onClick={handleLoginRedirect} className="login-button">
            Go to Login
          </button>
        </div>
        <div className="image-container">
          <img src={SuccessImage} alt="Password Reset Success" />
        </div>
      </div>
    </div>
  );
};

export default PasswordResetSuccess;