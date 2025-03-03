import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, db } from "./firebase"; // Ensure this is correctly imported
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
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
import Trainers from "./pages/Trainers/Trainers";
import Trainees from "./pages/Trainees";
import Collection from "./pages/Collection";
import Navbar from './components/Navbar';
import Sidebar from "./components/Sidebar";
import defaultProfilePic from "./assets/avatar-placeholder.png"; // Import default profile picture
import BranchDetails from "./pages/Branch/BranchDetails";
import BranchPackages from "./pages/Branch/BranchPackages";
  import BranchStaff from "./pages/Branch/Branchstaff";
const App = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    name: '',
    lastName: '',
    avatar: defaultProfilePic, // Use the default profile picture initially
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserData({
              name: userData.name,
              lastName: userData.lastName,
              avatar: userData.avatar || defaultProfilePic
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar userData={userData} /> {/* Pass userData to Navbar */}
      {/* <Sidebar /> */}
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/set-password" element={<PasswordSet />} />
        <Route path="/forgot-password" element={<ResetPassword />} />
        <Route
          path="/password-reset-success"
          element={<PasswordResetSuccess />}
        />
        <Route path="/two-factor-auth" element={<TwoFactorAuth />} />
        <Route path="/password-recovery" element={<PasswordRecovery />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/super-profile" element={<SuperProfile />} />
        <Route path="/staff-register" element={<StaffRegister />} />
        <Route path="/staff-profile" element={<StaffProfile />} />
        <Route path="/staff-login" element={<StaffLogin />} />
        <Route path="/super-login" element={<SuperLogin />} />
        <Route path="/location-overview" element={<LocationOverview />} />
        <Route path="/location-details" element={<LocationDetails />} />
        <Route path="/location-staff" element={<LocationStaff />} />
        <Route path="/location-settings" element={<LocationSettings />} />
        <Route path="/branchdetails" element={<BranchDetails />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/trainers" element={<Trainers />} />
        <Route path="/trainees" element={<Trainees />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/BranchDetails" element={<BranchDetails />} />
        <Route path = "/BranchStaff" element = {<BranchStaff />} />  
        <Route path="/BranchPackages" element={<BranchPackages />} />
      </Routes>
    </Router>
  );
};

export default App;