import React, { useState, useEffect } from "react";
import "../../../styles/AddNewPackageModal.css";
import { toast } from "react-toastify";

const AddNewPackageModal = ({ isOpen, onClose, onSave, initialData }) => {
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
  });
  const [otherFacility, setOtherFacility] = useState("");
  const [bookingWindow, setBookingWindow] = useState("");
  const [bookingDurations, setBookingDurations] = useState({
    15: false,
    30: false,
    45: false,
    60: false,
  });
  const [maxBookingsPerMember, setMaxBookingsPerMember] = useState("");
  const [pricingStructure, setPricingStructure] = useState("");
  const [trainerAssignmentRequired, setTrainerAssignmentRequired] = useState(false);
  const [maxMembersPerPackage, setMaxMembersPerPackage] = useState("");
  const [cancellationPolicy, setCancellationPolicy] = useState("");

  // Pre-fill the form if in edit mode
  useEffect(() => {
    if (initialData) {
      setPackageName(initialData.packageName);
      setDescription(initialData.description);
      setPackageCategory(initialData.packageCategory);
      setFacilities(initialData.facilities);
      setOtherFacility(initialData.facilities.otherFacility || "");
      setBookingWindow(initialData.bookingWindow);
      setBookingDurations(initialData.bookingDurations);
      setMaxBookingsPerMember(initialData.maxBookingsPerMember);
      setPricingStructure(initialData.pricingStructure);
      setTrainerAssignmentRequired(initialData.trainerAssignmentRequired);
      setMaxMembersPerPackage(initialData.maxMembersPerPackage);
      setCancellationPolicy(initialData.cancellationPolicy);
    }
  }, [initialData]);

  const handleFacilitiesChange = (e) => {
    const { name, checked } = e.target;
    setFacilities((prev) => ({ ...prev, [name]: checked }));
  };

  const handleBookingDurationsChange = (e) => {
    const { name, checked } = e.target;
    setBookingDurations((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSave = () => {
    if (!packageName || !description || !packageCategory) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const newPackage = {
      packageName,
      description,
      packageCategory,
      facilities: { ...facilities, otherFacility },
      bookingWindow,
      bookingDurations,
      maxBookingsPerMember,
      pricingStructure,
      trainerAssignmentRequired,
      maxMembersPerPackage,
      cancellationPolicy,
    };
    onSave(newPackage); // Pass the new/updated package to the parent component
    onClose();
  };

  const handleClear = () => {
    setPackageName("");
    setDescription("");
    setPackageCategory("");
    setFacilities({
      gymAccess: false,
      spa: false,
      tennis: false,
      yogaClasses: false,
      swimmingPool: false,
      other: false,
    });
    setOtherFacility("");
    setBookingWindow("");
    setBookingDurations({
      15: false,
      30: false,
      45: false,
      60: false,
    });
    setMaxBookingsPerMember("");
    setPricingStructure("");
    setTrainerAssignmentRequired(false);
    setMaxMembersPerPackage("");
    setCancellationPolicy("");
    toast.info("Form cleared.");
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{initialData ? "Edit Package" : "Create Package"}</h2>
        <div className="form-group">
          <label>Package Name</label>
          <input type="text" value={packageName} onChange={(e) => setPackageName(e.target.value)} placeholder="Enter package name" />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter a description for your package" maxLength={50} />
        </div>
        <div className="form-group">
          <label>Package Category</label>
          <input type="text" value={packageCategory} onChange={(e) => setPackageCategory(e.target.value)} placeholder="Enter package category" />
        </div>
        <div className="form-group">
          <label>Facilities Included</label>
          {Object.keys(facilities).map((facility) => (
            <label key={facility}>
              <input type="checkbox" name={facility} checked={facilities[facility]} onChange={handleFacilitiesChange} />
              {facility.charAt(0).toUpperCase() + facility.slice(1)}
            </label>
          ))}
          {facilities.other && <input type="text" placeholder="e.g. Squash court" value={otherFacility} onChange={(e) => setOtherFacility(e.target.value)} />}
        </div>
        <div className="form-group">
          <label>Booking Window</label>
          <input type="text" value={bookingWindow} onChange={(e) => setBookingWindow(e.target.value)} placeholder="e.g. 30 days in advance" />
        </div>
        <div className="form-group">
          <label>Booking Durations Allowed</label>
          {Object.keys(bookingDurations).map((duration) => (
            <label key={duration}>
              <input type="checkbox" name={duration} checked={bookingDurations[duration]} onChange={handleBookingDurationsChange} />
              {duration} minutes
            </label>
          ))}
        </div>
        <div className="form-group">
          <label>Max Bookings per Member</label>
          <input type="number" value={maxBookingsPerMember} onChange={(e) => setMaxBookingsPerMember(e.target.value)} placeholder="e.g. 4" />
        </div>
        <div className="form-group">
          <label>Pricing Structure</label>
          <input type="text" value={pricingStructure} onChange={(e) => setPricingStructure(e.target.value)} placeholder="e.g R150 p/m" />
        </div>
        <div className="form-group">
          <label>
            <input type="checkbox" checked={trainerAssignmentRequired} onChange={(e) => setTrainerAssignmentRequired(e.target.checked)} />
            Trainer Assignment Required?
          </label>
        </div>
        <div className="form-group">
          <label>Max Members per Package</label>
          <input type="number" value={maxMembersPerPackage} onChange={(e) => setMaxMembersPerPackage(e.target.value)} placeholder="e.g 20" />
        </div>
        <div className="form-group">
          <label>Cancellation Policy</label>
          <textarea value={cancellationPolicy} onChange={(e) => setCancellationPolicy(e.target.value)} placeholder="Enter a cancellation policy for this package" maxLength={50} />
        </div>
     
        <div className="modal-buttons">
          <button className="cancel-button" onClick={handleClear}>Clear</button>
          <button className="save-button" onClick={handleSave}>{initialData ? "Update" : "Save"}</button>
        </div>
      </div>
    </div>
  );
};

export default AddNewPackageModal;