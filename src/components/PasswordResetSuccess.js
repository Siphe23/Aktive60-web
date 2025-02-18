import React from 'react';
import '../styles/PasswordResetSuccess.css';
import { ToastContainer, toast } from 'react-toastify';
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
        <h2 className="logo">Aktiv60</h2> {/* Replaced the logo image with an h2 tag */}
        <h1>Password Reset Successfully!</h1>
        <button onClick={handleLoginClick} className="login-button">Go to login</button>
      </div>
      <div className="image-container">
        <img src={require('../assets/pana-removebg-preview.png')} alt="Password Reset Success" />
      </div>
      <ToastContainer />
    </div>
  );
};

export default PasswordResetSuccess;