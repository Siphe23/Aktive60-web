import React from "react";
import { Link } from "react-router-dom";
import SuccessImage from "../assets/pana-removebg-preview.png"; 

import "../styles/styles.css";

const PasswordResetSuccess = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    toast.success('Redirecting to login...');
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  return (
    <div className="auth-container">
      <h2 className="logo">Aktiv60</h2>
      <p className="subtitle">Password Reset Successful!</p>
      <Link to="/login" className="auth-button">Go to Login</Link>
    </div>
  );
};

export default PasswordResetSuccess;