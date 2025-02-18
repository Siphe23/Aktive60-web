import React from "react";
import { useNavigate } from "react-router-dom"; // Only import what's needed
import "../styles/PasswordRecovery.css"; 

const PasswordRecovery = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/password-reset-success"); // Redirect to the success page
  };

  return (
    <div className="password-recovery-container">
      <div className="form-container">
        <h1>Aktiv60</h1>
        <p>Enter the recovery code we sent to your email</p>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Recovery Code" required />
          <button type="submit" className="reset-button">
            Submit
          </button>
        </form>
      </div>
      <div className="image-container">
        <img src="path-to-your-image.jpg" alt="Password Recovery" />
      </div>
    </div>
  );
};

export default PasswordRecovery;