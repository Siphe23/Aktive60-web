import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./firebase"; // Ensure this is correctly imported
import { onAuthStateChanged } from "firebase/auth";
import Home from "./pages/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PasswordSet from "./components/PasswordSet";
import PasswordResetSuccess from "./components/PasswordResetSuccess";
import TwoFactorAuth from "./components/TwoFactorAuth";
import PasswordRecovery from "./components/PasswordRecovery";
import ResetPassword from "./components/ResetPassword";
import NotFound from "./components/NotFound";
import SuperProfile from './components/SuperProfile';
import Dashboard from './pages/Dashboard';
import StaffRegister from './components/StaffRegister';
import StaffProfile from './components/StaffProfile';
import StaffLogin from './components/StaffLogin';
import SuperLogin from './components/superLogin';
import LocationOverview from "./pages/Location/LocationOverview/LocationOverview";
import LocationDetails from "./pages/Location/LocationDetails/LocationDetails";
import LocationStaff from "./pages/Location/LocationStaff/LocationStaff";
import LocationSettings from "./pages/Location/LocationSettings/LocationSettings";
import Settings from "./pages/Settings";
import Reports from "./pages/Reports";
import UserManagement from "./pages/UserManagement";
import Trainers from "./pages/Trainers";
import Trainees from "./pages/Trainees";
import Collection from "./pages/Collection";
import Navbar from './components/Navbar';
import Sidebar from "./components/Sidebar";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or component
  }

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      
      <Routes>
        <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/set-password" element={<PasswordSet />} />
        <Route path="/forgot-password" element={<ResetPassword />} />
        <Route path="/password-reset-success" element={<PasswordResetSuccess />} />
        <Route path="/two-factor-auth" element={<TwoFactorAuth />} />
        <Route path="/password-recovery" element={<PasswordRecovery />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/super-profile" element={user ? <SuperProfile /> : <Navigate to="/login" />} />
        <Route path="/staff-register" element={user ? <StaffRegister /> : <Navigate to="/login" />} />
        <Route path="/staff-profile" element={user ? <StaffProfile /> : <Navigate to="/login" />} />
        <Route path="/staff-login" element={user ? <Navigate to="/dashboard" /> : <StaffLogin />} />
        <Route path="/super-login" element={user ? <Navigate to="/super-profile" /> : <SuperLogin />} />
        <Route path="/location-overview" element={user ? <LocationOverview /> : <Navigate to="/login" />} />
        <Route path="/location-details" element={user ? <LocationDetails /> : <Navigate to="/login" />} />
        <Route path="/location-staff" element={user ? <LocationStaff /> : <Navigate to="/login" />} />
        <Route path="/location-settings" element={user ? <LocationSettings /> : <Navigate to="/login" />} />
        <Route path="/settings" element={user ? <Settings /> : <Navigate to="/login" />} />
        <Route path="/reports" element={user ? <Reports /> : <Navigate to="/login" />} />
        <Route path="/user-management" element={user ? <UserManagement /> : <Navigate to="/login" />} />
        <Route path="/trainers" element={user ? <Trainers /> : <Navigate to="/login" />} />
        <Route path="/trainees" element={user ? <Trainees /> : <Navigate to="/login" />} />
        <Route path="/collection" element={user ? <Collection /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;