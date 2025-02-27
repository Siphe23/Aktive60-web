import React from "react";
import { FaEdit, FaClock, FaUsers } from "react-icons/fa";
// Make sure the path to your CSS file is correct
import "../../styles/BranchDetails.css";

const BranchDetails = () => {
  return (
    <div className="branch-details">
      <div className="header">
        <div className="title-section">
          <h1>Sloane Street Gym</h1>
          <p>Manage your branch here</p>
        </div>
        <button className="edit-details-btn">
          <FaEdit /> Edit Details
        </button>
      </div>

      <div className="cards-row">
        {/* Basic Information Card */}
        <div className="info-card">
          <h2>Basic Information</h2> {/* Fixed typo: "Infomation" to "Information" */}
          <button className="icon-btn edit-btn">
            <FaEdit />
          </button>
          
          <div className="info-item">
            <p className="label">Location Name</p>
            <p className="value">Sloane Street Gym</p>
          </div>
          
          <div className="info-item">
            <p className="label">Address</p>
            <p className="value">22 Sloane St, Bryanston Johannesburg</p>
          </div>
          
          <div className="info-item">
            <p className="label">Contact Number</p>
            <p className="value">011 845 4774</p>
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
            <p className="hours">06:00 - 22:00</p>
          </div>
          
          <div className="hours-row">
            <p>Saturday</p>
            <p className="hours">06:00 - 22:00</p>
          </div>
          
          <div className="hours-row">
            <p>Sunday</p>
            <p className="hours">06:00 - 22:00</p>
          </div>
          
          <div className="hours-row">
            <p>Public Holidays</p>
            <p className="hours">06:00 - 22:00</p>
          </div>
        </div>
      </div>

      {/* Selected Packages Section */}
      <div className="packages-section">
        <h2>Selected Packages</h2>
        <div className="package-buttons">
          <button className="package-btn">
            ONE-ON-ONE SESSIONS
            <span className="toggle-icon">⊠</span>
          </button>
          <button className="package-btn">
            PERSONALISED MEAL PLANS & PROGRAMS
            <span className="toggle-icon">⊠</span>
          </button>
          <button className="package-btn">
            ONLINE HOURLY SESSIONS
            <span className="toggle-icon">⊠</span>
          </button>
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
            <h3 className="box-value">300</h3>
          </div>
          <div className="capacity-box">
            <p className="box-title">Current members</p>
            <h3 className="box-value">250</h3>
          </div>
          <div className="capacity-box">
            <p className="box-title">Available Slots</p>
            <h3 className="box-value">50</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchDetails;