import React from 'react';
import '../styles/Profile.css';
import avatarPlaceholder from '../assets/avatar-placeholder.png'; // Ensure this path points to your avatar image
import Navbar from './Navbar'
const Profile = () => {
  return (
   
    <div className="profile-container">
      {/* Profile Image Section */}
      <div className="profile-image-section">
        <div className="avatar">
          <img src={avatarPlaceholder} alt="Avatar" />
        </div>
        <div className="button-group">
          <button className="edit-btn">Edit Picture</button>
          <button className="select-btn">Select Avatar</button>
        </div>
      </div>
      
      {/* Form Section */}
      <div className="form-section">
        <div className="form-grid">
            <p className="titles">Name and Surname </p>
          <input type="text" placeholder="Enter your name" />
          <p className="titles">Email </p>
          <input type="text" placeholder="Enter your last name" />
          <p className="titles">Personal Phone Number </p>
          <input type="email" placeholder="Enter your email" />
    
          <input type="text" placeholder="Enter emergency contact number" />
          <input
            type="text"
            className="full-width"
            placeholder="Enter emergency contact name"
          />
        </div>
        <div className="form-buttons">
          <button className="save-btn">Save Changes</button>
          <button className="clear-btn">Clear</button>
        </div>
      </div>

    </div>
    
  );
};

export default Profile;
