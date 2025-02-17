import React from "react";
import { Link } from "react-router-dom";
import "../styles/styles.css";

const PasswordResetSuccess = () => {
  return (
    <div className="auth-container">
      <h2 className="logo">Aktiv60</h2>
      <p className="subtitle">Password Reset Successful!</p>
      <Link to="/login" className="auth-button">Go to Login</Link>
    </div>
  );
};

export default PasswordResetSuccess;
