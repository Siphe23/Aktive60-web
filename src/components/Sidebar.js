import React, { useState } from 'react';
import { FaHome, FaChartBar, FaCog, FaUser, FaBars } from 'react-icons/fa';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="toggle-btn" onClick={() => setIsExpanded(!isExpanded)}>
        <FaBars />
      </div>
      <div className="sidebar-item">
        <FaHome />
        {isExpanded && <span>Overview</span>}
      </div>
      <div className="sidebar-item">
        <FaChartBar />
        {isExpanded && <span>Reports</span>}
      </div>
      <div className="sidebar-item">
        <FaCog />
        {isExpanded && <span>Settings</span>}
      </div>
      <div className="sidebar-item">
        <FaUser />
        {isExpanded && <span>User Management</span>}
      </div>
    </div>
  );
};

export default Sidebar;