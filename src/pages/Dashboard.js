import React, { useState } from "react";
import { Message } from '@mui/icons-material';  // Import the Message icon
import Sidebar from "../components/Sidebar";
import NavigationBar from "../components/Navbar";
import DataTable from "../components/DataTable";
import CustomerChart from "../components/CustomChart";
import Cards from "../components/cards";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="dashboard-container">
      <NavigationBar isSidebarExpanded={isExpanded} />
      <div className="main-content">
        <Sidebar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
        <div className={`content ${isExpanded ? "expanded" : "collapsed"}`}>
          <Cards />
          <DataTable />
          <CustomerChart />
        </div>
      </div>
      <div className="message-icon">
        <Message /> {/* Use the Message icon */}
      </div>
    </div>
  );
};

export default Dashboard;
