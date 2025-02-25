import React from 'react';
import '../styles/Profile.css';
import avatarPlaceholder from '../assets/avatar-placeholder.png'; // Ensure this path points to your avatar image

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
        </div>
      </div>

      {/* Form Section */}
      <div className="form-section">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name" className="titles">Name and Surname</label>
            <input type="text" id="name" placeholder="Enter your name" />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="titles">Email</label>
            <input type="email" id="email" placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label htmlFor="phone" className="titles">Personal Phone Number</label>
            <input type="tel" id="phone" placeholder="Enter your phone number" />
          </div>
          <div className="form-group">
            <label htmlFor="emergency-contact" className="titles">Emergency Contact Number</label>
            <input type="tel" id="emergency-contact" placeholder="Enter emergency contact number" />
          </div>
          <div className="form-group">
            <label htmlFor="emergency-name" className="titles">Emergency Contact Name</label>
            <input type="text" id="emergency-name" className="full-width" placeholder="Enter emergency contact name" />
          </div>
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
