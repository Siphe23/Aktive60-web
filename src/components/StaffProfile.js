import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase'; // Import Firebase auth and Firestore instances
import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore'; // Firestore functions
import avatarPlaceholder from '../assets/avatar-placeholder.png'; // Ensure this path points to your avatar image
import '../styles/StaffProfile.css';
import Navbar from '../components/Navbar';

const StaffProfile = () => {
  const [branches, setBranches] = useState([]);
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

          // Check if profile picture exists in the profilepictures table
          const avatarRef = doc(db, 'profilepictures', user.uid);
          const avatarDoc = await getDoc(avatarRef);
          if (avatarDoc.exists()) {
            const avatarData = avatarDoc.data();
            setFormData((prevData) => ({
              ...prevData,
              avatar: avatarData.base64 || avatarPlaceholder,
            }));
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
  }, []);

  const fetchBranches = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "branches"));
      const branchList = querySnapshot.docs.map((doc) => doc.data().branch_name);
      setBranches(branchList);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, formData, { merge: true });

        // If the user has updated the avatar, save the new base64 data to Firestore
        if (tempAvatar) {
          const avatarRef = doc(db, 'profilepictures', user.uid);
          await setDoc(avatarRef, { base64: tempAvatar }, { merge: true });
        }

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

  const handleClear = () => {
    setFormData({
      name: '',
      lastName: '',
      email: '',
      phone: '',
      role: '',
      branch: '',
      workId: '',
      avatar: avatarPlaceholder,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempAvatar(reader.result); // base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyAvatar = () => {
    if (tempAvatar) {
      setFormData({ ...formData, avatar: tempAvatar });
    }
    setShowModal(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-image-section">
        <div className="avatar">
          <img src={formData.avatar} alt="Avatar" />
        </div>
        <div className="button-group">
          <button className="edit-btn" onClick={() => setShowModal(true)}>
            Edit Picture
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowModal(false)}>
              &times;
            </button>
            <div className="container">
              <p className="select-text">Pick an avatar or upload a picture</p>
              <input type="file" onChange={handleFileChange} />
            </div>
            <button className="apply-btn" onClick={handleApplyAvatar}>
              Apply
            </button>
          </div>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

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
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="p-2 w-full bg-gray-700 text-white rounded mt-4"
            required
          >
            <option value="">Select your role</option>
            <option value="Trainer">Trainer</option>
            <option value="Staff">Staff</option>
            {/* <option value="Supervisor">Supervisor</option> */}
          </select>
          </div>
          <div className="form-group">
          <select
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            className="p-2 w-full bg-gray-700 text-white rounded mt-4"
            required
          >
            <option value="">Select your branch location</option>
            {branches.map((branch, index) => (
              <option key={index} value={branch}>
                {branch}
              </option>
            ))}
          </select>
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