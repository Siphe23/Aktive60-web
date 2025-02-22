import React, { useState } from "react";
import "../../styles/LocationSettings.css";
import { FaEdit } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
import NavigationBar from "../../components/Navbar";

const LocationSettings = () => {
     const [isExpanded, setIsExpanded] = useState(false);
    
      const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
      };
    
  return (
    <div className="dashboard-container">
    <NavigationBar />
    <div className="main-content">
      <Sidebar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
      <div className={`content ${isExpanded ? "expanded" : "collapsed"}`}>
    <div className="location-settings">
      <h2>Location Settings</h2>
     
      <div className="package-container">
        <div className="package-content">
          <p className="sub">Package Offerings</p>
          <FaEdit className="edit-icon" />
        </div>
        <div className="package-list">
          <button className="package-item">
            <span>Basic Package</span>
          </button>
          <button className="package-item">
            <span>Premium Package</span>
          </button>
        </div>
      </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default LocationSettings;
