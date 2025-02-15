import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home"; 
import Login from "./components/Login"; 
import Signup from "./components/Signup"; 
// import Navbar from "./components/Navbar";  

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      {/* <Navbar />   */}
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;

