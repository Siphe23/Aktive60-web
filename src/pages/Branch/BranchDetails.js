import React, { useState, useEffect } from "react";
import { FaEdit, FaClock, FaUsers } from "react-icons/fa";
import "../../styles/BranchDetails.css";
import { realTimeDB } from "../../firebase"; 
import { ref, onValue, update } from "firebase/database"; 
import "../../styles/BranchDetails.css";
import EditBranchPopup from "../Branch/Packages/AddNewDetail";

const BranchDetails = () => {
  const [branch, setBranch] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const branchId = "MCBT5Gm9VN0GZVYKuMuP"; 

  useEffect(() => {
    const branchRef = ref(realTimeDB, `branches/${branchId}`);

    onValue(branchRef, (snapshot) => {
      if (snapshot.exists()) {
        setBranch(snapshot.val());
      } else {
        console.log("No data found!");
      }
    }, (error) => {
      console.error("Error fetching branch data:", error);
    });

  }, []);

  // Open popup
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  // Close popup
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  // Save updated branch details to Firebase
  const handleSave = (updatedData) => {
    const branchRef = ref(realTimeDB, `branches/${branchId}`);
    
    update(branchRef, updatedData)
      .then(() => {
        console.log("Branch details updated successfully!");
        setBranch(updatedData); // Update local state to reflect changes
      })
      .catch((error) => {
        console.error("Error updating branch details:", error);
      });

    closePopup(); 
  };

  return (
    <div className="branch-details">
      <div className="header">
        <div className="title-section">
          <h1>{branch?.branch_name || "Branch Name"}</h1>
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
            <p className="value">{branch?.branch_name || "N/A"}</p>
          </div>
          <div className="info-item">
            <p className="label">Address</p>
            <p className="value">{branch?.location_address || "N/A"}</p>
          </div>
          <div className="info-item">
            <p className="label">Contact Number</p>
            <p className="value">{branch?.phone || "N/A"}</p>
          </div>
        </div>
        <div className="info-card">
  <h2>Operating Hours</h2>
  <button className="icon-btn clock-btn">
    <FaClock />
  </button>
  
  <div className="hours-row">
    <p>Monday - Friday</p>
    <p className="hours">{branch?.operating_hours?.mondayFriday?.start || "N/A"} - {branch?.operating_hours?.mondayFriday?.end || "N/A"}</p>
  </div>
  
  <div className="hours-row">
    <p>Saturday</p>
    <p className="hours">{branch?.operating_hours?.saturday?.start || "N/A"} - {branch?.operating_hours?.saturday?.end || "N/A"}</p>
  </div>
  
  <div className="hours-row">
    <p>Sunday</p>
    <p className="hours">{branch?.operating_hours?.sunday?.start || "N/A"} - {branch?.operating_hours?.sunday?.end || "N/A"}</p>
  </div>
  
  <div className="hours-row">
    <p>Public Holidays</p>
    <p className="hours">{branch?.operating_hours?.publicHolidays?.start || "N/A"} - {branch?.operating_hours?.publicHolidays?.end || "N/A"}</p>
  </div>
</div>
      </div>

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
<div className="capacity-section">
  <h2>Member Capacity</h2>
  <button className="icon-btn users-btn">
    <FaUsers />
  </button>
  
  <div className="capacity-boxes">
    <div className="capacity-box">
      <p className="box-title">Total Capacity</p>
      <h3 className="box-value">{branch?.member_capacity || "N/A"}</h3>
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


      {/* Edit Branch Popup */}
      <EditBranchPopup 
        isOpen={isPopupOpen} 
        onClose={closePopup} 
        branchData={branch}
        onSave={handleSave}
      />
    </div>
  );
};

export default BranchDetails;
