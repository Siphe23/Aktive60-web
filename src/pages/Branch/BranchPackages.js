import React, { useState } from "react";
import "../../styles/BranchPackages.css";
import { FaEdit, FaTimes } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

const PackageEditPopup = ({ isOpen, onClose, packageData = null }) => {
  const [packageName, setPackageName] = useState(packageData?.title || "");
  const [description, setDescription] = useState("");
  const [bookingDurations, setBookingDurations] = useState({
    "15": true,
    "30": false,
    "45": false,
    "60": false
  });
  const [packageCategory, setPackageCategory] = useState("");
  const [includeOptions, setIncludeOptions] = useState({
    gymAccess: true,
    spa: false,
    tennis: false,
    yogaClasses: false,
    swimmingPool: false,
    other: false
  });
  const [otherText, setOtherText] = useState("");
  const [bookingWindow, setBookingWindow] = useState("");
  const [session, setSession] = useState("");
  const [price, setPrice] = useState("");
  const [isOnceOff, setIsOnceOff] = useState(false);
  const [packageAvailability, setPackageAvailability] = useState("");
  const [maxMembers, setMaxMembers] = useState("");
  const [cancellationPolicy, setCancellationPolicy] = useState("");

  const handleIncludeOptionChange = (option) => {
    setIncludeOptions({
      ...includeOptions,
      [option]: !includeOptions[option]
    });
  };

  const handleDurationChange = (duration) => {
    setBookingDurations({
      ...bookingDurations,
      [duration]: !bookingDurations[duration]
    });
  };

  if (!isOpen) return null;

  return (
    <div className="package-popup-overlay">
      <div className="package-popup-container">
        <div className="package-popup-header">
          <h2>Add new package</h2>
          <button className="package-close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        
        <div className="package-popup-content">
          <div className="package-form-grid">
            {/* Left Column */}
            <div className="package-form-column">
              <div className="package-form-group">
                <label>Package Type</label>
                <div className="package-select-wrapper">
                  <select 
                    value={packageCategory}
                    onChange={(e) => setPackageCategory(e.target.value)}
                    className="package-select"
                  >
                    <option value="">Select Package type or create one</option>
                    <option value="personalised">Personalised Meal Plans</option>
                    <option value="oneOnOne">One-on-One Sessions</option>
                    <option value="online">Online Sessions</option>
                    <option value="group">Group Sessions</option>
                  </select>
                </div>
              </div>
              
              <div className="package-form-group">
                <label>Description</label>
                <textarea 
                  placeholder="Enter a description for your package"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="package-textarea"
                  maxLength={50}
                ></textarea>
                <div className="char-count">0/50</div>
              </div>
              
              <div className="package-form-group">
                <label>Package Category</label>
                <div className="package-select-wrapper">
                  <select 
                    value={packageCategory}
                    onChange={(e) => setPackageCategory(e.target.value)}
                    className="package-select"
                  >
                    <option value="">Select a package category or create one</option>
                    <option value="fitness">Fitness</option>
                    <option value="wellness">Wellness</option>
                    <option value="nutrition">Nutrition</option>
                  </select>
                </div>
              </div>
              
              <div className="package-form-group">
                <label>Facilities Included (multiple selection)</label>
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
                      id="tennis" 
                      checked={includeOptions.tennis}
                      onChange={() => handleIncludeOptionChange("tennis")}
                    />
                    <label htmlFor="tennis">Tennis</label>
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
                    placeholder="e.g. Squash court"
                    value={otherText}
                    onChange={(e) => setOtherText(e.target.value)}
                    className="package-other-input"
                  />
                )}
              </div>
              
              <div className="package-form-group">
                <label>Booking Window</label>
                <input 
                  type="text" 
                  placeholder="e.g. 30 days in advance"
                  value={bookingWindow}
                  onChange={(e) => setBookingWindow(e.target.value)}
                  className="package-input"
                />
              </div>
            </div>
            
            {/* Right Column */}
            <div className="package-form-column">
              <div className="package-form-group">
                <label>Booking Durations Allowed (multiple selection)</label>
                <div className="package-checkbox-grid">
                  <div className="package-checkbox-item">
                    <input 
                      type="checkbox" 
                      id="15min" 
                      checked={bookingDurations["15"]}
                      onChange={() => handleDurationChange("15")}
                    />
                    <label htmlFor="15min">15</label>
                  </div>
                  <div className="package-checkbox-item">
                    <input 
                      type="checkbox" 
                      id="30min" 
                      checked={bookingDurations["30"]}
                      onChange={() => handleDurationChange("30")}
                    />
                    <label htmlFor="30min">30</label>
                  </div>
                  <div className="package-checkbox-item">
                    <input 
                      type="checkbox" 
                      id="45min" 
                      checked={bookingDurations["45"]}
                      onChange={() => handleDurationChange("45")}
                    />
                    <label htmlFor="45min">45</label>
                  </div>
                  <div className="package-checkbox-item">
                    <input 
                      type="checkbox" 
                      id="60min" 
                      checked={bookingDurations["60"]}
                      onChange={() => handleDurationChange("60")}
                    />
                    <label htmlFor="60min">60</label>
                  </div>
                </div>
              </div>
              
              <div className="form-row">
                <div className="package-form-group half-width">
                  <label>Session</label>
                  <input 
                    type="text" 
                    placeholder="e.g 1 Session per week"
                    value={session}
                    onChange={(e) => setSession(e.target.value)}
                    className="package-input"
                  />
                </div>
                
                <div className="package-form-group half-width">
                  <label>Price</label>
                  <input 
                    type="text" 
                    placeholder="e.g R150 PM"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="package-input"
                  />
                </div>
              </div>
              
              <div className="package-form-group toggle-field">
                <label>Once-off?</label>
                <label className="package-toggle-switch">
                  <input 
                    type="checkbox"
                    checked={isOnceOff}
                    onChange={() => setIsOnceOff(!isOnceOff)}
                  />
                  <span className="package-toggle-slider"></span>
                </label>
              </div>
              
              <div className="session-list">
                <ul>
                  <li>
                    1 session per week R900 PM 
                    <span className="delete-session">✕</span>
                  </li>
                </ul>
              </div>
              
              <div className="package-form-group">
                <label>Package Availability and Rules</label>
                <input 
                  type="text"
                  placeholder=""
                  value={packageAvailability}
                  onChange={(e) => setPackageAvailability(e.target.value)}
                  className="package-input"
                />
              </div>
              
              <div className="package-form-group">
                <label>Max Members per Package</label>
                <input 
                  type="text" 
                  placeholder="e.g. 20"
                  value={maxMembers}
                  onChange={(e) => setMaxMembers(e.target.value)}
                  className="package-input"
                />
              </div>
              
              <div className="package-form-group">
                <label>Cancellation Policy</label>
                <textarea 
                  placeholder="Enter a cancellation policy for this package"
                  value={cancellationPolicy}
                  onChange={(e) => setCancellationPolicy(e.target.value)}
                  className="package-textarea"
                  maxLength={50}
                ></textarea>
                <div className="char-count">0/50</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="package-popup-footer">
          <button className="package-btn-clear">Clear</button>
          <button className="package-btn-save">Save</button>
        </div>
      </div>
    </div>
  );
};

