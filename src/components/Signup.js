import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  getIdToken,
} from "firebase/auth";
import TwoFAImage from "../assets/amico.png";
import "../styles/styles.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false); // State for "Remember Me"
  const navigate = useNavigate();

  const isPasswordValid = (password) => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /\d/.test(password) &&
      /[!@#$%^&*]/.test(password)
    );
  };

  // Handle registration
  const handleRegister = async () => {
    if (!email || !password || !confirmPassword || !securityQuestion || !securityAnswer) {
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

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Get Firebase ID token for the user
      const token = await getIdToken(user);

      // Save the token and other necessary information to localStorage if Remember Me is checked
      if (rememberMe) {
        localStorage.setItem("authToken", token);  // Store the token in localStorage
        localStorage.setItem("email", email);      // Optionally store email as well
      }

      toast.success("Registration Successful!");
      navigate("/dashboard");
    } catch (error) {
      let errorMessage = "Registration failed";
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "Email is already registered";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address";
          break;
        case "auth/operation-not-allowed":
          errorMessage = "Email/password accounts are not enabled";
          break;
        case "auth/weak-password":
          errorMessage = "Password is too weak";
          break;
        default:
          errorMessage = error.message;
      }
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Get Firebase ID token for the user
      const token = await getIdToken(user);

      // Save the token and other necessary information to localStorage
      if (rememberMe) {
        localStorage.setItem("authToken", token);  // Store the token in localStorage
        localStorage.setItem("email", user.email); // Optionally store email as well
      }

      toast.success("Registered with Google!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Google sign-up failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="login-section">
        <h2 className="logo">Aktiv60</h2>
        <p className="subtitle">System v2.1.0 (Production)</p>
        <h3>Create an account</h3>

        {/* Email Input */}
        <div className="input-group">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <i className="fas fa-envelope"></i>
        </div>

        {/* Password Input */}
        <div className="input-group">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <i
            className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
            onClick={() => setShowPassword(!showPassword)}
          ></i>
        </div>

        {/* Confirm Password Input */}
        <div className="input-group">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
          />
          <i
            className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          ></i>
        </div>

        {/* Security Question and Answer Inputs */}
        <div className="input-group">
          <select
            value={securityQuestion}
            onChange={(e) => setSecurityQuestion(e.target.value)}
            disabled={loading}
          >
            <option value="">Select a security question</option>
            <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
            <option value="What was the name of your first pet?">What was the name of your first pet?</option>
            <option value="What was your first car?">What was your first car?</option>
            <option value="What city were you born in?">What city were you born in?</option>
            <option value="What is your favorite book?">What is your favorite book?</option>
          </select>
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="Your Answer"
            value={securityAnswer}
            onChange={(e) => setSecurityAnswer(e.target.value)}
            disabled={loading}
          />
        </div>

        <button
          className="auth-button"
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="or-text">
          <hr className="line" />
          Or
          <hr className="line" />
        </p>

        <button
          className="google-auth-button"
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          <i className="fab fa-google"></i> Continue with Google
        </button>

        <p className="switch-auth">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>

      <div className="image-container">
        <img src={TwoFAImage} alt="Two Factor Authentication" />
      </div>
    </div>
  );
};

export default Signup;
