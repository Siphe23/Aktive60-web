import React, { useState } from "react";
import "../../styles/BranchPackages.css";

const BranchPackages = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="branch-packages">
      <h2>Branch Packages</h2>
      <div className="package-container">
        <h3>Package Offerings</h3>
        <div className="package-item">
          <input type="text" value="Basic Package" readOnly />
          <button onClick={() => setShowModal(true)}>&#9998;</button>
        </div>
        <div className="package-item">
          <input type="text" value="Premium Package" readOnly />
          <button onClick={() => setShowModal(true)}>&#9998;</button>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add new package</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="white" d="M12 10.586L6.707 5.293 5.293 6.707 10.586 12l-5.293 5.293 1.414 1.414L12 13.414l5.293 5.293 1.414-1.414L13.414 12l5.293-5.293-1.414-1.414z"/>
                </svg>
              </button>
            </div>

            <label>Package Type</label>
            <select className="error">
              <option>Select Package type or create one</option>
            </select>

            <label>Description</label>
            <textarea placeholder="Enter a description for your package" maxLength={50}></textarea>

            <label>Package Category</label>
            <select className="error">
              <option>Select a package category or create one</option>
            </select>

            <label>Facilities Included</label>
            <div className="checkbox-group">
              <label><input type="checkbox" /> Gym Access</label>
              <label><input type="checkbox" /> Spa</label>
              <label><input type="checkbox" /> Tennis</label>
              <label><input type="checkbox" /> Yoga Classes</label>
              <label><input type="checkbox" /> Swimming Pool</label>
            </div>

            <label>Booking Durations Allowed</label>
            <div className="checkbox-group">
              <label><input type="checkbox" /> 15</label>
              <label><input type="checkbox" /> 30</label>
              <label><input type="checkbox" /> 45</label>
              <label><input type="checkbox" /> 60</label>
            </div>

            <div className="button-group">
              <button className="save-btn">Save</button>
              <button className="clear-btn" onClick={() => setShowModal(false)}>Clear</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BranchPackages;
