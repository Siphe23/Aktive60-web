import React from 'react';
import Sidebar from '../components/Sidebar';
import NavigationBar from '../components/Navbar';
import DataTable from '../components/DataTable';
import Graph from '../components/Graph';
import '../styles/Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <NavigationBar />
      <div className="main-content">
        <Sidebar />
        <div className="content">
          <DataTable />
          <Graph />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
