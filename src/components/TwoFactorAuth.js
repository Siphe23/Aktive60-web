import React, { useState } from "react";
import "../styles/styles.css";

const TwoFactorAuth = () => {
  const [authMethod, setAuthMethod] = useState("auth-app");
  const [code, setCode] = useState("");

  const handleVerify = (e) => {
    e.preventDefault();
    alert("2FA Code Submitted: " + code);
  };

  return (
    <div className="auth-container">
      <h2 className="logo">Aktiv60</h2>
      <p className="subtitle">Two-Factor Authentication</p>

      <select 
        value={authMethod} 
        onChange={(e) => setAuthMethod(e.target.value)} 
        className="input-group"
      >
        <option value="auth-app">Authentication App</option>
        <option value="sms">SMS Verification</option>
        <option value="email">Email Verification</option>
        <option value="backup">Backup Codes</option>
      </select>

      <form onSubmit={handleVerify}>
        <div className="input-group">
          <input 
            type="text" 
            placeholder="Enter Code" 
            value={code} 
            onChange={(e) => setCode(e.target.value)} 
            required
          />
        </div>
        <button type="submit" className="auth-button">Verify</button>
      </form>
    </div>
  );
};

export default TwoFactorAuth;
