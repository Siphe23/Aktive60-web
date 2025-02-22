import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import NavigationBar from "../components/Navbar";
import DataTable from "../components/DataTable";
import CustomerChart from "../components/CustomChart";
import Cards from "../components/cards";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [isExpanded, setIsExpanded] = useState(true); // Keep sidebar open

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="dashboard-container">
      <NavigationBar />
      <div className="main-content">
        <Sidebar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
        <div className={`content ${isExpanded ? "expanded" : "collapsed"}`}>
          <Cards />
          <DataTable />
          <CustomerChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
