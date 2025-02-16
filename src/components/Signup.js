import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/styles.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password validation function
  const isPasswordValid = (password) => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /\d/.test(password) &&
      /[!@#$%^&*]/.test(password)
    );
  };

  useEffect(() => {
    // Load Google API script dynamically
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: "YOUR_GOOGLE_CLIENT_ID", // Use your Google Client ID here
        callback: handleGoogleSignIn,
      });
      window.google.accounts.id.renderButton(
        document.getElementById("google-login"),
        { theme: "outline", size: "large" }
      );
    };
  }, []);

  const handleRegister = () => {
    if (!email || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!isPasswordValid(password)) {
      toast.error("Password must meet all requirements");
      return;
    }
    toast.success("Registration Successful!");
  };

  const handleGoogleSignIn = (response) => {
    console.log("Google Sign-in Response:", response);
    toast.success("Registered with Google!");
  };

  return (
    <div className="auth-container">
      {/* Logo and Header */}
      <h2 className="logo">Aktiv60</h2>
      <p className="subtitle">System v2.1.0 (Production)</p>

      {/* Illustration */}
      <img src="/signup-image.png" alt="Signup Illustration" className="illustration" />

      <h3>Create an account</h3>

      {/* Email Field */}
      <div className="input-group">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <i className="fas fa-envelope"></i>
      </div>

      {/* Password Field */}
      <div className="input-group">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <i className="fas fa-eye" onClick={() => setShowPassword(!showPassword)}></i>
      </div>

      {/* Password Requirements */}
      <ul className="password-requirements">
        <li className={password.length >= 8 ? "valid" : "invalid"}>✓ 8+ characters</li>
        <li className={/[A-Z]/.test(password) ? "valid" : "invalid"}>✓ One uppercase letter</li>
        <li className={/\d/.test(password) ? "valid" : "invalid"}>✓ One number</li>
        <li className={/[!@#$%^&*]/.test(password) ? "valid" : "invalid"}>✓ One special character</li>
      </ul>

      {/* Confirm Password Field */}
      <div className="input-group">
        <input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <i className="fas fa-eye" onClick={() => setShowConfirmPassword(!showConfirmPassword)}></i>
      </div>

      {/* Register Button */}
      <button className="auth-button" onClick={handleRegister}>Register</button>

      {/* OR Divider */}
      <p className="or-text">Or</p>

      {/* Social Login */}
      <div id="google-login"></div>

      {/* Login Link */}
      <p className="switch-auth">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
