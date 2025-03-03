import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar";
import NavigationBar from "../../../components/Navbar";
import "../../../styles/LocationOverview.css";
import "../../../App.css";
import { realTimeDB, db } from "../../../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { ref, update } from "firebase/database";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LocationOverview = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [capacityFilter, setCapacityFilter] = useState("");
  const [sortCriteria, setSortCriteria] = useState("name");

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  // Fetch data from Firebase
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "branches"));
        const locationsData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          locationsData.push({
            id: doc.id,
            name: data.branch_name,
            address: data.location_address,
            capacity: data.member_capacity,
            equipment: data.equipment,
            operatingHours: data.operating_hours,
            phone: data.phone,
            active: data.active === "yes",
          });
        });
        setLocations(locationsData);
        setFilteredLocations(locationsData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data. Please try again later.");
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = locations;

    if (statusFilter !== "all") {
      filtered = filtered.filter((location) =>
        statusFilter === "active" ? location.active : !location.active
      );
    }

    if (capacityFilter) {
      filtered = filtered.filter(
        (location) => location.capacity === parseInt(capacityFilter)
      );
    }

    if (sortCriteria === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortCriteria === "capacity") {
      filtered.sort((a, b) => a.capacity - b.capacity);
    }

    setFilteredLocations(filtered);
  }, [statusFilter, capacityFilter, sortCriteria, locations]);

  // Function to toggle status (active/inactive)
  const toggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      const locationRef = doc(db, "branches", id);

      // Update Firestore
      await updateDoc(locationRef, {
        active: newStatus ? "yes" : "no",
      });

      // Update Realtime Database
      const realTimeLocationRef = ref(realTimeDB, `branches/${id}`);
      await update(realTimeLocationRef, {
        active: newStatus ? "yes" : "no",
      });

      // Update local state
      setLocations((prevLocations) =>
        prevLocations.map((location) =>
          location.id === id ? { ...location, active: newStatus } : location
        )
      );

      toast.success(
        `Location ${newStatus ? "activated" : "deactivated"} successfully!`
      );
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status. Please try again.");
    }
  };

  const handleFilterClick = () => {
    setShowFilterModal(true);
  };

  const handleCloseModal = () => {
    setShowFilterModal(false);
  };

  const handleResetFilters = () => {
    setStatusFilter("all");
    setCapacityFilter("");
    setSortCriteria("name");
  };

  const handleApplyFilters = () => {
    setShowFilterModal(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="dashboard-container">
      <NavigationBar />
      <div className="main-content">
        <Sidebar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
        <div className={`content ${isExpanded ? "expanded" : "collapsed"}`}>
          <div className="container">
            <div className="header">
              <h2>Location Overview</h2>
              <button onClick={handleFilterClick}>Filter</button>
            </div>
            <table className="location-table">
              <thead>
                <tr>
                  <th>Location Name</th>
                  <th>Address</th>
                  <th>Capacity</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredLocations.length > 0 ? (
                  filteredLocations.map((location) => (
                    <tr key={location.id}>
                      <td>{location.name}</td>
                      <td>{location.address}</td>
                      <td>{location.capacity}</td>
                      <td>
                        {location.active ? (
                          <span className="status-active">Active</span>
                        ) : (
                          <span className="status-inactive">Inactive</span>
                        )}
                      </td>
                      <td>
                        <button
                          className={`status-button ${
                            location.active ? "deactivate" : "activate"
                          }`}
                          onClick={() =>
                            toggleStatus(location.id, location.active)
                          }
                        >
                          {location.active ? "Deactivate" : "Activate"}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center" }}>
                      No data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Filter Locations</h2>
            <div className="form-group">
              <label>Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="deactivated">Deactivated</option>
              </select>
            </div>
            <div className="form-group">
              <label>Capacity</label>
              <select
                value={capacityFilter}
                onChange={(e) => setCapacityFilter(e.target.value)}
              >
                <option value="">All</option>
                {Array.from(new Set(locations.map((loc) => loc.capacity))).map(
                  (capacity) => (
                    <option key={capacity} value={capacity}>
                      {capacity}
                    </option>
                  )
                )}
              </select>
            </div>
            <div className="form-group">
              <label>Sort By</label>
              <select
                value={sortCriteria}
                onChange={(e) => setSortCriteria(e.target.value)}
              >
                <option value="name">Name (A-Z)</option>
                <option value="capacity">Capacity (Low to High)</option>
              </select>
            </div>
            <div className="modal-buttons">
              <button className="cancel-button" onClick={handleResetFilters}>
                Reset
              </button>
              <button className="save-button" onClick={handleApplyFilters}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationOverview;
