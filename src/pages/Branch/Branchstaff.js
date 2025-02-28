import React, { useState } from 'react';
import "../../styles/Branchstaff.css";
import  BranchEditstaff from "../Branch/Packages/BranchEditstaff"; 
import SideBar from "../../components/Sidebar"

export default function Branchstaff() {
  const [size, setSize] = useState('medium'); // 'medium' is default, can be 'small'
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className={size}>
      <SideBar />  
      <div className="branch-staff-container">
        <div className="header">
          <div className="gym-info">
            <h1>Sloane Street Gym</h1>
            <p>Manage your branch here</p>
          </div>
          <button className="new-schedule-btn" onClick={handleOpenPopup}>
            <span className="plus-icon">+</span> New Schedule
          </button>
        </div>

        <div className="manager-card">
          <div className="staff-info">
            <h3>John Smith</h3>
            <p className="role">Manager</p>
          </div>
          <div className="time-info">
            <p>06:00 - 16:00</p>
          </div>
          <div className="status-indicator"></div>
          <div className="edit-icon">
            <span>✎</span>
          </div>
        </div>

        <div className="shifts-container">
          <div className="shift-card">
            <div className="shift-header">
              <h3>Morning Shift</h3>
              <p className="shift-time">06:00 - 12:00</p>
              <div className="status-indicator"></div>
            </div>
            <div className="staff-list">
              <div className="staff-member">
                <h4>Sarah Olson</h4>
                <p className="role">Trainer</p>
              </div>
              <div className="staff-member">
                <h4>Sarah Olson</h4>
                <p className="role">Assistant</p>
              </div>
            </div>
            <div className="edit-icon">
              <span>✎</span>
            </div>
          </div>

          <div className="shift-card">
            <div className="shift-header">
              <h3>Afternoon Shift</h3>
              <p className="shift-time">12:00 - 18:00</p>
              <div className="status-indicator"></div>
            </div>
            <div className="staff-list">
              <div className="staff-member">
                <h4>Oliver Jacobs</h4>
                <p className="role">Trainer</p>
              </div>
              <div className="staff-member">
                <h4>Sarah Olson</h4>
                <p className="role">Assistant</p>
              </div>
            </div>
            <div className="edit-icon">
              <span>✎</span>
            </div>
          </div>

          <div className="shift-card">
            <div className="shift-header">
              <h3>Evening Shift</h3>
              <p className="shift-time">18:00 - 00:00</p>
              <div className="status-indicator"></div>
            </div>
            <div className="staff-list">
              <div className="staff-member">
                <h4>Oliver Jacobs</h4>
                <p className="role">Trainer</p>
              </div>
              <div className="staff-member">
                <h4>Lisa Moeketsi</h4>
                <p className="role">Assistant</p>
              </div>
            </div>
            <div className="edit-icon">
              <span>✎</span>
            </div>
          </div>
        </div>

        <div className="calendar-section">
          <div className="calendar-header">
            <div className="calendar-icon">
              <span>📅</span>
            </div>
            <h2>Weekly Calendar</h2>
          </div>
          <div className="days-container">
            <div className="day-column">
              <p className="day-label">Mon</p>
              <div className="day-number">10</div>
            </div>
            <div className="day-column">
              <p className="day-label">Tus</p>
              <div className="day-number">11</div>
            </div>
            <div className="day-column">
              <p className="day-label">Wed</p>
              <div className="day-number">12</div>
            </div>
            <div className="day-column">
              <p className="day-label">Thurs</p>
              <div className="day-number">13</div>
            </div>
            <div className="day-column">
              <p className="day-label">Fri</p>
              <div className="day-number">14</div>
            </div>
            <div className="day-column">
              <p className="day-label">Sat</p>
              <div className="day-number">15</div>
            </div>
            <div className="day-column">
              <p className="day-label">Sun</p>
              <div className="day-number">16</div>
            </div>
          </div>
          <div className="view-button-container">
            <button className="view-button">View</button>
          </div>
        </div>
      </div>

      {/* Popup form */}
      {isPopupOpen && <BranchEditstaff onClose={handleClosePopup} />}
    </div>
  );
}