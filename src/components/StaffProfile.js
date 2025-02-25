import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase'; // Import Firebase auth and Firestore instances
import { doc, getDoc, setDoc } from 'firebase/firestore'; // Firestore functions
import avatarPlaceholder from '../assets/avatar-placeholder.png'; // Ensure this path points to your avatar image
import '../styles/StaffProfile.css';
import Navbar from '../components/Navbar';
// Import avatars
const avatars = [
  require('../assets/avatars/avatar1.png'),
  require('../assets/avatars/avatar2.png'),
  require('../assets/avatars/avatar3.png'),
  require('../assets/avatars/avatar4.png'),
  require('../assets/avatars/avatar5.png'),
  require('../assets/avatars/avatar6.png'),
  require('../assets/avatars/avatar7.png'),
  require('../assets/avatars/avatar8.png'),
  require('../assets/avatars/avatar9.png'),
  require('../assets/avatars/avatar10.png'),
  require('../assets/avatars/avatar11.png'),
  require('../assets/avatars/avatar12.png'),
  require('../assets/avatars/avatar13.png'),
  require('../assets/avatars/avatar14.png'),
  require('../assets/avatars/avatar15.png'),
  require('../assets/avatars/avatar16.png'),
  require('../assets/avatars/avatar17.png'),
  require('../assets/avatars/avatar18.png'),
];

const StaffProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    branch: '',
    workId: '',
    avatar: avatarPlaceholder, // Add avatar to form data
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // Modal visibility
  const [tempAvatar, setTempAvatar] = useState(null); // Temporary avatar selection

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser; // Get the currently logged-in user

      if (user) {
        try {
          // Fetch the user's data from Firestore using their UID
          const userRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setFormData({
              name: userData.name,
              lastName: userData.lastName,
              email: userData.email,
              phone: userData.phone,
              role: userData.role,
              branch: userData.branch,
              workId: userData.workId,
              avatar: userData.avatar || avatarPlaceholder, // Default to placeholder if no avatar
            });
          } else {
            console.error('No user data found in Firestore');
            setError('No user data found.');
          }
        } catch (err) {
          console.error('Error fetching user data:', err);
          setError('Failed to fetch user data. Please try again later.');
        }
      } else {
        console.error('No user is logged in.');
        setError('No user is logged in.');
      }
    };

    fetchUserData();
  }, []); // Empty dependency array ensures this runs only once when the component is mounted

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle save button click
  const handleSave = async () => {
    setIsLoading(true);
    try {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, formData, { merge: true });
        alert('Profile updated successfully!');
      } else {
        alert('You need to be logged in to update your profile.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle clear button click
  const handleClear = () => {
    setFormData({
      name: '',
      lastName: '',
      email: '',
      phone: '',
      role: '',
      branch: '',
      workId: '',
      avatar: avatarPlaceholder, // Reset avatar on clear
    });
  };

  // Handle avatar application
  const handleApplyAvatar = () => {
    if (tempAvatar) {
      setFormData({ ...formData, avatar: tempAvatar });
    }
    setShowModal(false);
  };

  return (
    
    <div className="profile-container">
      
      {/* Profile Image Section */}
      <div className="profile-image-section">
        <div className="avatar">
          <img src={formData.avatar} alt="Avatar" />
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
            <div className="container">
              <p className="select-text">Pick an avatar</p>
            </div>

            <div className="avatar-grid">
              {avatars.map((avatar, index) => (
                <img
                  key={index}
                  src={avatar}
                  alt={`Avatar ${index + 1}`}
                  className={`avatar-option ${tempAvatar === avatar ? 'selected' : ''}`}
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

      {/* Error Message */}
      {error && <div className="error-message">{error}</div>}

      {/* Form Section */}
      <div className="form-section">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name" className="titles">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="p-2 bg-gray-700 text-white rounded"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName" className="titles">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange}
              className="p-2 bg-gray-700 text-white rounded"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="titles">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="p-2 bg-gray-700 text-white rounded"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone" className="titles">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              className="p-2 bg-gray-700 text-white rounded"
            />
          </div>
          <div className="form-group">
            <label htmlFor="role" className="titles">Role</label>
            <input
              type="text"
              id="role"
              name="role"
              placeholder="Enter your role"
              value={formData.role}
              onChange={handleChange}
              className="p-2 bg-gray-700 text-white rounded"
            />
          </div>
          <div className="form-group">
            <label htmlFor="branch" className="titles">Branch</label>
            <input
              type="text"
              id="branch"
              name="branch"
              placeholder="Enter your branch"
              value={formData.branch}
              onChange={handleChange}
              className="p-2 bg-gray-700 text-white rounded"
            />
          </div>
          <div className="form-group">
            <label htmlFor="workId" className="titles">Work ID</label>
            <input
              type="text"
              id="workId"
              name="workId"
              placeholder="Enter your work ID"
              value={formData.workId}
              onChange={handleChange}
              className="p-2 bg-gray-700 text-white rounded"
            />
          </div>
        </div>

        <div className="form-buttons">
          <button
            className="save-btn"
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
          <button className="clear-btn" onClick={handleClear}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffProfile;
