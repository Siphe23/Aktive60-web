import React, { useState, useEffect } from "react";
import "../../../styles/AddNewLocationModal.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import QRCode from "qrcode"; // Import QRCode library

const AddNewLocationModal = ({ isOpen, onClose, onSave }) => {
  const [locationName, setLocationName] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [operatingHours, setOperatingHours] = useState({
    mondayFriday: { start: "", end: "" },
    saturday: { start: "", end: "" },
    sunday: { start: "", end: "" },
    publicHolidays: { start: "", end: "" },
  });
  const [equipment, setEquipment] = useState([]);
  const [equipmentName, setEquipmentName] = useState("");
  const [equipmentQuantity, setEquipmentQuantity] = useState(0);
  const [memberCapacity, setMemberCapacity] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [qrCode, setQRCode] = useState(""); // State for QR code

  // New state for packages
  const [packages, setPackages] = useState([]); // List of all packages from the database
  const [selectedPackages, setSelectedPackages] = useState([]); // Packages selected by the user

  // Fetch packages from Firestore on component mount
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
        console.error("Failed to fetch packages:", error);
      }
    };
    fetchPackages();
  }, []);

  // Handle package selection
  const handlePackageSelection = (packageId) => {
    const isSelected = selectedPackages.includes(packageId);
    if (isSelected) {
      // Remove package if already selected
      setSelectedPackages((prev) => prev.filter((id) => id !== packageId));
    } else {
      // Add package if not selected
      setSelectedPackages((prev) => [...prev, packageId]);
    }
  };

  // Handle removing a selected package
  const handleRemovePackage = (packageId) => {
    setSelectedPackages((prev) => prev.filter((id) => id !== packageId));
  };

  const handleAddEquipment = () => {
    if (equipmentName && equipmentQuantity > 0) {
      if (editingIndex !== null) {
        const updatedEquipment = [...equipment];
        updatedEquipment[editingIndex] = {
          name: equipmentName,
          quantity: equipmentQuantity,
        };
        setEquipment(updatedEquipment);
        setEditingIndex(null);
      } else {
        setEquipment([
          ...equipment,
          { name: equipmentName, quantity: equipmentQuantity },
        ]);
      }
      setEquipmentName("");
      setEquipmentQuantity(0);
    }
  };

  const handleEditEquipment = (index) => {
    const item = equipment[index];
    setEquipmentName(item.name);
    setEquipmentQuantity(item.quantity);
    setEditingIndex(index);
  };

  const handleDeleteEquipment = (index) => {
    const updatedEquipment = equipment.filter((_, i) => i !== index);
    setEquipment(updatedEquipment);
  };

  // Generate QR code with branch name and random number
  const generateQRCode = async () => {
    const randomNumber = Math.floor(Math.random() * 1000000); // Generate a random number
    const qrData = `${locationName}-${randomNumber}`; // Combine branch name and random number

    try {
      const qrCodeData = await QRCode.toDataURL(qrData);
      setQRCode(qrCodeData);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  // Function to clear the form
  const clearForm = () => {
    setLocationName("");
    setAddress("");
    setContactNumber("");
    setOperatingHours({
      mondayFriday: { start: "", end: "" },
      saturday: { start: "", end: "" },
      sunday: { start: "", end: "" },
      publicHolidays: { start: "", end: "" },
    });
    setEquipment([]);
    setEquipmentName("");
    setEquipmentQuantity(0);
    setMemberCapacity("");
    setSelectedPackages([]);
    setQRCode("");
  };

  const handleSave = () => {
    const newLocation = {
      locationName,
      address,
      contactNumber,
      operatingHours,
      equipment,
      memberCapacity,
      packages: selectedPackages,
      qrCode, // Include QR code in the saved data
    };
    onSave(newLocation);
    clearForm(); // Clear the form after saving
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
      <div className="top-content">
        <h2>Add New Location</h2>
        <p onClick={onClose}>X</p>
        </div>
        <div className="form-group">
          <label>Location Name</label>
          <input
            type="text"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            placeholder="Enter location name"
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter address"
          />
        </div>
        <div className="form-group">
          <label>Contact Number</label>
          <input
            type="text"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            placeholder="Enter contact number"
          />
        </div>

        <div className="form-group">
          <label>Operating Hours</label>
          <div className="operating-hours">
            <div>
              <label>Monday - Friday</label>
              <input
                type="time"
                value={operatingHours.mondayFriday.start}
                onChange={(e) =>
                  setOperatingHours({
                    ...operatingHours,
                    mondayFriday: {
                      ...operatingHours.mondayFriday,
                      start: e.target.value,
                    },
                  })
                }
              />
              <input
                type="time"
                value={operatingHours.mondayFriday.end}
                onChange={(e) =>
                  setOperatingHours({
                    ...operatingHours,
                    mondayFriday: {
                      ...operatingHours.mondayFriday,
                      end: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div>
              <label>Saturday</label>
              <input
                type="time"
                value={operatingHours.saturday.start}
                onChange={(e) =>
                  setOperatingHours({
                    ...operatingHours,
                    saturday: {
                      ...operatingHours.saturday,
                      start: e.target.value,
                    },
                  })
                }
              />
              <input
                type="time"
                value={operatingHours.saturday.end}
                onChange={(e) =>
                  setOperatingHours({
                    ...operatingHours,
                    saturday: {
                      ...operatingHours.saturday,
                      end: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div>
              <label>Sunday</label>
              <input
                type="time"
                value={operatingHours.sunday.start}
                onChange={(e) =>
                  setOperatingHours({
                    ...operatingHours,
                    sunday: { ...operatingHours.sunday, start: e.target.value },
                  })
                }
              />
              <input
                type="time"
                value={operatingHours.sunday.end}
                onChange={(e) =>
                  setOperatingHours({
                    ...operatingHours,
                    sunday: { ...operatingHours.sunday, end: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <label>Public Holidays</label>
              <input
                type="time"
                value={operatingHours.publicHolidays.start}
                onChange={(e) =>
                  setOperatingHours({
                    ...operatingHours,
                    publicHolidays: {
                      ...operatingHours.publicHolidays,
                      start: e.target.value,
                    },
                  })
                }
              />
              <input
                type="time"
                value={operatingHours.publicHolidays.end}
                onChange={(e) =>
                  setOperatingHours({
                    ...operatingHours,
                    publicHolidays: {
                      ...operatingHours.publicHolidays,
                      end: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Equipment</label>
          <div className="equipment-input">
            <input
              type="text"
              value={equipmentName}
              onChange={(e) => setEquipmentName(e.target.value)}
              placeholder="Enter equipment name"
            />
            <input
              type="number"
              value={equipmentQuantity}
              onChange={(e) =>
                setEquipmentQuantity(parseInt(e.target.value || 0))
              }
              placeholder="Quantity"
            />
            <button onClick={handleAddEquipment}>
              {editingIndex !== null ? "Update" : "Add"}
            </button>
          </div>
          <div className="equipment-list">
            {equipment.map((item, index) => (
              <div key={index} className="equipment-item">
                <span>{item.name}</span>
                <span>{item.quantity}</span>
                <div className="equipment-actions">
                  <button onClick={() => handleEditEquipment(index)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteEquipment(index)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* New Package Selection Field */}
        <div className="form-group">
          <label>Packages</label>
          <div className="package-selection">
            <select
              onChange={(e) => handlePackageSelection(e.target.value)}
              value=""
            >
              <option value="" disabled>
                Select a package
              </option>
              {packages.map((pkg) => (
                <option key={pkg.id} value={pkg.id}>
                  {pkg.packageName}
                </option>
              ))}
            </select>
          </div>
          <div className="selected-packages">
            {selectedPackages.map((packageId) => {
              const selectedPackage = packages.find((pkg) => pkg.id === packageId);
              return (
                <div key={packageId} className="selected-package-item">
                  <span>{selectedPackage?.packageName}</span>
                  <button onClick={() => handleRemovePackage(packageId)}>
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="form-group">
          <label>Member Capacity</label>
          <input
            type="number"
            value={memberCapacity}
            onChange={(e) => setMemberCapacity(parseInt(e.target.value || 0))}
            placeholder="Enter member capacity"
          />
        </div>

        {/* QR Code Field */}
        <div className="form-group">
          <label>QR Code</label>
          <button
            onClick={generateQRCode} // Call the updated function
            className="generate-qr-button"
          >
            Generate QR Code
          </button>
          {qrCode && <img src={qrCode} alt="QR Code" className="qr-code-image" />}
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

export default AddNewLocationModal;