import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import NavigationBar from "../../components/Navbar";
import "../../styles/LocationOverview.css";

const LocationOverview = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const locations = [
    {
      name: "Sloane Street Gym",
      address: "22 Sloane St, Bryanston Johannesburg",
      capacity: "250/300",
    },
    {
      name: "Midrand",
      address: "22 Sloane St, Bryanston Johannesburg",
      capacity: "120/200",
    },
    {
      name: "Parktown",
      address: "Unit 37, 283 Swartgoud St, Winchester Hills 2091",
      capacity: "200/350",
    },
  ];

  return (
    <div className="dashboard-container">
      <NavigationBar />
      <div className="main-content">
        <Sidebar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
        <div className={`content ${isExpanded ? "expanded" : "collapsed"}`}>
          <div className="container">
            <div className="header">
              <h2 className="title">Location Overview</h2>
              <button className="filter-btn">Filter</button>
            </div>
            <table className="location-table">
              <thead>
                <tr>
                  <th>Location Name</th>
                  <th>Address</th>
                  <th>Capacity</th>
                </tr>
              </thead>
              <tbody>
                {locations.map((location, index) => (
                  <tr key={index}>
                    <td>{location.name}</td>
                    <td>{location.address}</td>
                    <td>{location.capacity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationOverview;
