import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar";
import NavigationBar from "../../../components/Navbar";
import "../../../styles/LocationStaff.css";
import { FaPlus, FaEdit, FaCalendarAlt } from "react-icons/fa";
import NewScheduleModal from "./NewScheduleModal";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LocationStaff = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [schedules, setSchedules] = useState([]);
  const [managerInfo, setManagerInfo] = useState({ fullName: "No Manager", time: "N/A" }); // State for manager name and time

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const openModal = () => {
    if (!selectedBranch && branches.length > 0) {
      setSelectedBranch(branches[0].name);
      toast.info(`Default branch selected: ${branches[0].name}`);
    } else if (!selectedBranch) {
      toast.error("Please add a branch before creating a schedule.");
      return;
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Fetch branches from Firebase on component mount
  useEffect(() => {
    const fetchBranches = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "branches"));
        const branchesData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          branchesData.push({
            id: doc.id,
            name: data.branch_name, // Assuming the field is named `branch_name`
          });
        });
        setBranches(branchesData);

        if (branchesData.length > 0) {
          setSelectedBranch(branchesData[0].name);
        }
      } catch (error) {
        console.error("Error fetching branches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, []);

  // Fetch schedules and manager info when the selected branch changes
  useEffect(() => {
    if (selectedBranch) {
      const fetchSchedulesAndManager = async () => {
        setLoading(true);
        try {
          // Fetch schedules
          const schedulesSnapshot = await getDocs(collection(db, "schedules"));
          const schedulesData = [];
          let managerId = null;
          let inTime = null;
          let outTime = null;

          schedulesSnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.branch === selectedBranch) {
              schedulesData.push({
                id: doc.id,
                ...data,
              });
              // Use the first schedule's managerId, inTime, and outTime
              if (!managerId) {
                managerId = data.managerId;
                inTime = data.inTime;
                outTime = data.outTime;
              }
            }
          });
          setSchedules(schedulesData);

          // Fetch manager's full name if managerId exists
          if (managerId) {
            const managerDocRef = doc(db, "users", managerId);
            const managerDoc = await getDoc(managerDocRef);
            if (managerDoc.exists()) {
              const managerFullName = managerDoc.data().fullName;
              setManagerInfo({
                fullName: managerFullName,
                time: `${inTime} - ${outTime}`,
              });
            } else {
              setManagerInfo({ fullName: "Manager Not Found", time: "N/A" });
            }
          } else {
            setManagerInfo({ fullName: "No Manager", time: "N/A" });
          }
        } catch (error) {
          console.error("Error fetching schedules or manager:", error);
          setManagerInfo({ fullName: "Error", time: "N/A" });
        } finally {
          setLoading(false);
        }
      };

      fetchSchedulesAndManager();
    }
  }, [selectedBranch]);

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };

  // Filter schedules by shift time
  const filterSchedulesByShift = (shiftTime) => {
    return schedules.filter((schedule) =>
      schedule.schedules?.some((s) => s.shiftTime === shiftTime)
    );
  };

  return (
    <div className="dashboard-container">
      <NavigationBar />
      <div className="main-content">
        <Sidebar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
        <div className={`content ${isExpanded ? "expanded" : "collapsed"}`}>
          <div className="staff-scheduling">
            <div className="header">
              <h2>Staff Scheduling</h2>
              <button onClick={openModal}>
                <FaPlus /> New Schedule
              </button>
            </div>
            <div className="location-selector">
              <label>Select location to view:</label>
              <select
                className="location-select"
                value={selectedBranch}
                onChange={handleBranchChange}
                disabled={loading}
              >
                <option value="">Select a branch</option>
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.name}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Staff Schedule Cards */}
            <div className="schedule-container">
              <div className="schedule-card">
                <h4>{managerInfo.fullName}</h4>
                <p>Manager</p>
                <span>{managerInfo.time}</span>
                <FaEdit className="edit-icon" />
              </div>

              {/* Morning Shift */}
              <div className="shift-container">
                <div className="shift-card">
                  <h4>Morning Shift</h4>
                  {filterSchedulesByShift("06:00-12:00").length > 0 ? (
                    filterSchedulesByShift("06:00-12:00").map((schedule) =>
                      schedule.schedules
                        .filter((s) => s.shiftTime === "06:00-12:00")
                        .map((s, index) => (
                          <div key={index}>
                            <p>
                              {s.employeeName} - {s.role}
                            </p>
                          </div>
                        ))
                    )
                  ) : (
                    <p>No schedule loaded for Morning Shift.</p>
                  )}
                  <span>06:00 - 12:00</span>
                  <FaEdit className="edit-icon" />
                </div>

                {/* Afternoon Shift */}
                <div className="shift-card">
                  <h4>Afternoon Shift</h4>
                  {filterSchedulesByShift("12:00-18:00").length > 0 ? (
                    filterSchedulesByShift("12:00-18:00").map((schedule) =>
                      schedule.schedules
                        .filter((s) => s.shiftTime === "12:00-18:00")
                        .map((s, index) => (
                          <div key={index}>
                            <p>
                              {s.employeeName} - {s.role}
                            </p>
                          </div>
                        ))
                    )
                  ) : (
                    <p>No schedule loaded for Afternoon Shift.</p>
                  )}
                  <span>12:00 - 18:00</span>
                  <FaEdit className="edit-icon" />
                </div>

                {/* Evening Shift */}
                <div className="shift-card">
                  <h4>Evening Shift</h4>
                  {filterSchedulesByShift("18:00-00:00").length > 0 ? (
                    filterSchedulesByShift("18:00-00:00").map((schedule) =>
                      schedule.schedules
                        .filter((s) => s.shiftTime === "18:00-00:00")
                        .map((s, index) => (
                          <div key={index}>
                            <p>
                              {s.employeeName} - {s.role}
                            </p>
                          </div>
                        ))
                    )
                  ) : (
                    <p>No schedule loaded for Evening Shift.</p>
                  )}
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

      <NewScheduleModal
        isOpen={isModalOpen}
        onClose={closeModal}
        selectedBranch={selectedBranch}
      />
    </div>
  );
};

export default LocationStaff;