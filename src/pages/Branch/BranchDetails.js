import React, { useState } from "react";
import { FaEdit, FaClock, FaUsers } from "react-icons/fa";
import EditBranchPopup from "../Branch/Packages/AddNewDetail"; 
import "../../styles/BranchDetails.css";
import NavBar from "../../components/Navbar";
const BranchDetails = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [branchData, setBranchData] = useState({
    locationName: "Sloane Street Gym",
    address: "22 Sloane St, Bryanston Johannesburg",
    contactNumber: "011 845 4774",
    operatingHours: {
      mondayFriday: { open: "06:00", close: "22:00" },
      saturday: { open: "06:00", close: "22:00" },
      sunday: { open: "06:00", close: "22:00" },
      publicHolidays: { open: "06:00", close: "22:00" }
    },
    packages: {
      oneOnOneSessions: true,
      personalisedMealPlans: true,
      groupSessions: false,
      onlineHourlySessions: true
    },
    memberCapacity: 300
  });

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSaveBranchData = (updatedData) => {
    setBranchData(updatedData);
  };

  return (
    
    <div className="branch-details">
        <NavBar/>
    
      <div className="header">
        <div className="title-section">
          <h1>{branchData.locationName}</h1>
          <p>Manage your branch here</p>
        </div>
        <button className="edit-details-btn" onClick={openPopup}>
          <FaEdit /> Edit Details
        </button>
      </div>

      <div className="cards-row">
        {/* Basic Information Card */}
        <div className="info-card">
          <h2>Basic Information</h2>
          <button className="icon-btn edit-btn" onClick={openPopup}>
            <FaEdit />
          </button>
          
          <div className="info-item">
            <p className="label">Location Name</p>
            <p className="value">{branchData.locationName}</p>
          </div>
          
          <div className="info-item">
            <p className="label">Address</p>
            <p className="value">{branchData.address}</p>
          </div>
          
          <div className="info-item">
            <p className="label">Contact Number</p>
            <p className="value">{branchData.contactNumber}</p>
          </div>
        </div>

        {/* Operating Hours Card */}
        <div className="info-card">
          <h2>Operating Hours</h2>
          <button className="icon-btn clock-btn">
            <FaClock />
          </button>
          
          <div className="hours-row">
            <p>Monday - Friday</p>
            <p className="hours">{branchData.operatingHours.mondayFriday.open} - {branchData.operatingHours.mondayFriday.close}</p>
          </div>
          
          <div className="hours-row">
            <p>Saturday</p>
            <p className="hours">{branchData.operatingHours.saturday.open} - {branchData.operatingHours.saturday.close}</p>
          </div>
          
          <div className="hours-row">
            <p>Sunday</p>
            <p className="hours">{branchData.operatingHours.sunday.open} - {branchData.operatingHours.sunday.close}</p>
          </div>
          
          <div className="hours-row">
            <p>Public Holidays</p>
            <p className="hours">{branchData.operatingHours.publicHolidays.open} - {branchData.operatingHours.publicHolidays.close}</p>
          </div>
        </div>
      </div>

      {/* Selected Packages Section */}
      <div className="packages-section">
        <h2>Selected Packages</h2>
        <div className="package-buttons">
          {branchData.packages.oneOnOneSessions && (
            <button className="package-btn">
              ONE-ON-ONE SESSIONS
              <span className="toggle-icon">⊠</span>
            </button>
          )}
          {branchData.packages.personalisedMealPlans && (
            <button className="package-btn">
              PERSONALISED MEAL PLANS & PROGRAMS
              <span className="toggle-icon">⊠</span>
            </button>
          )}
          {branchData.packages.groupSessions && (
            <button className="package-btn">
              GROUP SESSIONS
              <span className="toggle-icon">⊠</span>
            </button>
          )}
          {branchData.packages.onlineHourlySessions && (
            <button className="package-btn">
              ONLINE HOURLY SESSIONS
              <span className="toggle-icon">⊠</span>
            </button>
          )}
        </div>
      </div>

      {/* Member Capacity Section */}
      <div className="capacity-section">
        <h2>Member Capacity</h2>
        <button className="icon-btn users-btn">
          <FaUsers />
        </button>
        
        <div className="capacity-boxes">
          <div className="capacity-box">
            <p className="box-title">Total Capacity</p>
            <h3 className="box-value">{branchData.memberCapacity}</h3>
          </div>
          <div className="capacity-box">
            <p className="box-title">Current members</p>
            <h3 className="box-value">250</h3>
          </div>
          <div className="capacity-box">
            <p className="box-title">Available Slots</p>
            <h3 className="box-value">{branchData.memberCapacity - 250}</h3>
          </div>
        </div>
      </div>

      {/* Edit Branch Popup */}
      <EditBranchPopup 
        isOpen={isPopupOpen} 
        onClose={closePopup}
        branchData={branchData}
        onSave={handleSaveBranchData}
      />
    </div>
  );
};

export default BranchDetails;