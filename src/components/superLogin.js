import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, db } from "../../src/firebase"; // Ensure you import db for Firestore
import { signInWithEmailAndPassword } from "firebase/auth";
import TwoFAImage from "../assets/amico-removebg-preview.png";
import logo from "../assets/Aktiv60.png";
import "../styles/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { doc, getDoc } from "firebase/firestore"; // Firestore v9+ imports

const InputField = ({ label, type, value, onChange, disabled, placeholder, icon }) => (
  <div className="input-group">
    <label htmlFor={label}>{label}</label>
    <div className="input-wrapper">
      <FontAwesomeIcon icon={icon} className="input-icon" />
      <input
        type={type}
        id={label}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        disabled={disabled}
      />
    </div>
  </div>
);

const SuperAdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check for saved credentials on component mount
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");

    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);  // Set remember me to true if there are saved credentials
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      // Firebase authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if the user exists in Firestore and is a super_Admin
      const userRef = doc(db, "users", user.uid); // Use UID as the document ID
      const userDoc = await getDoc(userRef);  // Use getDoc function to retrieve the document

      if (!userDoc.exists()) {
        toast.error("No user found with this email.");
        return;
      }

      const userData = userDoc.data();

      if (userData.role !== "super_Admin") {
        toast.error("You are not permitted to access this page.");
        return;
      }

      toast.success("Login Successful!");

      // Save credentials to localStorage if "Remember Me" is checked
      if (rememberMe) {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
      } else {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
      }

      // Store the user uid (unique identifier for the user)
      localStorage.setItem("uid", user.uid); // Store the uid in localStorage for later use

      // Navigate to the super admin dashboard or home page
      navigate("/super-admin-dashboard"); // Redirect to the super-admin dashboard

    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleError = (error) => {
    let errorMessage = "Login failed";
    switch (error.code) {
      case "auth/user-not-found":
        errorMessage = "No user found with this email";
        break;
      case "auth/wrong-password":
        errorMessage = "Invalid password";
        break;
      case "auth/invalid-email":
        errorMessage = "Invalid email address";
        break;
      case "auth/too-many-requests":
        errorMessage = "Too many failed attempts. Please try again later";
        break;
      default:
        errorMessage = error.message;
    }
    toast.error(errorMessage);
  };

  return (
    <div className="auth-container">
      <div className="login-section">
        <div className="logo-container">
          <img src={logo} alt="Aktiv60 Logo" className="logo" />
        </div>
        <h3>Sign into your account</h3>

        <form onSubmit={handleLogin}>
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            placeholder="Enter your email"
            icon={faEnvelope}
          />

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <FontAwesomeIcon icon={faLock} className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                disabled={loading}
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          </div>

          <div className="auth-options">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                disabled={loading}
              />
              Remember Me
            </label>
          </div>

          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="forgot-password">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </div>

      <div className="image-container">
        <img src={TwoFAImage} alt="Two Factor Authentication" />
      </div>
    </div>
  );
};

export default SuperAdminLogin;
