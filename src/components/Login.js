import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, db } from "../../src/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import "../styles/styles.css";
import logo from "../assets/Aktiv60.png";
import TwoFAImage from "../assets/amico-removebg-preview.png";

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
    <p className="subtitle">Login to the platform</p>
  </div>
      
         
          
     
          <form onSubmit={handleLogin}>
            {/* Email Field */}
            <div className="form-group">
              <label>Email</label>
              <div className="input-container">
                <div className="input-icon">
                  <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 0H2C0.9 0 0 0.9 0 2V14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM18 14H2V4L10 9L18 4V14ZM10 7L2 2H18L10 7Z" fill="#88868F"/>
                  </svg>
                </div>
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </div>
            
            {/* Password Field */}
            <div className="form-group">
              <label>Password</label>
              <div className="input-container">
                <div className="input-icon">
                  <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 7H17C17.5304 7 18.0391 7.21071 18.4142 7.58579C18.7893 7.96086 19 8.46957 19 9V21C19 21.5304 18.7893 22.0391 18.4142 22.4142C18.0391 22.7893 17.5304 23 17 23H3C2.46957 23 1.96086 22.7893 1.58579 22.4142C1.21071 22.0391 1 21.5304 1 21V9C1 8.46957 1.21071 7.96086 1.58579 7.58579C1.96086 7.21071 2.46957 7 3 7H5V5C5 3.67392 5.52678 2.40215 6.46447 1.46447C7.40215 0.526784 8.67392 0 10 0C11.3261 0 12.5979 0.526784 13.5355 1.46447C14.4732 2.40215 15 3.67392 15 5V7ZM3 9V21H17V9H3ZM10 18C10.5304 18 11.0391 17.7893 11.4142 17.4142C11.7893 17.0391 12 16.5304 12 16C12 15.4696 11.7893 14.9609 11.4142 14.5858C11.0391 14.2107 10.5304 14 10 14C9.46957 14 8.96086 14.2107 8.58579 14.5858C8.21071 14.9609 8 15.4696 8 16C8 16.5304 8.21071 17.0391 8.58579 17.4142C8.96086 17.7893 9.46957 18 10 18ZM13 7V5C13 4.20435 12.6839 3.44129 12.1213 2.87868C11.5587 2.31607 10.7956 2 10 2C9.20435 2 8.44129 2.31607 7.87868 2.87868C7.31607 3.44129 7 4.20435 7 5V7H13Z" fill="#88868F"/>
                  </svg>
                </div>
                <input 
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
                <div 
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg width="22" height="19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11 4C14.79 4 18.17 6.13 19.82 9.5C18.17 12.87 14.79 15 11 15C7.21 15 3.83 12.87 2.18 9.5C3.83 6.13 7.21 4 11 4ZM11 2C6 2 1.73 5.11 0 9.5C1.73 13.89 6 17 11 17C16 17 20.27 13.89 22 9.5C20.27 5.11 16 2 11 2ZM11 7C12.38 7 13.5 8.12 13.5 9.5C13.5 10.88 12.38 12 11 12C9.62 12 8.5 10.88 8.5 9.5C8.5 8.12 9.62 7 11 7ZM11 5C8.52 5 6.5 7.02 6.5 9.5C6.5 11.98 8.52 14 11 14C13.48 14 15.5 11.98 15.5 9.5C15.5 7.02 13.48 5 11 5Z" fill="#88868F"/>
                      <line x1="2" y1="18" x2="20" y2="2" stroke="#88868F" stroke-width="2"/>
                    </svg>
                  ) : (
                    <svg width="22" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11 4C14.79 4 18.17 6.13 19.82 9.5C18.17 12.87 14.79 15 11 15C7.21 15 3.83 12.87 2.18 9.5C3.83 6.13 7.21 4 11 4ZM11 2C6 2 1.73 5.11 0 9.5C1.73 13.89 6 17 11 17C16 17 20.27 13.89 22 9.5C20.27 5.11 16 2 11 2ZM11 7C12.38 7 13.5 8.12 13.5 9.5C13.5 10.88 12.38 12 11 12C9.62 12 8.5 10.88 8.5 9.5C8.5 8.12 9.62 7 11 7ZM11 5C8.52 5 6.5 7.02 6.5 9.5C6.5 11.98 8.52 14 11 14C13.48 14 15.5 11.98 15.5 9.5C15.5 7.02 13.48 5 11 5Z" fill="#88868F"/>
                    </svg>
                  )}
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
              Don't have access? <a href="#">Register</a>
            </div>
          </form>
        </div>
        
        {/* Right side - Illustration */}
        <div className="login-illustration">
          <div className="illustration-container">
            <img src={TwoFAImage} alt="Login security illustration" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminLogin;