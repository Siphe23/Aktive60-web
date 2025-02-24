import React, { useState } from "react";
import "../../../styles/LocationSettings.css";
import { FaEdit } from "react-icons/fa";
import Sidebar from "../../../components/Sidebar";
import NavigationBar from "../../../components/Navbar";
import AddNewPackageModal from "./AddNewPackageModal";

const LocationSettings = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [packages, setPackages] = useState([]);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAddPackage = (newPackage) => {
    setPackages([...packages, newPackage]);
    setIsModalOpen(false);
  };

  return (
    <div className="dashboard-container">
      <NavigationBar />
      <div className="main-content">
        <Sidebar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
        <div className={`content ${isExpanded ? "expanded" : "collapsed"}`}>
          <div className="location-settings">
            {/* Header with Buttons */}
            <div className="header">
              <h2>Location Settings</h2>
            </div>

            {/* Package Offerings Section */}
            <div className="package-container">
              <div className="header-buttons">
                <button className="add-button" onClick={() => setIsModalOpen(true)}>
                  <span>Add Package</span>
                </button>
              </div>
              <div className="package-content">
                <p className="sub">Package Offerings</p>
                <FaEdit className="edit-icon" />
              </div>

              <div className="package-list">
                {packages.map((pkg, index) => (
                  <button key={index} className="package-item">
                    <span>{pkg.packageName}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddNewPackageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddPackage}
      />
    </div>
  );
};

export default LocationSettings;