import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/twoFactorAuth.css"; // Ensure you have this CSS file
import TwoFAImage from "../assets/bro-removebg-preview.png"; // Adjust the path
import logo from "../assets/Aktiv60.png"; // Adjust the path

const TwoFactorAuth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSMSVerification = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("SMS Verification Sent!");
      navigate("/verify-code");
    }, 1500);
  };

  return (
    <div className="two-fa-container">
      <img src={logo} alt="Aktiv80 Logo" className="logo" />
      <div className="two-fa-content">
        <div className="two-fa-text">
          <h2>Two-Factor Authentication</h2>
          <button
            className="sms-verification-btn"
            onClick={handleSMSVerification}
            disabled={loading}
          >
            {loading ? "Sending..." : "SMS Verification →"}
          </button>
        </div>
        <img src={TwoFAImage} alt="2FA Illustration" className="two-fa-image" />
      </div>
    </div>
  );
};

export default TwoFactorAuth;