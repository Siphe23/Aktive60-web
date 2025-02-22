import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Sidebar.css";
import { Dashboard, LocationOn, Settings, BarChart, People, Build, Group, Inventory, ExpandLess, ExpandMore } from "@mui/icons-material";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLocationDropdownVisible, setIsLocationDropdownVisible] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleLocationDropdown = () => {
    setIsLocationDropdownVisible(!isLocationDropdownVisible);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <div className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
      <div className="sidebar-inner">
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isExpanded ? "<" : ">"}
        </button>
        <div className="menu">
          <Link to="/" className={`menu-item ${isActive('/')}`}>
            <Dashboard className="icon" />
            <span className="text">Overview</span>
          </Link>
          <div className={`menu-item ${isActive('/locationoverview') || isActive('/locationdetails') || isActive('/locationmap') ? 'active' : ''}`} onClick={toggleLocationDropdown}>
            <LocationOn className="icon" />
            <span className="text">Location</span>
            {isLocationDropdownVisible ? <ExpandLess className="icon" /> : <ExpandMore className="icon" />}
          </div>
          {isLocationDropdownVisible && (
            <div className="submenu">
              <Link to="/locationoverview" className={`submenu-item ${isActive('/locationoverview')}`}>
                Location Overview
              </Link>
              <Link to="/locationdetails" className={`submenu-item ${isActive('/locationdetails')}`}>
                Location Details
              </Link>
              <Link to="/locationsettings" className={`submenu-item ${isActive('/locationsettings')}`}>
                Location Settings
              </Link>
              <Link to="/locationstaff" className={`submenu-item ${isActive('/locationstaff')}`}>
                Location Staff
              </Link>
            </div>
          )}
          <Link to="/settings" className={`menu-item ${isActive('/settings')}`}>
            <Settings className="icon" />
            <span className="text">System Settings</span>
          </Link>
          <Link to="/reports" className={`menu-item ${isActive('/reports')}`}>
            <BarChart className="icon" />
            <span className="text">Generate Reports</span>
          </Link>
          <Link to="/users" className={`menu-item ${isActive('/users')}`}>
            <People className="icon" />
            <span className="text">User Management</span>
          </Link>
          <Link to="/trainers" className={`menu-item ${isActive('/trainers')}`}>
            <Build className="icon" />
            <span className="text">Trainers</span>
          </Link>
          <Link to="/trainees" className={`menu-item ${isActive('/trainees')}`}>
            <Group className="icon" />
            <span className="text">Trainees</span>
          </Link>
          <Link to="/collection" className={`menu-item ${isActive('/collection')}`}>
            <Inventory className="icon" />
            <span className="text">Collection</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
