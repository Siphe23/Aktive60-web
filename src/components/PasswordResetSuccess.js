import React from 'react';
import '../styles/PasswordResetSuccess.css';
import { ToastContainer, toast } from 'react-toastify';
import logo from "../assets/Aktiv60.png"; 
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const PasswordResetSuccess = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    toast.success('Redirecting to login...');
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  return (
    <div className="password-reset-success-container">
      <div className="content">
        <img src={logo} alt="Aktiv60" className="logo" />
        <h1>Password Reset Successfully!</h1>
        <button onClick={handleLoginClick} className="login-button">Go to login</button>
      </div>
      <div className="image-container">
        <img src={require('../assets/amico.png')} alt="Password Reset Success" />
      </div>
      <ToastContainer />
    </div>
  );
};

export default PasswordResetSuccess;