import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar";
import NavigationBar from "../../../components/Navbar";
import "../../../styles/LocationOverview.css"; // Ensure this file contains the initial styles
import { db } from "../../../firebase"; // Adjust the path to your firebase.js file
import { collection, getDocs } from "firebase/firestore";

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
        const querySnapshot = await getDocs(collection(db, "branches")); // Ensure collection name is correct
        const locationsData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log("Document data:", data); // Debugging: Log each document's data
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
        setFilteredLocations(locationsData); // Initialize filteredLocations with all data
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err); // Debugging: Log any errors
        setError("Failed to fetch data. Please try again later.");
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = locations;

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((location) =>
        statusFilter === "active" ? location.active : !location.active
      );
    }

    // Filter by capacity
    if (capacityFilter) {
      filtered = filtered.filter(
        (location) => location.capacity === parseInt(capacityFilter)
      );
    }

    // Sort locations
    if (sortCriteria === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortCriteria === "capacity") {
      filtered.sort((a, b) => a.capacity - b.capacity);
    }

    setFilteredLocations(filtered);
  }, [statusFilter, capacityFilter, sortCriteria, locations]);

  const handleFilterClick = () => {
    setShowFilterModal(true);
  };

  const handleCloseModal = () => {
    setShowFilterModal(false);
  };

  const handleResetFilters = () => {
    setStatusFilter("all"); // Reset status filter
    setCapacityFilter(""); // Reset capacity filter
    setSortCriteria("name"); // Reset sort criteria
  };

  const handleApplyFilters = () => {
    setShowFilterModal(false); // Close modal after applying filters
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or message
  }

  if (error) {
    return <div>{error}</div>; // Show an error message
  }

  return (
    <div className="dashboard-container">
      <NavigationBar />
      <div className="main-content">
        <Sidebar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
        <div className={`content ${isExpanded ? "expanded" : "collapsed"}`}>
          <div className="container">
            <div className="header">
              <h2 className="title">Location Overview</h2>
              <button className="filter-btn" onClick={handleFilterClick}>
                Filter
              </button>
            </div>
            <table className="location-table">
              <thead>
                <tr>
                  <th>Location Name</th>
                  <th>Address</th>
                  <th>Capacity</th>
                </tr>
              </thead>
              <tbody>
                {filteredLocations.length > 0 ? (
                  filteredLocations.map((location) => (
                    <tr key={location.id}>
                      <td>{location.name}</td>
                      <td>{location.address}</td>
                      <td>{location.capacity}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" style={{ textAlign: "center" }}>
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
              <button
                className="cancel-button"
                onClick={handleResetFilters}
              >
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