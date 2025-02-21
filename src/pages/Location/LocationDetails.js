import React, { useState } from 'react';
import '../../styles/LocationDetails.css';

;

const LocationDetails = () => {
  const [selectedLocation, setSelectedLocation] = useState('Sloane Street Gym');

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  return (
    <div className="container">
      {/* Header Section */}
      <div className="header">
        <select value={selectedLocation} onChange={handleLocationChange} className="location-select">
          <option value="sloane-street">Sloane Street Gym</option>
          {/* Add more locations here */}
        </select>
        <button className="action-button" onClick={() => {}}>Add new location</button>
        <button className="action-button" onClick={() => {}}>Edit Details</button>
      </div>

      {/* Basic Information Section */}
      <div className="card">
        <h3>Basic Information</h3>
        <p>Location Name: Sloane Street Gym</p>
        <p>Address: 22 Sloane St, Bryanston, Johannesburg</p>
        <p>Contact Number: 011 845 4774</p>
      </div>

      {/* Operating Hours Section */}
      <div className="card">
        <h3>Operating Hours</h3>
        <p>Monday - Friday: 06:00 - 22:00</p>
        <p>Saturday: 06:00 - 22:00</p>
        <p>Sunday: 08:00 - 22:00</p>
        <p>Public Holidays: 06:00 - 22:00</p>
      </div>

      {/* Staff Assignments Section */}
      <div className="card">
        <h3>Staff Assignments</h3>
        <p>John Smith, Manager</p>
        <p>Sarah Olson, Trainer</p>
      </div>

      {/* Member Capacity Section */}
      <div className="card">
        <h3>Member Capacity</h3>
        <p>Total Capacity: 300</p>
        <p>Current members: 250</p>
        <p>Available Slots: 50</p>
      </div>
    </div>
  );
};

export default LocationDetails;