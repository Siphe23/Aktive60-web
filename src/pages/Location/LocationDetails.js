import React, { useState } from "react";
import "../../styles/LocationDetails.css";
import Sidebar from "../../components/Sidebar";
import NavigationBar from "../../components/Navbar";
import AddNewLocationModal from "./AddNewLocationModal";
import { db, realTimeDB } from "../../firebase"; // Import Firestore and Realtime Database
import { ref, set } from "firebase/database";
import { collection, addDoc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LocationDetails = () => {
  const [selectedLocation, setSelectedLocation] = useState("Sloane Street Gym");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleSidebar = () => setIsExpanded(!isExpanded);
  const handleLocationChange = (event) => setSelectedLocation(event.target.value);

  const handleAddLocation = async (newLocation) => {
    try {
      // Save to Firestore
      console.log("Saving to Firestore...");
      const docRef = await addDoc(collection(db, "branches"), {
        branch_name: newLocation.locationName,
        location_address: newLocation.address,
        phone: newLocation.contactNumber,
        member_capacity: newLocation.memberCapacity,
        operating_hours: newLocation.operatingHours,
        equipment: newLocation.equipment,
      });
      console.log("Firestore Document written with ID: ", docRef.id);

      // Save to Realtime Database
      console.log("Saving to Realtime Database...");
      const branchRef = ref(realTimeDB, `branches/${docRef.id}`);
      await set(branchRef, {
        branch_name: newLocation.locationName,
        location_address: newLocation.address,
        phone: newLocation.contactNumber,
        member_capacity: newLocation.memberCapacity,
        operating_hours: newLocation.operatingHours,
        equipment: newLocation.equipment,
      });
      console.log("Realtime Database data saved successfully!");

      toast.success("Location saved successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Failed to save location. Please try again.");
    }
  };

  return (
    <div className="dashboard-container">
      <NavigationBar />
      <div className="main-content">
        <Sidebar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
        <div className={`content ${isExpanded ? "expanded" : "collapsed"}`}>
          <div className="container">
            {/* Header Section */}
            <div className="header">
              <select
                value={selectedLocation}
                onChange={handleLocationChange}
                className="location-select"
              >
                <option value="sloane-street">Sloane Street Gym</option>
              </select>
              <div className="header-buttons">
                <button
                  className="action-button"
                  onClick={() => setIsModalOpen(true)}
                >
                  Add New Location
                </button>
                <button className="action-button">Edit Details</button>
              </div>
            </div>

            {/* Card Grid */}
            <div className="card-grid">
              <div className="card">
                <h3>Basic Information</h3>
                <p><strong>Location Name:</strong> Sloane Street Gym</p>
                <p><strong>Address:</strong> 22 Sloane St, Bryanston, Johannesburg</p>
                <p><strong>Contact Number:</strong> 011 845 4774</p>
              </div>

              <div className="card">
                <h3>Operating Hours</h3>
                <p><strong>Monday - Friday:</strong> 06:00 - 22:00</p>
                <p><strong>Saturday:</strong> 06:00 - 22:00</p>
                <p><strong>Sunday:</strong> 08:00 - 22:00</p>
                <p><strong>Public Holidays:</strong> 06:00 - 22:00</p>
              </div>

              <div className="card">
                <h3>Staff Assignments</h3>
                <p>John Smith, Manager</p>
                <p>Sarah Olson, Trainer</p>
              </div>

              <div className="card">
                <h3>Member Capacity</h3>
                <p><strong>Total Capacity:</strong> 300</p>
                <p><strong>Current Members:</strong> 250</p>
                <p><strong>Available Slots:</strong> 50</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add New Location Modal */}
      <AddNewLocationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddLocation}
      />

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default LocationDetails;