import React from "react";
import { useNavigate } from "react-router-dom";
import RecoveryImage from "../assets/cuate.png";
import "../styles/PasswordRecovery.css";

const PasswordRecovery = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/password-reset-success");
  };

  return (
    <div className="reset-container">
      <div className="reset-form">
                 {/* <h2 className="logo">
  <img src={require('../assets/Screenshot 2023-08-19 at 15.11.22.png')} alt="Aktiv60" />
</h2> */}
        <h1 className="reset-logo">Aktiv60</h1>
        <p className="reset-subtitle">
          Enter the recovery code we sent to your email
        </p>
        <form onSubmit={handleSubmit}>
          <div className="reset-input-group">
            <label>Recovery Code</label>
            <input type="text" placeholder="Enter code" required />
          </div>
          <button type="submit" className="reset-button">Submit</button>
        </form>
      </div>
      <div className="reset-image">
        <img src={RecoveryImage} alt="Password Recovery Illustration" />
      </div>
    </div>
  );
};

export default PasswordRecovery;
