import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import Dashboard from './pages/Dashboard'
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
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/set-password" element={<PasswordSet />} />
        <Route path="/forgot-password" element={<ResetPassword />} />
        <Route path="/password-reset-success" element={<PasswordResetSuccess />} />
        <Route path="/two-factor-auth" element={<TwoFactorAuth />} />
        <Route path="/password-recovery" element={<PasswordRecovery />} />
        <Route path=  "/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
        <Route path="SuperProfile" element={<SuperProfile />} />
        <Route path="StaffRegister" element={<StaffRegister />} />
        <Route path="StaffProfile" element={<StaffProfile />} />
        <Route path="StaffLogin" element={<StaffLogin />} />
        <Route path="SuperLogin" element={<SuperLogin />} />
        <Route path="Navbar" element={<Navbar />} />
           
            <Route path="/locationoverview" element={<LocationOverview />} />
            <Route path="/locationdetails" element={<LocationDetails />} />
            <Route path="/locationstaff" element={<LocationStaff />} />
            <Route path="/locationsettings" element={<LocationSettings />} />
            <Route path="/settings" element={<Settings />} />
            {/* <Route path="/branch-details" element={<BranchDetails />} /> */}
            <Route path="/reports" element={<Reports />} />
            <Route path="/usermanagement" element={<UserManagement />} />
            <Route path="/trainers" element={<Trainers />} />
            <Route path="/trainees" element={<Trainees />} />
            <Route path="/collection" element={<Collection />} />
          
      </Routes>
    </Router>
  );
}

export default App;
