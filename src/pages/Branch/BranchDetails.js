import React, { useState } from "react";
import { FaTimes, FaClock } from "react-icons/fa";
import "../../styles/BranchDetails.css";

const BranchDetails = () => {
  const [showModal, setShowModal] = useState(false);
  const [branch, setBranch] = useState({
    location: "Sloane Street Gym",
    address: "22 Sloane St, Bryanston Johannesburg",
    contact: "011 845 4774",
    capacity: "300",
    packages: ["ONE-ON-ONE SESSIONS"],
    hours: {
      weekday: { open: "00:00", close: "00:00" },
      saturday: { open: "00:00", close: "00:00" },
      sunday: { open: "00:00", close: "00:00" },
      holidays: { open: "00:00", close: "00:00" },
    },
  });

  const togglePackage = (pkg) => {
    setBranch((prev) => ({
      ...prev,
      packages: prev.packages.includes(pkg)
        ? prev.packages.filter((p) => p !== pkg)
        : [...prev.packages, pkg],
    }));
  };

  return (
    <div>
      <button className="edit-button" onClick={() => setShowModal(true)}>
        Edit Branch Details
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Edit Branch Details</h3>
              <button className="close-modal" onClick={() => setShowModal(false)}>
                <FaTimes />
              </button>
            </div>

            <label>Location Name</label>
            <input type="text" value={branch.location} disabled />

            <label>Address</label>
            <input type="text" value={branch.address} disabled />

            <label>Contact Number</label>
            <input type="text" value={branch.contact} disabled />

            <label>Operating Hours</label>
            {Object.entries(branch.hours).map(([day, time]) => (
              <div className="time-row" key={day}>
                <span>{day.replace(/\b\w/g, (c) => c.toUpperCase())}</span>
                <div>
                  <FaClock />
                  <input type="time" value={time.open} />
                  -
                  <FaClock />
                  <input type="time" value={time.close} />
                </div>
              </div>
            ))}

            <label>Packages</label>
            {[
              "ONE-ON-ONE SESSIONS",
              "PERSONALISED MEAL PLANS & PROGRAMS",
              "GROUP SESSIONS",
              "ONLINE HOURLY SESSIONS",
            ].map((pkg) => (
              <div key={pkg} className="checkbox-row">
                <input
                  type="checkbox"
                  checked={branch.packages.includes(pkg)}
                  onChange={() => togglePackage(pkg)}
                />
                <span>{pkg}</span>
              </div>
            ))}

            <label>Member Capacity</label>
            <input type="number" value={branch.capacity} />

            <div className="modal-footer">
              <button className="save-button">Save</button>
              <button className="clear-button" onClick={() => setShowModal(false)}>
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BranchDetails;
