import React from 'react';
import '../styles/DataTable.css';

const DataTable = () => {
  const gyms = [
    { location: 'RMA Gym', status: 'Active', users: 82, trainers: 12 },
    { location: 'Umthunzi Valley Gym', status: 'Active', users: 122, trainers: 17 },
    { location: 'Sloane Street Gym', status: 'Active', users: 97, trainers: 14 },
  ];

  return (
    <div className="data-table">
      <table>
        <thead>
          <tr>
            <th>Location</th>
            <th>Status</th>
            <th>Active Users</th>
            <th>Trainers</th>
          </tr>
        </thead>
        <tbody>
          {gyms.map((gym, index) => (
            <tr key={index}>
              <td>{gym.location}</td>
              <td>{gym.status}</td>
              <td>{gym.users}</td>
              <td>{gym.trainers}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
