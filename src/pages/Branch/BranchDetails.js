import React, { useEffect, useState } from "react";
import { FaEdit, FaClock, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../../styles/BranchDetails.css";

const BranchDetails = () => {
  const [branchData, setBranchData] = useState(null);

  // Fetch branch data on component mount
  useEffect(() => {
    // Example of API call to fetch branch details
    const fetchBranchData = async () => {
      try {
        const response = await fetch("/api/branch-details");
        const data = await response.json();
        setBranchData(data);
      } catch (error) {
        console.error("Error fetching branch data:", error);
      }
    };

    fetchBranchData();
  }, []);

  if (!branchData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="branch-container">
       <Link to="/edit" className="edit-button"><FaEdit /> Edit Details</Link>
      <h1 className="branch-title">{branchData.name}</h1>
      <p className="branch-subtitle">Manage your branch here</p>

      <div className="info-sections">
        <div className="info-box">
          <div className="info-header">
            <h3>Basic Information</h3>
            <FaEdit className="icon" />
          </div>
          <p><strong>Location Name:</strong> {branchData.name}</p>
          <p><strong>Address:</strong> {branchData.address}</p>
          <p><strong>Contact Number:</strong> {branchData.contact}</p>
        </div>

        <div className="info-box">
          <div className="info-header">
            <h3>Operating Hours</h3>
            <FaClock className="icon" />
          </div>
          <p><strong>Monday - Friday:</strong> {branchData.operatingHours.weekdays}</p>
          <p><strong>Saturday:</strong> {branchData.operatingHours.saturday}</p>
          <p><strong>Sunday:</strong> {branchData.operatingHours.sunday}</p>
          <p><strong>Public Holidays:</strong> {branchData.operatingHours.holidays}</p>
        </div>
      </div>

      <div className="capacity-section">
        <div className="capacity-header">
          <h3>Member Capacity</h3>
          <FaUsers className="icon" />
        </div>
        <div className="capacity-boxes">
          <div className="capacity-box"><strong>Total Capacity</strong><p>{branchData.capacity.total}</p></div>
          <div className="capacity-box"><strong>Current Members</strong><p>{branchData.capacity.current}</p></div>
          <div className="capacity-box"><strong>Available Slots</strong><p>{branchData.capacity.available}</p></div>
        </div>
      </div>

     
    </div>
  );
};

export default BranchDetails;
