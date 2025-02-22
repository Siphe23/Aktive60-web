import React, { useState } from "react";
import { FaBell, FaCaretDown, FaSearch } from "react-icons/fa";
import "../styles/NavigationBar.css";
import profilePic from "../assets/son.png";
import logo from "../assets/Aktiv60.png";

const NavigationBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifications] = useState(2);

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
        
        <div className="profile-section" onClick={() => setDropdownOpen(!dropdownOpen)}>
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