const BranchPackages = () => {
  const [packages, setPackages] = useState([
    {
      title: "PERSONALISED MEAL PLANS & PROGRAMS",
      details: ["4 Weeks - R400", "8 Weeks - R700", "12 Weeks - R1200"],
    },
    {
      title: "ONE-ON-ONE SESSIONS",
      details: [
        "Single Session: R200.00",
        "1 session per week R900 PM",
        "2 sessions per week R1400 PM",
        "3 sessions per week R1700 PM",
      ],
    },
    {
      title: "ONLINE HOURLY SESSIONS",
      details: ["R300"],
    },
    {
      title: "GROUP SESSIONS",
      details: [
        "1 session per week - R1200 PM",
        "2 sessions per week - R1600 PM",
        "3 sessions per week - R2000 PM",
      ],
    },
  ]);
  
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentPackage, setCurrentPackage] = useState(null);
  
  const openPopup = (packageData = null) => {
    setCurrentPackage(packageData);
    setIsPopupOpen(true);
  };
  
  const closePopup = () => {
    setIsPopupOpen(false);
    setCurrentPackage(null);
  };

  return (
    <div className="branch-packages">
      <h2 className="branch-title">Branch Packages</h2>
      <button className="add-package-btn" onClick={() => openPopup()}>
        <IoMdAdd /> Add new package
      </button>
      <div className="packages-grid">
        {packages.map((pkg, index) => (
          <div key={index} className="package-card">
            <h3 className="package-title">
              {pkg.title} 
              <FaEdit className="edit-icon" onClick={() => openPopup(pkg)} />
            </h3>
            <div className="package-details">
              {pkg.details.map((detail, i) => (
                <p key={i}>{detail}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <PackageEditPopup 
        isOpen={isPopupOpen} 
        onClose={closePopup} 
        packageData={currentPackage} 
      />
    </div>
  );
};

export default BranchPackages;