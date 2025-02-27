import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, db } from "../../src/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import "../styles/styles.css";
import logo from "../assets/Aktiv60.png";
import TwoFAImage from "../assets/Login.png";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";  // Lock icon for password
import { AiOutlineMail } from "react-icons/ai";  // Email icon

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
      setRememberMe(true);
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
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

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

      // Store the user uid
      localStorage.setItem("uid", user.uid);

      // Navigate to the super admin dashboard
      navigate("/dashboard");

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
    <div className="login-page">
      <div className="login-container">
        {/* Left side - Login Form */}
        <div className="login-form">
          {/* Logo */}
          <div className="logo-container">
            <img src={logo} alt="Aktiv60 Logo" className="login-logo" />
            <p className="login-subtitle">Login to the platform</p>
          </div>

          <form onSubmit={handleLogin}>
            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-container">
                <AiOutlineMail size={50} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  aria-label="Email address"
                  style={{ paddingLeft: '50px' }} // To prevent overlap with the icon
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-container" style={{ position: 'relative' }}>
                <FaLock size={30} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  aria-label="Password"
                  style={{ paddingLeft: '50px' }} // To prevent overlap with the icon
                />
                <div
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                  style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
                >
                  {showPassword ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
                </div>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="forgot-password">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>

            {/* Remember Me Checkbox */}
            <div className="remember-me">
              <div
                className={`custom-checkbox ${rememberMe ? 'checked' : ''}`}
                onClick={() => setRememberMe(!rememberMe)}
              >
                {rememberMe && (
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 10L0 5.19231L1.4 3.84615L5 7.30769L12.6 0L14 1.34615L5 10Z" fill="white"/>
                  </svg>
                )}
              </div>
              <label onClick={() => setRememberMe(!rememberMe)}>Remember me</label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
              <span className="arrow">→</span>
            </button>

            {/* Registration Link */}
            <div className="register-link">
              Don't have access? <Link to="/register">Register</Link>
            </div>
          </form>
        </div>

       
        
      </div><div className="login-illustration">
          <div className="illustration-container">
            <img src={TwoFAImage} alt="Login security illustration" />
          </div>
        </div>
    </div>
  );
};

export default SuperAdminLogin;
