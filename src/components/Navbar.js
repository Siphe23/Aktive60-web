import React, { useState } from 'react';
import { FaBell, FaCaretDown, FaUserCircle } from 'react-icons/fa';
import logo from '../assets/Aktiv60.png';
import '../styles/NavigationBar.css';

const NavigationBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="navigation-bar">
      <img src={logo} alt="Aktiv60 Logo" className="logo" />
      <div className="search-bar">
        <input type="text" placeholder="Quick Search..." />
      </div>
      <div className="nav-right">
        <FaBell className="icon" />
        <div className="profile-section" onClick={() => setDropdownOpen(!dropdownOpen)}>
          <FaUserCircle className="profile-icon" />
          <span className="profile-name">Tyy Ford</span>
          <FaCaretDown className="caret-icon" />
        </div>
        {dropdownOpen && (
          <div className="dropdown-content">
            <a href="#">Edit Profile</a>
            <a href="#">Logout</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavigationBar;
