import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, setDoc } from "firebase/firestore"; // Firebase Firestore imports
import "../styles/resetPassword.css"; 
import ResetImage from "../assets/pana-removebg-preview.png"; 

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [error, setError] = useState("");  
  const navigate = useNavigate();

  // Firestore setup
  const db = getFirestore();  // Initialize Firestore

  // Predefined security questions
  const securityQuestions = [
    "What is your mother's maiden name?",
    "What was the name of your first pet?",
    "What was your first car?",
    "What city were you born in?",
    "What is your favorite book?",
  ];

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!email || !securityQuestion || !securityAnswer) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");  
    
    // Save the input data to the Firestore superadmin collection
    try {
      // Create a unique document for the user under "superadmin" collection
      const docRef = doc(db, "superadmin", email);  // Use email as a unique doc id
      await setDoc(docRef, {
        email,
        securityQuestion,
        securityAnswer,
        timestamp: new Date(), // Timestamp of the record
      });

      // Redirect the user to success page
      navigate("/password-reset-success");
    } catch (error) {
      console.error("Error saving recovery data:", error);
      setError("There was an error while resetting your password. Please try again.");
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-form">
        <h2 className="reset-logo">Aktiv60</h2>
        <p className="reset-subtitle">Reset your password</p>

        <form onSubmit={handleResetPassword}>
          {/* Email Input */}
          <div className="reset-input-group">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
          </div>

          {/* Security Question Selection */}
          <div className="reset-input-group">
            <label>Security Question</label>
            <select 
              value={securityQuestion} 
              onChange={(e) => setSecurityQuestion(e.target.value)}
              required
            >
              <option value="">Select a security question</option>
              {securityQuestions.map((question, index) => (
                <option key={index} value={question}>
                  {question}
                </option>
              ))}
            </select>
          </div>

          {/* Security Answer Input */}
          <div className="reset-input-group">
            <label>Answer</label>
            <input 
              type="text" 
              placeholder="Enter your answer" 
              value={securityAnswer} 
              onChange={(e) => setSecurityAnswer(e.target.value)} 
              required
            />
          </div>

          {/* Error Message */}
          {error && <p className="error-message">{error}</p>}

          {/* Submit Button */}
          <button type="submit" className="reset-button">Submit</button>
        </form>
      </div>

      {/* Right Side Image */}
      <div className="reset-image">
        <img src={ResetImage} alt="Reset Password" />
      </div>
    </div>
  );
};

export default ResetPassword;
