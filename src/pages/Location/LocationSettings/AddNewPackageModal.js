import React, { useState } from "react";
import "../../../styles/AddNewPackageModal.css";

const AddNewPackageModal = ({ isOpen, onClose, onSave }) => {
  const [packageName, setPackageName] = useState("");
  const [description, setDescription] = useState("");
  const [packageCategory, setPackageCategory] = useState("");
  const [facilities, setFacilities] = useState({
    gymAccess: false,
    spa: false,
    tennis: false,
    yogaClasses: false,
    swimmingPool: false,
    other: false,
    squashCourt: false,
  });
  const [bookingWindow, setBookingWindow] = useState("30");
  const [bookingDurations, setBookingDurations] = useState({
    IS: false,
    30: false,
    45: false,
    60: false,
  });
  const [maxBookingsPerMember, setMaxBookingsPerMember] = useState(4);
  const [pricingStructure, setPricingStructure] = useState("");
  const [trainerAssignmentRequired, setTrainerAssignmentRequired] = useState(false);
  const [maxMembersPerPackage, setMaxMembersPerPackage] = useState(20);
  const [cancellationPolicy, setCancellationPolicy] = useState("");

  const handleFacilitiesChange = (e) => {
    const { name, checked } = e.target;
    setFacilities((prev) => ({ ...prev, [name]: checked }));
  };

  const handleBookingDurationsChange = (e) => {
    const { name, checked } = e.target;
    setBookingDurations((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSave = () => {
    const newPackage = {
      packageName,
      description,
      packageCategory,
      facilities,
      bookingWindow,
      bookingDurations,
      maxBookingsPerMember,
      pricingStructure,
      trainerAssignmentRequired,
      maxMembersPerPackage,
      cancellationPolicy,
    };
    onSave(newPackage);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Package</h2>
        <div className="form-group">
          <label>Package Name</label>
          <input
            type="text"
            value={packageName}
            onChange={(e) => setPackageName(e.target.value)}
            placeholder="Enter package name"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
          />
        </div>
        <div className="form-group">
          <label>Package Category</label>
          <input
            type="text"
            value={packageCategory}
            onChange={(e) => setPackageCategory(e.target.value)}
            placeholder="Select a package category or create"
          />
        </div>
        <div className="form-group">
          <label>Facilities Included</label>
          <div className="facilities-checkbox">
            {Object.keys(facilities).map((facility) => (
              <label key={facility}>
                <input
                  type="checkbox"
                  name={facility}
                  checked={facilities[facility]}
                  onChange={handleFacilitiesChange}
                />
                {facility}
              </label>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label>Booking Window</label>
          <select
            value={bookingWindow}
            onChange={(e) => setBookingWindow(e.target.value)}
          >
            <option value="30">30 days in advance</option>
            {/* Add more options if needed */}
          </select>
        </div>
        <div className="form-group">
          <label>Booking Durations Allowed</label>
          <div className="durations-checkbox">
            {Object.keys(bookingDurations).map((duration) => (
              <label key={duration}>
                <input
                  type="checkbox"
                  name={duration}
                  checked={bookingDurations[duration]}
                  onChange={handleBookingDurationsChange}
                />
                {duration}
              </label>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label>Max Bookings per Member</label>
          <input
            type="number"
            value={maxBookingsPerMember}
            onChange={(e) => setMaxBookingsPerMember(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Pricing Structure</label>
          <input
            type="text"
            value={pricingStructure}
            onChange={(e) => setPricingStructure(e.target.value)}
            placeholder="Enter pricing structure"
          />
        </div>
        <div className="form-group">
          <label>Trainer Assignment Required?</label>
          <input
            type="checkbox"
            checked={trainerAssignmentRequired}
            onChange={(e) => setTrainerAssignmentRequired(e.target.checked)}
          />
        </div>
        <div className="form-group">
          <label>Max Members per Package</label>
          <input
            type="number"
            value={maxMembersPerPackage}
            onChange={(e) => setMaxMembersPerPackage(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Cancellation Policy</label>
          <textarea
            value={cancellationPolicy}
            onChange={(e) => setCancellationPolicy(e.target.value)}
            placeholder="Enter cancellation policy"
          />
        </div>
        <div className="modal-buttons">
          <button className="cancel-button" onClick={onClose}>
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

export default AddNewPackageModal;