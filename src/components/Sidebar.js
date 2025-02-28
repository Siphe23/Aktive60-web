import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Sidebar.css";
import collapseIcon from "../assets/Page-1.jpg";
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
} from "@mui/icons-material";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLocationDropdownVisible, setIsLocationDropdownVisible] =
    useState(false);
  const [isBranchDropdownVisible, setIsBranchDropdownVisible] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleLocationDropdown = () => {
    setIsLocationDropdownVisible(!isLocationDropdownVisible);
  };

  const toggleBranchDropdown = () => {
    setIsBranchDropdownVisible(!isBranchDropdownVisible);
  };

  const isActive = (path) => (location.pathname === path ? "active" : "");

  return (
    <div className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
      {/* Sidebar Toggle Button */}
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        <img src={collapseIcon} alt="Toggle Sidebar" className="custom-icon" />
      </div>

      {/* Sidebar Menu */}
      <div className="menu">
        <Link to="/" className={`menu-item ${isActive("/")}`}>
          <Dashboard className="icon" />
          {isExpanded && <span className="text">Overview</span>}
        </Link>

        {/* Location Dropdown */}
        <div
          className={`menu-item ${isLocationDropdownVisible ? "active" : ""}`}
          onClick={toggleLocationDropdown}
        >
          <LocationOn className="icon" />
          {isExpanded && <span className="text">Location</span>}
          {isExpanded &&
            (isLocationDropdownVisible ? <ExpandLess /> : <ExpandMore />)}
        </div>

        {isLocationDropdownVisible && isExpanded && (
          <div className="submenu">
            <Link
              to="/location-overview"
              className={`submenu-item ${isActive("/location-overview")}`}
            >
              Location Overview
            </Link>
            <Link
              to="/location-details"
              className={`submenu-item ${isActive("/location-details")}`}
            >
              Location Details
            </Link>
            <Link
              to="/location-settings"
              className={`submenu-item ${isActive("/location-settings")}`}
            >
              Location Settings
            </Link>
            <Link
              to="/location-staff"
              className={`submenu-item ${isActive("/location-staff")}`}
            >
              Location Staff
            </Link>
          </div>
        )}

        {/* Branch Dropdown */}
        <div
          className={`menu-item ${isBranchDropdownVisible ? "active" : ""}`}
          onClick={toggleBranchDropdown}
        >
          <LocationOn className="icon" />
          {isExpanded && <span className="text">Branch</span>}
          {isExpanded &&
            (isBranchDropdownVisible ? <ExpandLess /> : <ExpandMore />)}
        </div>

        {isBranchDropdownVisible && isExpanded && (
          <div className="submenu">
            <Link
              to="/branchdetails"
              className={`submenu-item ${isActive("/branchdetails")}`}
            >
              Branch Details
            </Link>
            <Link
              to="/branchpackages"
              className={`submenu-item ${isActive("/branchpackages")}`}
            >
              Branch Packages
            </Link>
            <Link
              to="/branchstaff"
              className={`submenu-item ${isActive("/branchstaff")}`}
            >
              Branch Staff
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
        <Link
          to="/user-management"
          className={`menu-item ${isActive("/user-management")}`}
        >
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
        <Link
          to="/collection"
          className={`menu-item ${isActive("/collection")}`}
        >
          <Inventory className="icon" />
          {isExpanded && <span className="text">Collection</span>}
        </Link>
      </div>

      {/* Bottom QR Code */}
      <div className="qr-code">
        <QrCode2 className="icon" />
      </div>
    </div>
  );
};

export default Sidebar;
