import React, { useState, useEffect } from "react";
import { db, realTimeDB, auth } from "../firebase"; // Ensure you have Firestore, Realtime DB, and Auth instances
import { collection, addDoc, getDocs, setDoc, doc } from "firebase/firestore"; // Firestore functions
import { ref, set } from "firebase/database"; // Realtime Database functions
import { createUserWithEmailAndPassword } from "firebase/auth"; // Firebase Auth function
import "../styles/StaffRegister.css";

const StaffRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    branch: "",
    workId: "",
    password: "",
    confirmPassword: "",
    status: "pending", // Default status
  });

  const [branches, setBranches] = useState([]); // State to hold branches
  const [isLoading, setIsLoading] = useState(false); // Loading state for form submission
  const [error, setError] = useState(null); // Error state for form submission

  // Fetch branches from Firestore
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "branches"));
        const branchList = querySnapshot.docs.map((doc) => doc.data().branch_name);
        setBranches(branchList);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    fetchBranches();
  }, []);

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    try {
      // Check if email already exists in Firestore
      const querySnapshot = await getDocs(collection(db, "users"));
      const emailExists = querySnapshot.docs.some((doc) => doc.data().email === formData.email);
  
      if (emailExists) {
        alert("This email is already registered. Please use another email.");
        return;
      }
  
      // Create the user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user; // Get the UID from Auth
  
      const fullName = `${formData.name} ${formData.lastName}`;
  
      // Add to Firestore - staff collection (using UID as document ID)
      await setDoc(doc(db, "staff", user.uid), {
        email: formData.email,
        fullName,
        name: formData.name,
        lastName: formData.lastName,
        phone: formData.phone,
        role: formData.role,
        branch: formData.branch,
        workId: formData.workId,
        status: formData.status,
        uid: user.uid, // Ensure UID is stored
        createdAt: new Date(),
      });
  
      // Add to Firestore - users collection (using UID as document ID)
      await setDoc(doc(db, "users", user.uid), {
        email: formData.email,
        fullName,
        name: formData.name,
        lastName: formData.lastName,
        phone: formData.phone,
        role: formData.role,
        branch: formData.branch,
        workId: formData.workId,
        status: formData.status,
        uid: user.uid, // Ensure UID is stored
        createdAt: new Date(),
      });
  
      // Add to Realtime Database (using UID as the key)
      await set(ref(realTimeDB, `staff/${user.uid}`), {
        email: formData.email,
        fullName,
        name: formData.name,
        lastName: formData.lastName,
        phone: formData.phone,
        role: formData.role,
        branch: formData.branch,
        workId: formData.workId,
        status: formData.status,
        uid: user.uid, // Ensure UID is stored
        createdAt: new Date(),
      });
  
      await set(ref(realTimeDB, `users/${user.uid}`), {
        email: formData.email,
        fullName,
        phone: formData.phone,
        role: formData.role,
        branch: formData.branch,
        workId: formData.workId,
        status: formData.status,
        uid: user.uid,
        createdAt: new Date().toISOString(),
      });
  
      alert("Registration submitted successfully!");
      setFormData({
        name: "",
        lastName: "",
        email: "",
        phone: "",
        role: "",
        branch: "",
        workId: "",
        password: "",
        confirmPassword: "",
        status: "pending",
      });
    } catch (error) {
      console.error("Error registering staff:", error);
      alert("Registration failed! Please try again.");
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-white text-2xl font-bold text-center mb-4">
          Register to request access to the platform
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>} {/* Show error message */}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="p-2 bg-gray-700 text-white rounded"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Enter your Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="p-2 bg-gray-700 text-white rounded"
              required
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="p-2 w-full bg-gray-700 text-white rounded mt-4"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            className="p-2 w-full bg-gray-700 text-white rounded mt-4"
            required
          />

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
            <option value="Supervisor">Supervisor</option>
          </select>

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

          <input
            type="text"
            name="workId"
            placeholder="Enter your work identification number"
            value={formData.workId}
            onChange={handleChange}
            className="p-2 w-full bg-gray-700 text-white rounded mt-4"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="p-2 w-full bg-gray-700 text-white rounded mt-4"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="p-2 w-full bg-gray-700 text-white rounded mt-4"
            required
          />

          <button
            type="submit"
            className="w-full bg-red-600 text-white p-2 rounded mt-4 hover:bg-red-700"
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? "Submitting..." : "Request Access"}
          </button>
        </form>

        <p className="text-white text-center mt-4">
          Already have access? <a href="#" className="text-red-500">Login</a>
        </p>
      </div>
    </div>
  );
};

export default StaffRegister;
