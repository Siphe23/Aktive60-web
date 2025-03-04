import React, { useState } from "react";
import { FaTimes, FaClock } from "react-icons/fa";
import "../../../styles/EditBranchPopup.css";

const EditBranchPopup = ({ isOpen, onClose, branchData, onSave }) => {
  const [formData, setFormData] = useState(branchData || {
    locationName: "Sloane Street Gym",
    address: "22 Sloane St, Bryanston Johannesburg",
    contactNumber: "011 845 4774",
    operatingHours: {
      mondayFriday: { open: "00:00", close: "00:00" },
      saturday: { open: "00:00", close: "00:00" },
      sunday: { open: "00:00", close: "00:00" },
      publicHolidays: { open: "00:00", close: "00:00" }
    },
    packages: {
      oneOnOneSessions: true,
      personalisedMealPlans: false,
      groupSessions: false,
      onlineHourlySessions: false
    },
    memberCapacity: 300
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleTimeChange = (day, type, value) => {
    setFormData({
      ...formData,
      operatingHours: {
        ...formData.operatingHours,
        [day]: {
          ...formData.operatingHours[day],
          [type]: value
        }
      }
    });
  };

  const handlePackageChange = (packageName) => {
    setFormData({
      ...formData,
      packages: {
        ...formData.packages,
        [packageName]: !formData.packages[packageName]
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleClear = () => {
    setFormData({
      locationName: "",
      address: "",
      contactNumber: "",
      operatingHours: {
        mondayFriday: { open: "00:00", close: "00:00" },
        saturday: { open: "00:00", close: "00:00" },
        sunday: { open: "00:00", close: "00:00" },
        publicHolidays: { open: "00:00", close: "00:00" }
      },
      packages: {
        oneOnOneSessions: false,
        personalisedMealPlans: false,
        groupSessions: false,
        onlineHourlySessions: false
      },
      memberCapacity: 0
    });
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="close-button" onClick={onClose}>
          <FaTimes />
        </button>
        <h2>Edit branch details</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-content">
            <div className="form-left">
              <div className="form-group">
                <label>Location Name</label>
                <input
                  type="text"
                  name="locationName"
                  value={formData.locationName}
                  onChange={handleInputChange}
                  placeholder="Enter location name"
                  className="dark-input"
                />
              </div>
              
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter address"
                  className="dark-input"
                />
              </div>
              
              <div className="form-group">
                <label>Contact Number</label>
                <input
                  type="text"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  placeholder="Enter contact number"
                  className="dark-input"
                />
              </div>
              
              <div className="form-group">
                <label>Operating Hours</label>
                
                <div className="time-row">
                  <span>Monday - Friday</span>
                  <div className="time-inputs">
                    <div className="time-input">
                      <FaClock />
                      <select
                        value={formData.operatingHours.mondayFriday.open}
                        onChange={(e) => handleTimeChange('mondayFriday', 'open', e.target.value)}
                        className="dark-select"
                      >
                        {[...Array(24)].map((_, i) => (
                          <option key={`open-${i}`} value={`${i.toString().padStart(2, '0')}:00`}>
                            {`${i.toString().padStart(2, '0')}:00`}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="time-input">
                      <FaClock />
                      <select
                        value={formData.operatingHours.mondayFriday.close}
                        onChange={(e) => handleTimeChange('mondayFriday', 'close', e.target.value)}
                        className="dark-select"
                      >
                        {[...Array(24)].map((_, i) => (
                          <option key={`close-${i}`} value={`${i.toString().padStart(2, '0')}:00`}>
                            {`${i.toString().padStart(2, '0')}:00`}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="time-row">
                  <span>Saturday</span>
                  <div className="time-inputs">
                    <div className="time-input">
                      <FaClock />
                      <select
                        value={formData.operatingHours.saturday.open}
                        onChange={(e) => handleTimeChange('saturday', 'open', e.target.value)}
                        className="dark-select"
                      >
                        {[...Array(24)].map((_, i) => (
                          <option key={`sat-open-${i}`} value={`${i.toString().padStart(2, '0')}:00`}>
                            {`${i.toString().padStart(2, '0')}:00`}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="time-input">
                      <FaClock />
                      <select
                        value={formData.operatingHours.saturday.close}
                        onChange={(e) => handleTimeChange('saturday', 'close', e.target.value)}
                        className="dark-select"
                      >
                        {[...Array(24)].map((_, i) => (
                          <option key={`sat-close-${i}`} value={`${i.toString().padStart(2, '0')}:00`}>
                            {`${i.toString().padStart(2, '0')}:00`}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="time-row">
                  <span>Sunday</span>
                  <div className="time-inputs">
                    <div className="time-input">
                      <FaClock />
                      <select
                        value={formData.operatingHours.sunday.open}
                        onChange={(e) => handleTimeChange('sunday', 'open', e.target.value)}
                        className="dark-select"
                      >
                        {[...Array(24)].map((_, i) => (
                          <option key={`sun-open-${i}`} value={`${i.toString().padStart(2, '0')}:00`}>
                            {`${i.toString().padStart(2, '0')}:00`}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="time-input">
                      <FaClock />
                      <select
                        value={formData.operatingHours.sunday.close}
                        onChange={(e) => handleTimeChange('sunday', 'close', e.target.value)}
                        className="dark-select"
                      >
                        {[...Array(24)].map((_, i) => (
                          <option key={`sun-close-${i}`} value={`${i.toString().padStart(2, '0')}:00`}>
                            {`${i.toString().padStart(2, '0')}:00`}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="time-row">
                  <span>Public Holidays</span>
                  <div className="time-inputs">
                    <div className="time-input">
                      <FaClock />
                      <select
                        value={formData.operatingHours.publicHolidays.open}
                        onChange={(e) => handleTimeChange('publicHolidays', 'open', e.target.value)}
                        className="dark-select"
                      >
                        {[...Array(24)].map((_, i) => (
                          <option key={`hol-open-${i}`} value={`${i.toString().padStart(2, '0')}:00`}>
                            {`${i.toString().padStart(2, '0')}:00`}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="time-input">
                      <FaClock />
                      <select
                        value={formData.operatingHours.publicHolidays.close}
                        onChange={(e) => handleTimeChange('publicHolidays', 'close', e.target.value)}
                        className="dark-select"
                      >
                        {[...Array(24)].map((_, i) => (
                          <option key={`hol-close-${i}`} value={`${i.toString().padStart(2, '0')}:00`}>
                            {`${i.toString().padStart(2, '0')}:00`}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="form-right">
              <div className="form-group">
                <label>Packages</label>
                <div className="checkbox-group">
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={formData.packages.oneOnOneSessions}
                      onChange={() => handlePackageChange('oneOnOneSessions')}
                    />
                    <div className="custom-checkbox">
                      {formData.packages.oneOnOneSessions && <span className="checkmark"></span>}
                    </div>
                    ONE-ON-ONE SESSIONS
                  </label>
                  
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={formData.packages.personalisedMealPlans}
                      onChange={() => handlePackageChange('personalisedMealPlans')}
                    />
                    <div className="custom-checkbox">
                      {formData.packages.personalisedMealPlans && <span className="checkmark"></span>}
                    </div>
                    PERSONALISED MEAL PLANS & PROGRAMS
                  </label>
                  
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={formData.packages.groupSessions}
                      onChange={() => handlePackageChange('groupSessions')}
                    />
                    <div className="custom-checkbox">
                      {formData.packages.groupSessions && <span className="checkmark"></span>}
                    </div>
                    GROUP SESSIONS
                  </label>
                  
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={formData.packages.onlineHourlySessions}
                      onChange={() => handlePackageChange('onlineHourlySessions')}
                    />
                    <div className="custom-checkbox">
                      {formData.packages.onlineHourlySessions && <span className="checkmark"></span>}
                    </div>
                    ONLINE HOURLY SESSIONS
                  </label>
                </div>
              </div>
              
              <div className="form-group">
                <label>Member Capacity</label>
                <input
                  type="number"
                  name="memberCapacity"
                  value={formData.memberCapacity}
                  onChange={handleInputChange}
                  placeholder="Enter member capacity"
                  className="dark-input"
                />
              </div>
            </div>
          </div>
          
          <div className="form-actions">
            <button type="submit" className="save-button">Save</button>
            <button type="button" className="clear-button" onClick={handleClear}>Clear</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBranchPopup;