import React from "react";
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
} from "@mui/icons-material";

const Sidebar = ({ isExpanded, toggle }) => {
  return (
    <div className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
      <div className="sidebar-inner">
        <button className="toggle-btn" onClick={toggle}>
          {isExpanded ? "<" : ">"}
        </button>
        <div className="menu">
          <div className="menu-item">
            <Dashboard className="icon" />
            <span className="text">Overview</span>
          </div>
          <div className="menu-item">
            <LocationOn className="icon" />
            <span className="text">Location</span>
          </div>
          <div className="menu-item">
            <Settings className="icon" />
            <span className="text">System Settings</span>
          </div>
          <div className="menu-item">
            <BarChart className="icon" />
            <span className="text">Generate Reports</span>
          </div>
          <div className="menu-item">
            <People className="icon" />
            <span className="text">User Management</span>
          </div>
          <div className="menu-item">
            <Build className="icon" />
            <span className="text">Trainers</span>
          </div>
          <div className="menu-item">
            <Group className="icon" />
            <span className="text">Trainees</span>
          </div>
          <div className="menu-item">
            <Inventory className="icon" />
            <span className="text">Collection</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
