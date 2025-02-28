import React, { useState } from 'react';
import "../../../styles/BranchEditstaff.css";

export default function BranchEditstaff({ onClose }) {
  const [staffList, setStaffList] = useState([
    { id: 1, name: 'Sarah Olson', timeRange: '06:00 - 12:00', role: 'Trainer' },
    { id: 2, name: 'Oliver Jacobs', timeRange: '12:00 - 18:00', role: 'Trainer' },
    { id: 3, name: 'Lisa Moeketsi', timeRange: '18:00 - 00:00', role: 'Trainer' }
  ]);
  
  // Form state for adding new staff
  const [newStaffName, setNewStaffName] = useState('');
  const [newTimeRange, setNewTimeRange] = useState({start: '', end: ''});
  const [newRole, setNewRole] = useState('Trainer');

  const handleSave = () => {
    // Save logic would go here
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-form">
        <div className="popup-header">
          <h2>Location</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="date-range">
          <label>Date range</label>
          <div className="date-input-group">
            <input type="date" className="date-input" />
            <span>—</span>
            <input type="date" className="date-input" />
          </div>
        </div>
        
        <div className="staff-table-container">
          <table className="staff-table">
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Shift time</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {staffList.map(staff => (
                <tr key={staff.id}>
                  <td>{staff.name}</td>
                  <td>{staff.timeRange}</td>
                  <td>{staff.role}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="edit-action">✏️</button>
                      <button className="delete-action">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
              <tr className="new-entry-row">
                <td>
                  <input 
                    type="text" 
                    placeholder="Employee name"
                    value={newStaffName}
                    onChange={(e) => setNewStaffName(e.target.value)}
                  />
                </td>
                <td>
                  <div className="time-range-input">
                    <input 
                      type="time" 
                      value={newTimeRange.start}
                      onChange={(e) => setNewTimeRange({...newTimeRange, start: e.target.value})}
                    />
                    <span>-</span>
                    <input 
                      type="time"
                      value={newTimeRange.end}
                      onChange={(e) => setNewTimeRange({...newTimeRange, end: e.target.value})}
                    />
                  </div>
                </td>
                <td>
                  <select 
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                  >
                    <option value="Trainer">Trainer</option>
                    <option value="Assistant">Assistant</option>
                    <option value="Manager">Manager</option>
                  </select>
                </td>
                <td>
                  <button className="add-action">+</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="popup-actions">
          <button className="save-btn" onClick={handleSave}>Save</button>
          <button className="clear-btn" onClick={onClose}>Clear</button>
        </div>
      </div>
    </div>
  );
}