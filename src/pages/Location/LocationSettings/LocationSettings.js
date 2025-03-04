import React, { useState, useEffect } from "react";
import "../../../styles/LocationSettings.css";
import { FaEdit } from "react-icons/fa";
import Sidebar from "../../../components/Sidebar";
import NavigationBar from "../../../components/Navbar";
import AddNewPackageModal from "./AddNewPackageModal";
import { ref, push, onValue, update } from "firebase/database"; // Add `update` for Realtime Database
import { collection, addDoc, getDocs, doc, updateDoc } from "firebase/firestore"; // Add `doc` and `updateDoc` for Firestore
import { realTimeDB, db } from "../../../firebase";
import { toast } from "react-toastify";

const LocationSettings = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null); // Track the package being edited

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const packagesCollection = collection(db, "packages");
        const packagesSnapshot = await getDocs(packagesCollection);
        const packagesList = packagesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPackages(packagesList);
      } catch (error) {
        toast.error("Failed to fetch packages. Please try again.");
      }
    };
    fetchPackages();
  }, []);

  const handleAddPackage = async (newPackage) => {
    try {
      const packagesCollection = collection(db, "packages");
      const docRef = await addDoc(packagesCollection, newPackage);
      const packagesRef = ref(realTimeDB, "packages");
      push(packagesRef, newPackage);
      setPackages([...packages, { id: docRef.id, ...newPackage }]);
      setIsModalOpen(false);
      toast.success("Package added successfully!");
    } catch (error) {
      toast.error("Failed to add package. Please try again.");
    }
  };

  const handleEditPackage = (pkg) => {
    setSelectedPackage(pkg); // Set the package to be edited
    setIsModalOpen(true); // Open the modal
  };

  const handleUpdatePackage = async (updatedPackage) => {
    try {
      // Update Firestore
      const packageDocRef = doc(db, "packages", selectedPackage.id);
      await updateDoc(packageDocRef, updatedPackage);

      // Update Realtime Database (if needed)
      const packageRef = ref(realTimeDB, `packages/${selectedPackage.id}`);
      await update(packageRef, updatedPackage);

      // Update local state
      setPackages((prev) =>
        prev.map((pkg) =>
          pkg.id === selectedPackage.id ? { ...pkg, ...updatedPackage } : pkg
        )
      );

      setIsModalOpen(false);
      setSelectedPackage(null);
      toast.success("Package updated successfully!");
    } catch (error) {
      toast.error("Failed to update package. Please try again.");
    }
  };

  return (
    <div className="dashboard-container">
      <NavigationBar />
      <div className="main-content">
        <Sidebar isExpanded={isExpanded} toggleSidebar={() => setIsExpanded(!isExpanded)} />
        <div className={`content ${isExpanded ? "expanded" : "collapsed"}`}>
          <div className="location-settings">
            <div className="header-container">
              <h1>Packages</h1>
              <button className="add-button" onClick={() => setIsModalOpen(true)}>+ Add Package</button>
            </div>
            
            <h2 className="sub-title">Package Offerings</h2>
            <div className="package-grid">
              {packages.map((pkg) => (
                <div key={pkg.id} className="package-card">
                  <FaEdit className="edit-icon" onClick={() => handleEditPackage(pkg)} />
                  <h5>{pkg.packageName}</h5>
                  <p><strong>Category:</strong> {pkg.packageCategory}</p>
                  <p><strong>Description:</strong> {pkg.description}</p>
                  <p><strong>Facilities:</strong> {Object.keys(pkg.facilities || {}).filter(f => pkg.facilities[f]).join(", ")}</p>
                  <p><strong>Booking Window:</strong> {pkg.bookingWindow}</p>
                  <p><strong>Booking Durations:</strong> {Object.keys(pkg.bookingDurations || {}).filter(d => pkg.bookingDurations[d]).join(", ")} minutes</p>
                  <p><strong>Max Members:</strong> {pkg.maxMembersPerPackage}</p>
                  <p><strong>Max Bookings per Member:</strong> {pkg.maxBookingsPerMember}</p>
                  <p><strong>Pricing Structure:</strong> {pkg.pricingStructure}</p>
                  <p><strong>Trainer Required:</strong> {pkg.trainerAssignmentRequired ? "Yes" : "No"}</p>
                  <p><strong>Cancellation Policy:</strong> {pkg.cancellationPolicy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <AddNewPackageModal
        isOpen={isModalOpen}
        
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPackage(null); // Reset selected package when modal closes
        }}
        onSave={selectedPackage ? handleUpdatePackage : handleAddPackage} // Use update or add function
        initialData={selectedPackage} // Pass the selected package data to the modal
      />
    </div>
  );
};

export default LocationSettings;