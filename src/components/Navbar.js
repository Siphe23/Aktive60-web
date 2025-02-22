import React, { useState } from 'react'; 
import { FaBell, FaCaretDown } from 'react-icons/fa';
import '../styles/NavigationBar.css';
import profilePic from '../assets/son.png'; 
import logo from '../assets/Aktiv60.png';

const NavigationBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState(2); // Example notification count

  return (
    <div className="navigation-bar">
      <div className="logo-container">
     
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Quick Search..." className="search-input" />
      </div>
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
        {dropdownOpen && (
          <div className="dropdown-content">
            <a href="#" className="dropdown-item">Edit Profile</a>
            <a href="#" className="dropdown-item">Logout</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavigationBar;
