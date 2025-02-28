import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { ref, set } from "firebase/database";
import { db, realTimeDB } from "../../firebase"; // Adjust the path to your firebase.js file
import "../../styles/LocationStaff.css";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewScheduleModal = ({ isOpen, onClose, selectedBranch }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
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
          }));

          // Filter out users with the role "client" (if needed)
          const filteredEmployees = employeesData.filter(
            (emp) => emp.role !== "client"
          );

          setEmployees(filteredEmployees);
          console.log("Fetched employees:", filteredEmployees); // Debugging
        } catch (error) {
          console.error("Error fetching data:", error);
          toast.error("Failed to fetch employees. Please try again.");
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [isOpen]);

  const handleAddSchedule = () => {
    setSchedules([...schedules, { employeeId: "", shiftTime: "", role: "" }]);
  };

  const handleScheduleChange = (index, field, value) => {
    const updatedSchedules = [...schedules];
    updatedSchedules[index][field] = value;

    // If the employee is changed, map the role
    if (field === "employeeId") {
      const selectedEmployee = employees.find((emp) => emp.id === value);
      if (selectedEmployee) {
        updatedSchedules[index].role = selectedEmployee.role;
      }
    }

    setSchedules(updatedSchedules);
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
      // Prepare the schedule data
      const scheduleData = {
        branch: selectedBranch,
        startDate,
        endDate,
        schedules: schedules.map((schedule) => ({
          employeeId: schedule.employeeId,
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
        <h2>New Schedule</h2>
        <div className="form-group">
          <label>Date Range</label>
          <div className="date-range">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <table className="schedule-table">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Shift Time</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule, index) => {
              const selectedEmployee = employees.find(
                (emp) => emp.id === schedule.employeeId
              );
              return (
                <tr key={index}>
                  <td>
                    <select
                      value={schedule.employeeId}
                      onChange={(e) =>
                        handleScheduleChange(index, "employeeId", e.target.value)
                      }
                    >
                      <option value="">Select an employee</option>
                      {employees.map((employee) => (
                        <option key={employee.id} value={employee.id}>
                          {employee.fullName} {/* Use the correct field name */}
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
                    >
                      <option value="06:00-12:00">06:00-12:00</option>
                      <option value="12:00-18:00">12:00-18:00</option>
                      <option value="18:00-00:00">18:00-00:00</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={schedule.role}
                      readOnly
                    />
                  </td>
                  <td>
                    <FaTimes
                      className="delete-icon"
                      onClick={() => handleRemoveSchedule(index)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <button className="add-schedule-button" onClick={handleAddSchedule}>
          Add Schedule
        </button>

        <div className="modal-buttons">
          <button className="clear-button" onClick={onClose}>
            Clear
          </button>
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewScheduleModal;