import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const PackageEditPopup = ({ isOpen, onClose, packageData = null }) => {
  const [packageName, setPackageName] = useState(packageData?.title || "");
  const [description, setDescription] = useState("");
  const [bookingOptions, setBookingOptions] = useState("1D");
  const [packageType, setPackageType] = useState("");
  const [includeOptions, setIncludeOptions] = useState({
    gymAccess: true,
    spa: false,
    sauna: false,
    yogaClasses: false,
    swimmingPool: false,
    other: false
  });
  const [otherText, setOtherText] = useState("");
  const [bookingDuration, setBookingDuration] = useState("");
  const [maxBookings, setMaxBookings] = useState("");
  const [pricingStructure, setPricingStructure] = useState("single");
  const [tutorAssignment, setTutorAssignment] = useState(false);
  const [packageAvailability, setPackageAvailability] = useState(false);
  const [maxMembers, setMaxMembers] = useState("");
  const [commission, setCommission] = useState("");

  const handleIncludeOptionChange = (option) => {
    setIncludeOptions({
      ...includeOptions,
      [option]: !includeOptions[option]
    });
  };

  if (!isOpen) return null;

  return (
    <div className="package-popup-overlay">
      <div className="package-popup-container">
        <div className="package-popup-header">
          <h2>Create / Edit Package Offerings</h2>
          <button className="package-close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        
        <div className="package-popup-content">
          <div className="package-form-columns">
            {/* Left Column */}
            <div className="package-form-column">
              <div className="package-form-group">
                <label>Package</label>
                <input 
                  type="text" 
                  placeholder="Enter package name" 
                  value={packageName}
                  onChange={(e) => setPackageName(e.target.value)}
                />
              </div>
              
              <div className="package-form-group">
                <label>Description</label>
                <textarea 
                  placeholder="Enter a description for your package"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              
              <div className="package-form-group">
                <label>Package</label>
                <div className="package-select-wrapper">
                  <select 
                    value={packageType}
                    onChange={(e) => setPackageType(e.target.value)}
                  >
                    <option value="">Select a package category or create</option>
                    <option value="fitness">Fitness</option>
                    <option value="wellness">Wellness</option>
                    <option value="nutrition">Nutrition</option>
                  </select>
                </div>
              </div>
              
              <div className="package-form-group">
                <label>Facilities included (Multiple selection)</label>
                <div className="package-checkbox-grid">
                  <div className="package-checkbox-item">
                    <input 
                      type="checkbox" 
                      id="gymAccess" 
                      checked={includeOptions.gymAccess}
                      onChange={() => handleIncludeOptionChange("gymAccess")}
                    />
                    <label htmlFor="gymAccess">Gym Access</label>
                  </div>
                  <div className="package-checkbox-item">
                    <input 
                      type="checkbox" 
                      id="spa" 
                      checked={includeOptions.spa}
                      onChange={() => handleIncludeOptionChange("spa")}
                    />
                    <label htmlFor="spa">Spa</label>
                  </div>
                  <div className="package-checkbox-item">
                    <input 
                      type="checkbox" 
                      id="sauna" 
                      checked={includeOptions.sauna}
                      onChange={() => handleIncludeOptionChange("sauna")}
                    />
                    <label htmlFor="sauna">Sauna</label>
                  </div>
                  <div className="package-checkbox-item">
                    <input 
                      type="checkbox" 
                      id="yogaClasses" 
                      checked={includeOptions.yogaClasses}
                      onChange={() => handleIncludeOptionChange("yogaClasses")}
                    />
                    <label htmlFor="yogaClasses">Yoga Classes</label>
                  </div>
                  <div className="package-checkbox-item">
                    <input 
                      type="checkbox" 
                      id="swimmingPool" 
                      checked={includeOptions.swimmingPool}
                      onChange={() => handleIncludeOptionChange("swimmingPool")}
                    />
                    <label htmlFor="swimmingPool">Swimming Pool</label>
                  </div>
                  <div className="package-checkbox-item">
                    <input 
                      type="checkbox" 
                      id="other" 
                      checked={includeOptions.other}
                      onChange={() => handleIncludeOptionChange("other")}
                    />
                    <label htmlFor="other">Other</label>
                  </div>
                </div>
                
                {includeOptions.other && (
                  <input 
                    type="text" 
                    placeholder="e.g. Tendon coach"
                    value={otherText}
                    onChange={(e) => setOtherText(e.target.value)}
                    className="package-other-input"
                  />
                )}
              </div>
              
              <div className="package-form-group">
                <label>Booking</label>
                <input 
                  type="text" 
                  placeholder="e.g. 30 min to 45 min"
                  value={bookingDuration}
                  onChange={(e) => setBookingDuration(e.target.value)}
                />
              </div>
            </div>
            
            {/* Right Column */}
            <div className="package-form-column">
              <div className="package-form-group">
                <label>Booking Durations Allowed (multiple options)</label>
                <div className="package-radio-group">
                  <div className="package-radio-item">
                    <input 
                      type="radio" 
                      id="1D" 
                      name="bookingOptions"
                      checked={bookingOptions === "1D"}
                      onChange={() => setBookingOptions("1D")}
                    />
                    <label htmlFor="1D">1D</label>
                  </div>
                  <div className="package-radio-item">
                    <input 
                      type="radio" 
                      id="2D" 
                      name="bookingOptions"
                      checked={bookingOptions === "2D"}
                      onChange={() => setBookingOptions("2D")}
                    />
                    <label htmlFor="2D">2D</label>
                  </div>
                  <div className="package-radio-item">
                    <input 
                      type="radio" 
                      id="3D" 
                      name="bookingOptions"
                      checked={bookingOptions === "3D"}
                      onChange={() => setBookingOptions("3D")}
                    />
                    <label htmlFor="3D">3D</label>
                  </div>
                  <div className="package-radio-item">
                    <input 
                      type="radio" 
                      id="1W" 
                      name="bookingOptions"
                      checked={bookingOptions === "1W"}
                      onChange={() => setBookingOptions("1W")}
                    />
                    <label htmlFor="1W">1W</label>
                  </div>
                  <div className="package-radio-item">
                    <input 
                      type="radio" 
                      id="4W" 
                      name="bookingOptions"
                      checked={bookingOptions === "4W"}
                      onChange={() => setBookingOptions("4W")}
                    />
                    <label htmlFor="4W">4W</label>
                  </div>
                </div>
              </div>
              
              <div className="package-form-group">
                <label>Max Bookings per hour</label>
                <input 
                  type="text" 
                  placeholder="e.g. 4"
                  value={maxBookings}
                  onChange={(e) => setMaxBookings(e.target.value)}
                />
              </div>
              
              <div className="package-form-group">
                <label>Pricing Structure</label>
                <div className="package-select-wrapper">
                  <select
                    value={pricingStructure}
                    onChange={(e) => setPricingStructure(e.target.value)}
                  >
                    <option value="single">Single Rate</option>
                    <option value="tiered">Tiered Pricing</option>
                    <option value="custom">Custom Pricing</option>
                  </select>
                </div>
              </div>
              
              <div className="package-form-group toggle-field">
                <label>Tutor Assignment Required? (if personal trainer is required)</label>
                <label className="package-toggle-switch">
                  <input 
                    type="checkbox"
                    checked={tutorAssignment}
                    onChange={() => setTutorAssignment(!tutorAssignment)}
                  />
                  <span className="package-toggle-slider"></span>
                </label>
              </div>
              
              <div className="package-form-group toggle-field">
                <label>Package Availability and Rate</label>
                <label className="package-toggle-switch">
                  <input 
                    type="checkbox"
                    checked={packageAvailability}
                    onChange={() => setPackageAvailability(!packageAvailability)}
                  />
                  <span className="package-toggle-slider"></span>
                </label>
              </div>
              
              <div className="package-form-group">
                <label>Max Members per (if PT = 1)</label>
                <input 
                  type="text" 
                  placeholder="e.g. 8"
                  value={maxMembers}
                  onChange={(e) => setMaxMembers(e.target.value)}
                />
              </div>
              
              <div className="package-form-group">
                <label>Commission</label>
                <textarea 
                  placeholder="Define a commission policy for this package"
                  value={commission}
                  onChange={(e) => setCommission(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        
        <div className="package-popup-footer">
          <button className="package-btn-cancel" onClick={onClose}>Close</button>
          <button className="package-btn-save">Save</button>
        </div>
      </div>
    </div>
  );
};

export default PackageEditPopup;