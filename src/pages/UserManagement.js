import React from "react";
import "../styles/UserManagement.css";

const UserManagement = () => {
  return (
    <div className="user-management">
      <h2>User Management</h2>
      <div className="requests">
        <div className="request-box">
          <h4>Pending Admin Requests</h4>
          <p>2</p>
          <a href="#">View All</a>
        </div>
        <div className="request-box">
          <h4>Pending User Requests</h4>
          <p>2</p>
          <a href="#">View All</a>
        </div>
      </div>
      
      <section className="table-section">
        <h4>Admins</h4>
        <table>
          <thead>
            <tr>
              <th>Admin Name</th>
              <th>Location Name</th>
              <th>Joined</th>
              <th>Work ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Smith</td>
              <td>Sloane Street Gym</td>
              <td>21 July 2021</td>
              <td>7689853409850</td>
              <td><a href="#" className="remove">Remove admin</a></td>
            </tr>
            <tr>
              <td>Mike Williams</td>
              <td>Midrand</td>
              <td>13 August 2021</td>
              <td>7898563409850</td>
              <td><a href="#" className="remove">Remove admin</a></td>
            </tr>
            <tr>
              <td>Rebecca Jones</td>
              <td>Parktown</td>
              <td>02 January 2023</td>
              <td>2249853409850</td>
              <td><a href="#" className="remove">Remove admin</a></td>
            </tr>
          </tbody>
        </table>
      </section>
      
      <section className="table-section">
        <h4>Active Users</h4>
        <table>
          <thead>
            <tr>
              <th>Admin Name</th>
              <th>Location Name</th>
              <th>Subscription Package</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Lila Masupi</td>
              <td>Bryanston</td>
              <td>Premium Package</td>
              <td>21 July 2021</td>
              <td><a href="#" className="restrict">Restrict Access</a></td>
            </tr>
            <tr>
              <td>Kenneth Tshabalala</td>
              <td>Midrand</td>
              <td>Basic</td>
              <td>13 August 2021</td>
              <td><a href="#" className="restrict">Restrict Access</a></td>
            </tr>
            <tr>
              <td>Desiree Naidoo</td>
              <td>Parktown</td>
              <td>Basic Package</td>
              <td>02 January 2023</td>
              <td><a href="#" className="restrict">Restrict Access</a></td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default UserManagement;
