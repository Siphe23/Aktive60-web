import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc, doc, getDoc } from "firebase/firestore";
import { ref, set } from "firebase/database";
import { db, realTimeDB } from "../../../firebase";
import "../../../styles/LocationStaffModal.css";
import { FaTimes, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewScheduleModal = ({ isOpen, onClose, selectedBranch }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [managerId, setManagerId] = useState(""); // Manager ID from users table
  const [inTime, setInTime] = useState(""); // Working Hours In Time (separate state, not tied to schedules)
  const [outTime, setOutTime] = useState(""); // Working Hours Out Time (separate state, not tied to schedules)
  const [employees, setEmployees] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch employees from Firebase
  useEffect(() => {
    if (isOpen) {
      const fetchData = async () => {
        setLoading(true);
        try {
          // Fetch employees
          const employeesSnapshot = await getDocs(collection(db, "users"));
          const employeesData = employeesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })).filter((emp) => emp.role !== "client");

          setEmployees(employeesData);
        } catch (error) {
          console.error("Error fetching data:", error);
          toast.error("Failed to fetch data. Please try again.");
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [isOpen]);

  const handleScheduleChange = (index, field, value) => {
    const updatedSchedules = [...schedules];

    // Ensure the schedule row exists before updating
    if (!updatedSchedules[index]) {
      updatedSchedules[index] = { employeeId: "", shiftTime: "", role: "" };
    }

    updatedSchedules[index][field] = value;

    // If the employee is changed, map the role and name from the users table
    if (field === "employeeId") {
      const selectedEmployee = employees.find((emp) => emp.id === value);
      if (selectedEmployee) {
        updatedSchedules[index].role = selectedEmployee.role || "Staff";
        updatedSchedules[index].employeeName = selectedEmployee.fullName; // Explicitly map employeeName from users table
      } else {
        updatedSchedules[index].employeeName = "Unknown";
        updatedSchedules[index].role = "Staff"; // Default role if employee not found
      }
    }

    setSchedules(updatedSchedules);
  };

  const handleAddSchedule = () => {
    // Add a new empty schedule row
    setSchedules([...schedules, { employeeId: "", shiftTime: "", role: "" }]);
  };

  const handleRemoveSchedule = (index) => {
    const updatedSchedules = schedules.filter((_, i) => i !== index);
    setSchedules(updatedSchedules);
  };

  const handleSave = async () => {
    if (!selectedBranch) {
      toast.error("Please select a branch before saving the schedule.");
      return;
    }

    if (schedules.length === 0) {
      toast.error("Please add at least one schedule before saving.");
      return;
    }

    try {
      // Validate manager exists
      if (managerId) {
        const managerDocRef = doc(db, "users", managerId);
        const managerDoc = await getDoc(managerDocRef);
        if (!managerDoc.exists()) {
          toast.error("Selected manager does not exist. Please select a valid manager.");
          return;
        }
      }

      // Validate each employee in schedules exists
      for (const schedule of schedules) {
        if (schedule.employeeId) {
          const employeeDocRef = doc(db, "users", schedule.employeeId);
          const employeeDoc = await getDoc(employeeDocRef);
          if (!employeeDoc.exists()) {
            toast.error(`Employee ${schedule.employeeId} does not exist. Please select a valid employee.`);
            return;
          }
        }
      }

      // Prepare the schedule data
      const scheduleData = {
        branch: selectedBranch,
        startDate,
        endDate,
        managerId, // Store manager ID from users table
        inTime, // Include working hours in the schedule data
        outTime, // Include working hours in the schedule data
        schedules: schedules.map((schedule) => ({
          employeeId: schedule.employeeId, // Store employee ID to map to users table
          employeeName: employees.find((emp) => emp.id === schedule.employeeId)?.fullName || "Unknown",
          shiftTime: schedule.shiftTime,
          role: schedule.role,
        })),
      };

      // Save to Firestore
      const docRef = await addDoc(collection(db, "schedules"), scheduleData);

      // Save to Realtime Database
      const realTimeRef = ref(realTimeDB, `schedules/${docRef.id}`);
      await set(realTimeRef, scheduleData);

      // Show success toast
      toast.success("Schedule saved successfully!");
      onClose();
    } catch (error) {
      console.error("Error saving schedule:", error);
      toast.error("Failed to save schedule. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">New Schedule</h2>
          <FaTimes className="close-icon" onClick={onClose} />
        </div>

        <div className="form-group">
          <label>Location</label>
        </div>

        <div className="form-group">
          <label>Date Range:</label>
          <div className="date-range">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="date-input"
            />
            <span className="date-separator">-</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="date-input"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Manager Assignment</label>
        </div>

        <div className="form-group">
          <label>Manager Name:</label>
          <select
            value={managerId}
            onChange={(e) => setManagerId(e.target.value)}
            className="manager-select"
          >
            <option value="">Select Manager</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.fullName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Working Hours:</label>
          <div className="working-hours">
            <input
              type="time"
              value={inTime}
              onChange={(e) => setInTime(e.target.value)}
              className="time-input-field"
            />
            <input
              type="time"
              value={outTime}
              onChange={(e) => setOutTime(e.target.value)}
              className="time-input-field"
            />
          </div>
        </div>

        <table className="schedule-table">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Shift Time</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule, index) => (
              <tr key={index}>
                <td>
                  <select
                    value={schedule.employeeId}
                    onChange={(e) =>
                      handleScheduleChange(index, "employeeId", e.target.value)
                    }
                    className="employee-select"
                  >
                    <option value="">Select an employee</option>
                    {employees.map((employee) => (
                      <option key={employee.id} value={employee.id}>
                        {employee.fullName}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    value={schedule.shiftTime}
                    onChange={(e) =>
                      handleScheduleChange(index, "shiftTime", e.target.value)
                    }
                    className="shift-select"
                  >
                    <option value="">Select Shift</option>
                    <option value="06:00-12:00">06:00 - 12:00</option>
                    <option value="12:00-18:00">12:00 - 18:00</option>
                    <option value="18:00-00:00">18:00 - 00:00</option>
                  </select>
                </td>
                <td>
                  <select
                    value={schedule.role}
                    onChange={(e) =>
                      handleScheduleChange(index, "role", e.target.value)
                    }
                    className="role-select"
                  >
                    <option value="">Select Role</option>
                    <option value="Staff">Staff</option>
                    <option value="Assistant">Assistant</option>
                    <option value="Trainer">Trainer</option>
                    <option value="Supervisor">Supervisor</option>
                  </select>
                </td>
                <td>
                  <FaTimes
                    className="delete-icon"
                    onClick={() => handleRemoveSchedule(index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="add-schedule-button" onClick={handleAddSchedule}>
          Add Schedule
        </button>

        <div className="modal-buttons">
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
          <button className="clear-button" onClick={onClose}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewScheduleModal;