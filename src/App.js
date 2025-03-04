import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

// Import Pages
import Home from "./pages/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PasswordSet from "./components/PasswordSet";
import PasswordResetSuccess from "./components/PasswordResetSuccess";
import TwoFactorAuth from "./components/TwoFactorAuth";
import PasswordRecovery from "./components/PasswordRecovery";
import ResetPassword from "./components/ResetPassword";
import NotFound from "./components/NotFound";
import Dashboard from './pages/Dashboard';
import SuperProfile from './components/SuperProfile';
import Settings from "./pages/Settings";
import Reports from "./pages/Reports";
import BranchDetails from "./pages/Branch/BranchDetails";
import LocationOverview from "./pages/Location/LocationOverview/LocationOverview";
import LocationDetails from "./pages/Location/LocationDetails/LocationDetails";
import LocationStaff from "./pages/Location/LocationStaff/LocationStaff";
import LocationSettings from "./pages/Location/LocationSettings/LocationSettings";
import UserManagement from "./pages/UserManagement";
import Trainers from "./pages/Trainers/Trainers";
import Trainees from "./pages/Trainees";
import Collection from "./pages/Collection";
import BranchPackages from "./pages/Branch/BranchPackages";
import BranchStaff from "./pages/Branch/Branchstaff";
import Navbar from './components/Navbar';
import Sidebar from "./components/Sidebar";
import defaultProfilePic from "./assets/avatar-placeholder.png"; 

// Protected Route Component
const ProtectedRoute = ({ element, role }) => {
  if (!role) return <Navigate to="/login" replace />;
  if (role !== "super_Admin") return <Navigate to="/login" replace />;
  return element;
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [userData, setUserData] = useState({
    name: '',
    lastName: '',
    avatar: defaultProfilePic, 
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserRole(userData.role);  // Set user role
            setUserData({
              name: userData.name,
              lastName: userData.lastName,
              avatar: userData.avatar || defaultProfilePic
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUserRole(null); // No user logged in
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
      <Navbar userData={userData} />
      <Sidebar />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/set-password" element={<PasswordSet />} />
        <Route path="/forgot-password" element={<ResetPassword />} />
        <Route path="/password-reset-success" element={<PasswordResetSuccess />} />
        <Route path="/two-factor-auth" element={<TwoFactorAuth />} />
        <Route path="/password-recovery" element={<PasswordRecovery />} />

        {/* Redirect / to Login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Protected Routes - Only for super_admin */}
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} role={userRole} />} />
        <Route path="/super-profile" element={<ProtectedRoute element={<SuperProfile />} role={userRole} />} />
        <Route path="/location-overview" element={<ProtectedRoute element={<LocationOverview />} role={userRole} />}  />
        <Route path="/location-details" element={<ProtectedRoute element={<LocationDetails />} role={userRole} />}  />
        <Route path="/location-staff" element={<ProtectedRoute element={<LocationStaff />} role={userRole} />}  />
        <Route path="/location-settings" element={<ProtectedRoute element={<LocationSettings />} role={userRole} />}  />
        <Route path="/branchdetails" element={<ProtectedRoute element={<BranchDetails />} role={userRole} />} />
        <Route path="/settings" element={<ProtectedRoute element={<Settings />} role={userRole} />} />
        <Route path="/reports" element={<ProtectedRoute element={<Reports />} role={userRole} />} />
        <Route path="/user-management" element={<ProtectedRoute element={<UserManagement />} role={userRole} />} />
        <Route path="/trainers" element={<ProtectedRoute element={<Trainers />} role={userRole} />} />
        <Route path="/trainees"  element={<ProtectedRoute element={<Trainees />} role={userRole} />} />
        <Route path="/collection" element={<ProtectedRoute element={<Collection />} role={userRole} />} />
        <Route path="/BranchDetails"  element={<ProtectedRoute element={<BranchDetails />} role={userRole} />} />
        <Route path = "/BranchStaff" element={<ProtectedRoute element={<BranchStaff />} role={userRole} />} />  
        <Route path="/BranchPackages" element={<ProtectedRoute element={<BranchPackages />} role={userRole} />} />

        {/* Catch-All Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
