import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/styles.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Load Google API script dynamically
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: "YOUR_GOOGLE_CLIENT_ID",
        callback: handleGoogleSignIn,
      });
      window.google.accounts.id.renderButton(
        document.getElementById("google-login"),
        { theme: "outline", size: "large" }
      );
    };
  }, []);

  const handleLogin = () => {
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }
    toast.success("Login Successful!");
  };

  const handleGoogleSignIn = (response) => {
    console.log("Google Sign-in Response:", response);
    toast.success("Logged in with Google!");
  };

  return (
    <div className="auth-container">
      <h2 className="logo">Aktiv60</h2>
      <p className="subtitle">System v2.1.0 (Production)</p>
      <img src="/login-image.png" alt="Login Illustration" className="illustration" />
      <h3>Sign into your account</h3>
      <div className="input-group">
        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <i className="fas fa-envelope"></i>
      </div>
      <div className="input-group">
        <input type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <i className="fas fa-eye" onClick={() => setShowPassword(!showPassword)}></i>
      </div>
      <div className="auth-options">
        <label>
          <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
          Remember Me
        </label>
        <Link to="#">Forgot Password?</Link>
      </div>
      <button className="auth-button" onClick={handleLogin}>Login</button>
      <p className="or-text">Or</p>
      <div id="google-login"></div>
      <p className="switch-auth">Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  );
};

export default Login;