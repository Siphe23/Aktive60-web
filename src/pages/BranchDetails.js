
import React from "react";
import { FaEdit, FaClock, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/BranchDetails.css"; 

const BranchDetails = () => {
  return (
    <div className="branch-container">
      <h1 className="branch-title">Sloane Street Gym</h1>
      <p className="branch-subtitle">Manage your branch here</p>
      
      <div className="info-sections">
        <div className="info-box">
          <div className="info-header">
            <h3>Basic Information</h3>
            <FaEdit className="icon" />
          </div>
          <p><strong>Location Name:</strong> Sloane Street Gym</p>
          <p><strong>Address:</strong> 22 Sloane St, Bryanston Johannesburg</p>
          <p><strong>Contact Number:</strong> 011 845 4774</p>
        </div>
        
        <div className="info-box">
          <div className="info-header">
            <h3>Operating Hours</h3>
            <FaClock className="icon" />
          </div>
          <p><strong>Monday - Friday:</strong> 06:00 - 22:00</p>
          <p><strong>Saturday:</strong> 06:00 - 22:00</p>
          <p><strong>Sunday:</strong> 06:00 - 22:00</p>
          <p><strong>Public Holidays:</strong> 06:00 - 22:00</p>
        </div>
      </div>
      
      <div className="capacity-section">
        <div className="capacity-header">
          <h3>Member Capacity</h3>
          <FaUsers className="icon" />
        </div>
        <div className="capacity-boxes">
          <div className="capacity-box"><strong>Total Capacity</strong><p>300</p></div>
          <div className="capacity-box"><strong>Current Members</strong><p>250</p></div>
          <div className="capacity-box"><strong>Available Slots</strong><p>50</p></div>
        </div>
      </div>
      
      <Link to="/edit" className="edit-button"><FaEdit /> Edit Details</Link>
    </div>
  );
};

export default BranchDetails;