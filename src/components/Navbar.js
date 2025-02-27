import React, { useState, useEffect } from "react";
import { FaBell, FaCaretDown, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/NavigationBar.css";
import logo from "../assets/Aktiv60.png";
import { db, realTimeDB } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { ref, onValue } from "firebase/database";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Navbar = ({ userData, currentUserRole }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Current User Role in Navbar:", currentUserRole);

    if (currentUserRole !== "super_Admin") {
      setNotifications(0);
      return;
    }

    // Fetch pending admin requests from Firestore
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

  if (!userData) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="navigation-bar">
      <div className="nav-left">
        <div className="logo-container">
          <img src={logo} alt="Aktiv60 Logo" className="logo" />
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
            <div className="dropdown-item">Edit Profile</div>
            <div className="dropdown-item" onClick={handleLogout}>
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
