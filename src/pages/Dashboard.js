import React, { useState } from 'react'; // ✅ Added useState
import Sidebar from '../components/Sidebar';
import NavigationBar from '../components/Navbar';
import DataTable from '../components/DataTable';
import CustomChart from '../components/CustomChart';
import Cards from '../components/cards';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  return (
    <div className="dashboard-container">
      <NavigationBar isSidebarExpanded={isSidebarExpanded} />
      <div className="main-content">
        <Sidebar 
          isExpanded={isSidebarExpanded} 
          toggle={() => setIsSidebarExpanded(!isSidebarExpanded)}
        />
        <div className="content" style={{ marginLeft: isSidebarExpanded ? '220px' : '60px' }}>
          <Cards/>
          <DataTable />
          <CustomChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
