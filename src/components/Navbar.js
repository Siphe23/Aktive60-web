import React, { useState, useEffect } from "react";
import { FaBell, FaCaretDown, FaSearch } from "react-icons/fa";
import "../styles/NavigationBar.css";
import profilePic from "../assets/son.png";
import logo from "../assets/Aktiv60.png";
import { db, realTimeDB } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { ref, onValue } from "firebase/database";

const NavigationBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState(0);

  useEffect(() => {
    // Count pending admin requests (Supervisors) from Firestore
    const adminQuery = query(
      collection(db, "staff"),
      where("role", "==", "Supervisor"),
      where("status", "==", "pending")
    );

    const adminUnsubscribe = onSnapshot(adminQuery, (snapshot) => {
      const adminCount = snapshot.docs.length;

      // Count pending user requests (clients) from Realtime Database
      const usersRef = ref(realTimeDB, "users");
      onValue(usersRef, (userSnapshot) => {
        const userData = userSnapshot.val();
        const userCount = userData
          ? Object.values(userData).filter(
              (user) => user.role === "client" && user.status === "pending"
            ).length
          : 0;

        // Total notifications = pending admins + pending users
        setNotifications(adminCount + userCount);
      });
    });

    return () => adminUnsubscribe();
  }, []);

  return (
    <div className="navigation-bar">
      {/* Left Section - Logo + Search */}
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

      {/* Right Section */}
      <div className="nav-right">
        <div className="notification-icon">
          <FaBell className="icon" />
          {notifications > 0 && <span className="badge">{notifications}</span>}
        </div>

        <div
          className="profile-section"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <img src={profilePic} alt="Profile" className="profile-pic" />
          <span className="profile-name">Tyy Ford</span>
          <FaCaretDown className="caret-icon" />
        </div>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-item">Edit Profile</div>
            <div className="dropdown-item">Logout</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavigationBar;
