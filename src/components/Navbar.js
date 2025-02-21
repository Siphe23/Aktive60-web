import React, { useState } from "react";
import { FaBell, FaCaretDown, FaSearch } from "react-icons/fa";
import "../styles/NavigationBar.css";
import profilePic from "../assets/son.png";
import logo from "../assets/Aktiv60.png";

const NavigationBar = ({ isSidebarExpanded }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState(2); // Example notification count

  return (
    <div
      className="navigation-bar"
      style={{ marginLeft: isSidebarExpanded ? "220px" : "60px" }}
    >
      {/* Center: Search Bar */}
      <div className="search-bar">
        <input type="text" placeholder="Quick Search..." className="search-input" />
        <FaSearch className="search-icon" />
      </div>

      {/* Right Section: Profile, Bell Notification */}
      <div className="nav-right">
        <div className="notification-icon">
          <FaBell className="icon" />
          {notifications > 0 && <span className="badge">{notifications}</span>}
        </div>
        <img src={profilePic} alt="Profile" className="profile-pic" />
        <div className="profile-section" onClick={() => setDropdownOpen(!dropdownOpen)}>
          <span className="profile-name">Tyy Ford</span>
          <FaCaretDown className="caret-icon" />
        </div>
      </div>

      {/* Logo Positioned at the Top-Right Corner */}
      <div className="logo-container">
        <img src={logo} alt="Aktiv60 Logo" className="logo" />
      </div>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="dropdown-content">
          <a href="#" className="dropdown-item">Edit Profile</a>
          <a href="#" className="dropdown-item">Logout</a>
        </div>
      )}
    </div>
  );
};

export default NavigationBar;
