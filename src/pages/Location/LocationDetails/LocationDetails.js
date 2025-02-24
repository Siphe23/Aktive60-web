import React, { useState, useEffect } from "react";
import "../../../styles/LocationDetails.css";
import Sidebar from "../../../components/Sidebar";
import NavigationBar from "../../../components/Navbar";
import AddNewLocationModal from "./AddNewLocationModal";
import EditLocationModal from "./EditLocationModal";
import { db, realTimeDB } from "../../../firebase"; // Import Firestore and Realtime Database
import { ref, set, onValue } from "firebase/database";
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LocationDetails = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [branchData, setBranchData] = useState(null);
  const [branches, setBranches] = useState([]);

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  const handleLocationChange = async (event) => {
    const selectedBranchId = event.target.value;
    setSelectedLocation(selectedBranchId);
  };

  useEffect(() => {
    const unsubscribeFirestore = onSnapshot(collection(db, "branches"), (querySnapshot) => {
      const branchesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBranches(branchesList);

      // Automatically select the first branch if available
      if (branchesList.length > 0 && !selectedLocation) {
        setSelectedLocation(branchesList[0].id);
      }
    });

    return () => unsubscribeFirestore();
  }, [selectedLocation]);

  useEffect(() => {
    let unsubscribeRealtimeDB;

    if (selectedLocation) {
      const branchRef = ref(realTimeDB, `branches/${selectedLocation}`);
      unsubscribeRealtimeDB = onValue(branchRef, (snapshot) => {
        const realTimeData = snapshot.val();
        setBranchData(realTimeData);
      });
    }

    return () => {
      if (unsubscribeRealtimeDB) {
        unsubscribeRealtimeDB();
      }
    };
  }, [selectedLocation]);

  const handleAddLocation = async (newLocation) => {
    try {
      // Save to Firestore
      const docRef = await addDoc(collection(db, "branches"), {
        branch_name: newLocation.locationName,
        location_address: newLocation.address,
        phone: newLocation.contactNumber,
        member_capacity: newLocation.memberCapacity,
        operating_hours: newLocation.operatingHours,
        equipment: newLocation.equipment,
      });

      // Save to Realtime Database
      const branchRef = ref(realTimeDB, `branches/${docRef.id}`);
      await set(branchRef, {
        branch_name: newLocation.locationName,
        location_address: newLocation.address,
        phone: newLocation.contactNumber,
        member_capacity: newLocation.memberCapacity,
        operating_hours: newLocation.operatingHours,
        equipment: newLocation.equipment,
      });

      toast.success("Location saved successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Failed to save location. Please try again.");
    }
  };

  const handleUpdateLocation = async (updatedLocation) => {
    try {
      // Update Firestore
      const branchRef = doc(db, "branches", selectedLocation);
      await updateDoc(branchRef, {
        branch_name: updatedLocation.locationName,
        location_address: updatedLocation.address,
        phone: updatedLocation.contactNumber,
        member_capacity: updatedLocation.memberCapacity,
        operating_hours: updatedLocation.operatingHours,
        equipment: updatedLocation.equipment,
      });

      // Update Realtime Database
      const realTimeBranchRef = ref(realTimeDB, `branches/${selectedLocation}`);
      await set(realTimeBranchRef, {
        branch_name: updatedLocation.locationName,
        location_address: updatedLocation.address,
        phone: updatedLocation.contactNumber,
        member_capacity: updatedLocation.memberCapacity,
        operating_hours: updatedLocation.operatingHours,
        equipment: updatedLocation.equipment,
      });

      toast.success("Location updated successfully!");
    } catch (error) {
      console.error("Error updating location: ", error);
      toast.error("Failed to update location. Please try again.");
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
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.branch_name}
                  </option>
                ))}
              </select>
              <div className="header-buttons">
                <button
                  className="action-button"
                  onClick={() => setIsModalOpen(true)}
                >
                  Add New Location
                </button>
                <button
                  className="action-button"
                  onClick={() => setIsEditModalOpen(true)}
                >
                  Edit Details
                </button>
              </div>
            </div>

            {/* Card Grid */}
            <div className="card-grid">
              <div className="card">
                <h3>Basic Information</h3>
                {branchData ? (
                  <>
                    <p>
                      <strong>Location Name:</strong> {branchData.branch_name}
                    </p>
                    <p>
                      <strong>Address:</strong> {branchData.location_address}
                    </p>
                    <p>
                      <strong>Contact Number:</strong> {branchData.phone}
                    </p>
                  </>
                ) : (
                  <p>Loading...</p>
                )}
              </div>

              <div className="card">
                <h3>Operating Hours</h3>
                {branchData ? (
                  <>
                    <p>
                      <strong>Monday - Friday:</strong> 06:00 - 22:00
                    </p>
                    <p>
                      <strong>Saturday:</strong>{" "}
                      {branchData.operating_hours?.saturday?.start} -{" "}
                      {branchData.operating_hours?.saturday?.end}
                    </p>
                    <p>
                      <strong>Sunday:</strong>{" "}
                      {branchData.operating_hours?.sunday?.start} -{" "}
                      {branchData.operating_hours?.sunday?.end}
                    </p>
                    <p>
                      <strong>Public Holidays:</strong>{" "}
                      {branchData.operating_hours?.publicHolidays?.start} -{" "}
                      {branchData.operating_hours?.publicHolidays?.end}
                    </p>
                  </>
                ) : (
                  <p>Loading...</p>
                )}
              </div>

              <div className="card">
                <h3>Staff Assignments</h3>
                <p>John Smith, Manager</p>
                <p>Sarah Olson, Trainer</p>
              </div>

              <div className="card">
                <h3>Member Capacity</h3>
                {branchData ? (
                  <>
                    <p>
                      <strong>Total Capacity:</strong>{" "}
                      {branchData.member_capacity}
                    </p>
                    <p>
                      <strong>Current Members:</strong> 250
                    </p>
                    <p>
                      <strong>Available Slots:</strong>{" "}
                      {branchData.member_capacity - 250}
                    </p>
                  </>
                ) : (
                  <p>Loading...</p>
                )}
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

      {/* Edit Location Modal */}
      <EditLocationModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleUpdateLocation}
        branchData={branchData}
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
