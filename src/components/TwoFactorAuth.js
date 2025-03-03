import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/twoFactorAuth.css";
import TwoFAImage from "../assets/bro-removebg-preview.png";
import logo from "../assets/Aktiv60.png";
import BackIcon from "../assets/Group (1).png"; // Back button image

const TwoFactorAuth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");

  const handleSMSVerification = () => {
    if (!code) {
      toast.error("Please enter the verification code.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("SMS Verification Successful!");
      navigate("/verify-code");
    }, 1500);
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="two-fa-container">
      {/* Back Button */}
      <div className="back-button" onClick={handleBack}>
        <img src={BackIcon} alt="Back" />
      </div>

      {/* Logo */}
      <img src={logo} alt="Aktiv60 Logo" className="logo" />

      <div className="two-fa-content">
        {/* Left Side - Form */}
        <div className="two-fa-form">
          <h2>Two-Factor Authentication</h2>
          <p>A verification code has been sent to your number.</p>
          <div className="input-container">
            <input
              type="text"
              placeholder="Enter your verification code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <button
            className="sms-verification-btn"
            onClick={handleSMSVerification}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Submit"}
          </button>
        </div>

        {/* Right Side - Illustration */}
        <img src={TwoFAImage} alt="2FA Illustration" className="two-fa-image" />
      </div>
    </div>
  );
};

export default TwoFactorAuth;
