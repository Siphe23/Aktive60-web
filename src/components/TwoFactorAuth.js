import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/twoFactorAuth.css"; // Use the updated CSS
import TwoFAImage from "../assets/bro-removebg-preview (2).png"; // Import the image

const TwoFactorAuth = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(""); // Track selected 2FA option

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the selected option
    if (!selectedOption) {
      toast.error("Please select a 2FA verification method.");
      return;
    }

    // Handle 2FA verification logic here
    toast.success(`2FA verification via ${selectedOption} initiated.`);
    navigate("/home"); // Redirect to home or dashboard after verification
  };

  return (
    <div className="two-factor-auth-container">
      <div className="form-container">
        <h1>Aktiv80</h1>
        <h2>Two-Factor Authentication</h2>
        <form onSubmit={handleSubmit}>
          <div className="auth-options">
            <label>
              <input
                type="radio"
                name="2fa-option"
                value="Authentication App"
                onChange={(e) => setSelectedOption(e.target.value)}
              />
              Authentication App
            </label>
            <label>
              <input
                type="radio"
                name="2fa-option"
                value="SMS Verification"
                onChange={(e) => setSelectedOption(e.target.value)}
              />
              SMS Verification
            </label>
            <label>
              <input
                type="radio"
                name="2fa-option"
                value="Email Verification"
                onChange={(e) => setSelectedOption(e.target.value)}
              />
              Email Verification
            </label>
            <label>
              <input
                type="radio"
                name="2fa-option"
                value="Backup Codes"
                onChange={(e) => setSelectedOption(e.target.value)}
              />
              Backup Codes
            </label>
          </div>
          <button type="submit" className="submit-button">
            Verify
          </button>
        </form>
      </div>
      <div className="image-container">
        <img src={TwoFAImage} alt="Two-Factor Authentication" />
      </div>
    </div>
  );
};

export default TwoFactorAuth;