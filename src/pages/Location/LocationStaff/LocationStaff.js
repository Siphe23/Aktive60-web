import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import NavigationBar from "../../../components/Navbar";
import "../../../styles/LocationStaff.css";
import { FaPlus, FaEdit, FaCalendarAlt } from "react-icons/fa";

const LocationStaff = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="dashboard-container">
      <NavigationBar />
      <div className="main-content">
        <Sidebar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
        <div className={`content ${isExpanded ? "expanded" : "collapsed"}`}>
          <div className="staff-scheduling">
            <h2>Staff Scheduling</h2>
            <div className="location-selector">
              <label>Select location to view:</label>
              <button className="location-button">Sloane Street Gym ▼</button>
              <button className="new-schedule-button">
                <FaPlus /> New Schedule
              </button>
            </div>

            {/* Staff Schedule Cards */}
            <div className="schedule-container">
              <div className="schedule-card">
                <h4>John Smith</h4>
                <p>Manager</p>
                <span>06:00 - 16:00</span>
                <FaEdit className="edit-icon" />
              </div>

              <div className="shift-container">
                <div className="shift-card">
                  <h4>Morning Shift</h4>
                  <p>Sarah Olson - Trainer</p>
                  <p>Sarah Olson - Assistant</p>
                  <span>06:00 - 12:00</span>
                  <FaEdit className="edit-icon" />
                </div>
                <div className="shift-card">
                  <h4>Afternoon Shift</h4>
                  <p>Oliver Jacobs - Trainer</p>
                  <p>Sarah Olson - Assistant</p>
                  <span>12:00 - 18:00</span>
                  <FaEdit className="edit-icon" />
                </div>
                <div className="shift-card">
                  <h4>Evening Shift</h4>
                  <p>Oliver Jacobs - Trainer</p>
                  <p>Lisa Moeketsi - Assistant</p>
                  <span>18:00 - 00:00</span>
                  <FaEdit className="edit-icon" />
                </div>
              </div>
            </div>

            {/* Weekly Calendar */}
            <div className="weekly-calendar">
              <h4>
                <FaCalendarAlt /> Weekly Calendar
              </h4>
              <div className="week-days">
                <span>Mon 10</span>
                <span>Tues 11</span>
                <span>Wed 12</span>
                <span>Thurs 13</span>
                <span>Fri 14</span>
                <span>Sat 15</span>
                <span>Sun 16</span>
              </div>
              <button className="view-button">View</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationStaff;
