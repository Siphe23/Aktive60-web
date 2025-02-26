import React, { useEffect, useState } from "react";
import { FaEdit, FaClock, FaUsers, FaPlus, FaSave, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../../styles/BranchDetails.css";

const BranchDetails = () => {
  const [branchData, setBranchData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [shifts, setShifts] = useState([
    { id: 1, name: "Sarah Olson", time: "08:00 - 12:00", role: "Trainer" },
    { id: 2, name: "Oliver Jacobs", time: "12:00 - 18:00", role: "Trainer" },
    { id: 3, name: "Lisa Meeketsi", time: "18:00 - 00:00", role: "Trainer" },
  ]);

  useEffect(() => {
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
      <Link to="/edit" className="edit-button">
        <FaEdit /> Edit Details
      </Link>
      <h1 className="branch-title">{branchData.name}</h1>
      <p className="branch-subtitle">Manage your branch here</p>

      {/* Button to open the modal */}
      <button className="add-shift-button" onClick={() => setShowModal(true)}>
        <FaPlus /> Add Shift
      </button>

      {/* Shift Management Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Shift Management</h3>
              <button className="close-modal" onClick={() => setShowModal(false)}>
                <FaTimes />
              </button>
            </div>

            <table className="shift-table">
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Shift Time</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {shifts.map((shift) => (
                  <tr key={shift.id}>
                    <td>{shift.name}</td>
                    <td>{shift.time}</td>
                    <td>
                      <select defaultValue={shift.role}>
                        <option value="Trainer">Trainer</option>
                        <option value="Manager">Manager</option>
                        <option value="Staff">Staff</option>
                      </select>
                    </td>
                    <td>
                      <FaEdit className="icon-action" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="modal-footer">
              <button className="save-button">
                <FaSave /> Save
              </button>
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
