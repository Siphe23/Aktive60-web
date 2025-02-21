import React from 'react';
import Sidebar from '../components/Sidebar';
import NavigationBar from '../components/Navbar';
import DataTable from '../components/DataTable';
import CustomerChart from '../components/CustomChart';
import Cards from '../components/cards';
import '../styles/Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <NavigationBar />
      <div className="main-content">
        <Sidebar />
        <div className="content">
          <Cards/>
          <DataTable />
          <CustomerChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
