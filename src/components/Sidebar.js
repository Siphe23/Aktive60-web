import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Sidebar.css";
import {
  Dashboard,
  LocationOn,
  Settings,
  BarChart,
  People,
  Build,
  Group,
  Inventory,
  ExpandLess,
  ExpandMore,
  QrCode2,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";

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

  const isActive = (path) => (location.pathname === path ? "active" : "");

  return (
    <div className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
      <div className="sidebar-inner">
        {/* Expand/Collapse Button */}
        <div className="sidebar-toggle" onClick={toggleSidebar}>
          {isExpanded ? <ChevronLeft className="icon" /> : <ChevronRight className="icon" />}
        </div>

        {/* Sidebar Menu */}
        <div className="menu">
          <Link to="/" className={`menu-item ${isActive("/")}`}>
            <Dashboard className="icon" />
            {isExpanded && <span className="text">Overview</span>}
          </Link>

          <div
            className={`menu-item ${isLocationDropdownVisible ? "active" : ""}`}
            onClick={toggleLocationDropdown}
          >
            <LocationOn className="icon" />
            {isExpanded && <span className="text">Location</span>}
            {isExpanded && (isLocationDropdownVisible ? <ExpandLess /> : <ExpandMore />)}
          </div>

          {isLocationDropdownVisible && isExpanded && (
            <div className="submenu">
              <Link to="/locationoverview" className={`submenu-item ${isActive("/locationoverview")}`}>
                Location Overview
              </Link>
              <Link to="/locationdetails" className={`submenu-item ${isActive("/locationdetails")}`}>
                Location Details
              </Link>
              <Link to="/locationsettings" className={`submenu-item ${isActive("/locationsettings")}`}>
                Location Settings
              </Link>
              <Link to="/locationstaff" className={`submenu-item ${isActive("/locationstaff")}`}>
                Location Staff
              </Link>
            </div>
          )}

          <Link to="/settings" className={`menu-item ${isActive("/settings")}`}>
            <Settings className="icon" />
            {isExpanded && <span className="text">System Settings</span>}
          </Link>
          <Link to="/reports" className={`menu-item ${isActive("/reports")}`}>
            <BarChart className="icon" />
            {isExpanded && <span className="text">Generate Reports</span>}
          </Link>
          <Link to="/users" className={`menu-item ${isActive("/users")}`}>
            <People className="icon" />
            {isExpanded && <span className="text">User Management</span>}
          </Link>
          <Link to="/trainers" className={`menu-item ${isActive("/trainers")}`}>
            <Build className="icon" />
            {isExpanded && <span className="text">Trainers</span>}
          </Link>
          <Link to="/trainees" className={`menu-item ${isActive("/trainees")}`}>
            <Group className="icon" />
            {isExpanded && <span className="text">Trainees</span>}
          </Link>
          <Link to="/collection" className={`menu-item ${isActive("/collection")}`}>
            <Inventory className="icon" />
            {isExpanded && <span className="text">Collection</span>}
          </Link>
        </div>

        {/* Bottom QR Code */}
        <div className="qr-code">
          <QrCode2 className="icon" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;