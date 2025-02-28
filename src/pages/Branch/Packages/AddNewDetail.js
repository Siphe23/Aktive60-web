import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import "../../../styles/EditBranchPopup.css";

const EditBranchPopup = ({ isOpen, onClose, branchData, onSave }) => {
  const [formData, setFormData] = useState(branchData || {});

  useEffect(() => {
    if (branchData) {
      setFormData(branchData);
    }
  }, [branchData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleTimeChange = (day, type, value) => {
    setFormData({
      ...formData,
      operating_hours: {
        ...formData.operating_hours,
        [day]: {
          ...formData.operating_hours[day],
          [type]: value
        }
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="close-button" onClick={onClose}>
          <FaTimes />
        </button>
        <h2>Edit Branch Details</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Location Name</label>
            <input
              type="text"
              name="branch_name"
              value={formData.branch_name || ""}
              onChange={handleInputChange}
              placeholder="Enter branch name"
              className="dark-input"
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="location_address"
              value={formData.location_address || ""}
              onChange={handleInputChange}
              placeholder="Enter address"
              className="dark-input"
            />
          </div>

          <div className="form-group">
            <label>Contact Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone || ""}
              onChange={handleInputChange}
              placeholder="Enter contact number"
              className="dark-input"
            />
          </div>

          <div className="form-group">
            <label>Operating Hours (Monday - Friday)</label>
            <input
              type="time"
              value={formData.operating_hours?.mondayFriday?.start || ""}
              onChange={(e) => handleTimeChange("mondayFriday", "start", e.target.value)}
            />
            <input
              type="time"
              value={formData.operating_hours?.mondayFriday?.end || ""}
              onChange={(e) => handleTimeChange("mondayFriday", "end", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Member Capacity</label>
            <input
              type="number"
              name="member_capacity"
              value={formData.member_capacity || ""}
              onChange={handleInputChange}
              placeholder="Enter member capacity"
              className="dark-input"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="save-button">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBranchPopup;
