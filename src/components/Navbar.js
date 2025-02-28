import React, { useState, useEffect } from "react";
import { FaBell, FaCaretDown, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/NavigationBar.css";
import logo from "../assets/Aktiv60.png";
import { db, realTimeDB } from "../firebase";  // Import db and realTimeDB
import { doc, getDoc } from "firebase/firestore"; // Firestore functions
import { query, collection, where, onSnapshot } from "firebase/firestore"; // Firestore functions
import { ref, onValue } from "firebase/database"; // Realtime DB functions
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Navbar = ({ userData, currentUserRole }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState(0);
  const [role, setRole] = useState(null);  // To store the role
  const navigate = useNavigate();

  useEffect(() => {
    if (userData && userData.uid) {
      // Fetch the role from Firestore once the user logs in
      const fetchRole = async () => {
        try {
          const userDoc = doc(db, "users", userData.uid);
          const docSnapshot = await getDoc(userDoc);
          if (docSnapshot.exists()) {
            const userRole = docSnapshot.data().role;  // Assuming role is stored in Firestore
            setRole(userRole);  // Store role in state
          }
        } catch (error) {
          console.error("Error fetching role:", error);
        }
      };

      fetchRole(); // Call the fetch function when the user logs in
    }
  }, [userData]); // Run only when userData changes

  useEffect(() => {
    // Redirect based on role once the role is fetched
    if (role) {
      if (role === "super_Admin") {
        navigate("/super-profile"); // Redirect to super admin profile
      } else {
        navigate("/staff-profile"); // Redirect to staff profile
      }
    }
  }, [role, navigate]); // Re-run when role changes

  useEffect(() => {
    const adminQuery = query(
      collection(db, "staff"),
      where("role", "==", "Supervisor"),
      where("status", "==", "pending")
    );

    const adminUnsubscribe = onSnapshot(adminQuery, (snapshot) => {
      const adminCount = snapshot.docs.length;
      console.log("Firestore: Pending Admins:", adminCount);

      // Fetch pending user requests from Realtime Database
      const usersRef = ref(realTimeDB, "users");
      const userUnsubscribe = onValue(usersRef, (userSnapshot) => {
        const userData = userSnapshot.val();
        console.log("Realtime Database Raw Data:", userData);

        const userCount = userData
          ? Object.values(userData).filter(
              (user) => user.role === "client" && user.status === "pending"
            ).length
          : 0;

        console.log("Realtime Database: Pending Users:", userCount);

        const totalNotifications = adminCount + userCount;
        setNotifications(totalNotifications);
        console.log("Total Notifications Set:", totalNotifications);
      });

      return () => userUnsubscribe();
    });

    return () => adminUnsubscribe();
  }, [currentUserRole]);

  useEffect(() => {
    console.log("Updated Notifications Count:", notifications);
  }, [notifications]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/staff-login");
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  const handleEditProfile = () => {
    if (role === "super_Admin") {
      navigate("/super-profile"); // Redirect to the super admin profile
    } else {
      navigate("/staff-profile"); // Redirect to the staff profile
    }
  };

  if (!userData) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="navigation-bar">
      <div className="nav-left">
        <div className="navbar-logo-container">
          <img src={logo} alt="Aktiv60 Logo" className="navbar-logo" />
        </div>
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Quick Search..."
            className="search-input"
          />
        </div>
      </div>

      <div className="nav-right">
        {currentUserRole === "super_Admin" && (
          <div className="notification-icon">
            <FaBell className="icon" />
            {notifications > 0 && (
              <span className="badge">{notifications}</span>
            )}
          </div>
        )}

        <div
          className="profile-section"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <img
            src={userData?.avatar || "default-avatar.png"}
            alt="Profile"
            className="profile-pic"
          />
          <span className="profile-name">
            {userData?.name ?? "Guest"} {userData?.lastName ?? ""}
          </span>
          <FaCaretDown className="caret-icon" />
        </div>

        {dropdownOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-item" onClick={handleEditProfile}>Edit Profile</div>
            <div className="dropdown-item" onClick={handleLogout}>Logout</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
