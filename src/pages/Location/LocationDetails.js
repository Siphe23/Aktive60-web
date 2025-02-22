import React, { useState } from 'react';
import '../../styles/LocationDetails.css';
import Sidebar from '../../components/Sidebar';
import NavigationBar from '../../components/Navbar';

const LocationDetails = () => {
  const [selectedLocation, setSelectedLocation] = useState('Sloane Street Gym');
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  return (
    <div className="dashboard-container">
      <NavigationBar />
      <div className="main-content">
        <Sidebar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
        <div className={`content ${isExpanded ? 'expanded' : 'collapsed'}`}>
          <div className="container">
            {/* Header Section */}
            <div className="header">
              <select
                value={selectedLocation}
                onChange={handleLocationChange}
                className="location-select"
              >
                <option value="sloane-street">Sloane Street Gym</option>
                {/* Add more locations here */}
              </select>
              <div className="header-buttons">
                <button className="action-button">Add New Location</button>
                <button className="action-button">Edit Details</button>
              </div>
            </div>

            <div className="card-grid">
              {/* Basic Information Section */}
              <div className="card">
                <h3>Basic Information</h3>
                <p><strong>Location Name:</strong> Sloane Street Gym</p>
                <p><strong>Address:</strong> 22 Sloane St, Bryanston, Johannesburg</p>
                <p><strong>Contact Number:</strong> 011 845 4774</p>
              </div>

              {/* Operating Hours Section */}
              <div className="card">
                <h3>Operating Hours</h3>
                <p><strong>Monday - Friday:</strong> 06:00 - 22:00</p>
                <p><strong>Saturday:</strong> 06:00 - 22:00</p>
                <p><strong>Sunday:</strong> 08:00 - 22:00</p>
                <p><strong>Public Holidays:</strong> 06:00 - 22:00</p>
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
                <p><strong>Total Capacity:</strong> 300</p>
                <p><strong>Current Members:</strong> 250</p>
                <p><strong>Available Slots:</strong> 50</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDetails;
