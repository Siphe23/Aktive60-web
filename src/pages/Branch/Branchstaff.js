import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase"; // Adjust the path to match your Firebase setup
import "../../styles/Branchstaff.css";
import NewScheduleModal from "./NewScheduleModal"; // Import modal

export default function Branchstaff() {
  const [size, setSize] = useState('medium'); // Default size
  const [schedules, setSchedules] = useState([]); // Store staff schedules
  const [loading, setLoading] = useState(true); // Loading state
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  // Fetch schedules from Firestore
  useEffect(() => {
    const fetchSchedules = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "schedules"));
        const schedulesData = [];
        querySnapshot.forEach((doc) => {
          schedulesData.push({ id: doc.id, ...doc.data() });
        });
        setSchedules(schedulesData);
      } catch (error) {
        console.error("Error fetching schedules:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  // Function to filter schedules by shift time
  const filterSchedulesByShift = (shiftTime) => {
    return schedules.filter(schedule => 
      schedule.schedules && schedule.schedules.some(s => s.shiftTime === shiftTime)
    );
  };

  return (
    <div className={size}>
      <div className="branch-staff-container">
        <div className="header">
          <div className="gym-info">
            <h1>Sloane Street Gym</h1>
            <p>Manage your branch here</p>
          </div>
          <button className="new-schedule-btn" onClick={() => setIsModalOpen(true)}>
            <span className="plus-icon">+</span> New Schedule
          </button>
        </div>

        {/* Schedule modal */}
        <NewScheduleModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          selectedBranch="Sloane Street Gym" // Pass selected branch
        />

        {/* Your existing schedule UI */}
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
          {/* Morning Shift */}
          <div className="shift-card">
            <div className="shift-header">
              <h3>Morning Shift</h3>
              <p className="shift-time">06:00 - 12:00</p>
              <div className="status-indicator"></div>
            </div>
            <div className="staff-list">
              {filterSchedulesByShift("06:00-12:00").length > 0 ? (
                filterSchedulesByShift("06:00-12:00").map(schedule =>
                  schedule.schedules.map((s, index) => (
                    s.shiftTime === "06:00-12:00" && (
                      <div key={index} className="staff-member">
                        <h4>{s.employeeName}</h4>
                        <p className="role">{s.role}</p>
                      </div>
                    )
                  ))
                )
              ) : (
                <p className="empty-message">No trainees assigned.</p>
              )}
            </div>
            <div className="edit-icon">
              <span>✎</span>
            </div>
          </div>

          {/* Afternoon Shift */}
          <div className="shift-card">
            <div className="shift-header">
              <h3>Afternoon Shift</h3>
              <p className="shift-time">12:00 - 18:00</p>
              <div className="status-indicator"></div>
            </div>
            <div className="staff-list">
              {filterSchedulesByShift("12:00-18:00").length > 0 ? (
                filterSchedulesByShift("12:00-18:00").map(schedule =>
                  schedule.schedules.map((s, index) => (
                    s.shiftTime === "12:00-18:00" && (
                      <div key={index} className="staff-member">
                        <h4>{s.employeeName}</h4>
                        <p className="role">{s.role}</p>
                      </div>
                    )
                  ))
                )
              ) : (
                <p className="empty-message">No trainees assigned.</p>
              )}
            </div>
            <div className="edit-icon">
              <span>✎</span>
            </div>
          </div>

          {/* Evening Shift */}
          <div className="shift-card">
            <div className="shift-header">
              <h3>Evening Shift</h3>
              <p className="shift-time">18:00 - 00:00</p>
              <div className="status-indicator"></div>
            </div>
            <div className="staff-list">
              {filterSchedulesByShift("18:00-00:00").length > 0 ? (
                filterSchedulesByShift("18:00-00:00").map(schedule =>
                  schedule.schedules.map((s, index) => (
                    s.shiftTime === "18:00-00:00" && (
                      <div key={index} className="staff-member">
                        <h4>{s.employeeName}</h4>
                        <p className="role">{s.role}</p>
                      </div>
                    )
                  ))
                )
              ) : (
                <p className="empty-message">No trainees assigned.</p>
              )}
            </div>
            <div className="edit-icon">
              <span>✎</span>
            </div>
          </div>
        </div>

        {/* Weekly Calendar */}
        <div className="calendar-section">
          <div className="calendar-header">
            <div className="calendar-icon">
              <span>📅</span>
            </div>
            <h2>Weekly Calendar</h2>
          </div>
          <div className="days-container">
            {["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"].map((day, index) => (
              <div key={index} className="day-column">
                <p className="day-label">{day}</p>
                <div className="day-number">{10 + index}</div>
              </div>
            ))}
          </div>
          <div className="view-button-container">
            <button className="view-button">View</button>
          </div>
          {/* More shifts can go here */}
        </div>
      </div>
    </div>
  );
}
