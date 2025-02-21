import React, { useState } from "react";
import "../styles/Profile.css";
import avatarPlaceholder from "../assets/avatar-placeholder.png";

// Import avatars
const avatars = [
  require("../assets/avatars/avatar1.png"),
  require("../assets/avatars/avatar2.png"),
  require("../assets/avatars/avatar3.png"),
  require("../assets/avatars/avatar4.png"),
  require("../assets/avatars/avatar5.png"),
  require("../assets/avatars/avatar6.png"),
  require("../assets/avatars/avatar7.png"),
  require("../assets/avatars/avatar8.png"),
  require("../assets/avatars/avatar9.png"),
  require("../assets/avatars/avatar10.png"),
  require("../assets/avatars/avatar11.png"),
  require("../assets/avatars/avatar12.png"),
  require("../assets/avatars/avatar13.png"),
  require("../assets/avatars/avatar14.png"),
  require("../assets/avatars/avatar15.png"),
  require("../assets/avatars/avatar16.png"),
  require("../assets/avatars/avatar17.png"),
  require("../assets/avatars/avatar18.png"),
];

const Profile = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(avatarPlaceholder);
  const [tempAvatar, setTempAvatar] = useState(null); // Temporary selection
  const [showModal, setShowModal] = useState(false);

  const handleApplyAvatar = () => {
    if (tempAvatar) {
      setSelectedAvatar(tempAvatar);
    }
    setShowModal(false);
  };

  return (
    <div className="profile-container">
      {/* Profile Image Section */}
      <div className="profile-image-section">
        <div className="avatar">
          <img src={selectedAvatar} alt="Avatar" />
        </div>
        <div className="button-group">
          <button className="edit-btn">Edit Picture</button>
          <button className="select-btn" onClick={() => setShowModal(true)}>
            Select Avatar
          </button>
        </div>
      </div>

      {/* Modal for Avatar Selection */}
      {showModal && (
  <div className="modal-overlay" onClick={() => setShowModal(false)}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <button className="close-btn" onClick={() => setShowModal(false)}>
        &times;
      </button>
      <div class="container">
    <p class="select-text">Pick an avatar</p>
  </div>

      <div className="avatar-grid">
        {avatars.map((avatar, index) => (
          <img
            key={index}
            src={avatar}
            alt={`Avatar ${index + 1}`}
            className={`avatar-option ${tempAvatar === avatar ? "selected" : ""}`}
            onClick={() => setTempAvatar(avatar)}
          />
        ))}
      </div>
      <button className="apply-btn" onClick={handleApplyAvatar}>
        Apply
      </button>
    </div>
  </div>
)}


      {/* Form Section */}
      <div className="form-section">
        <div className="form-grid">
          <p className="titles">Name and Surname</p>
          <input type="text" placeholder="Enter your name" />
          <p className="titles">Email</p>
          <input type="email" placeholder="Enter your email" />
          <p className="titles">Personal Phone Number</p>
          <input type="text" placeholder="Enter your phone number" />
          <input type="text" placeholder="Enter emergency contact number" />
          <input type="text" className="full-width" placeholder="Enter emergency contact name" />
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
