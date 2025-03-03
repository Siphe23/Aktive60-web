import React, { useState, useEffect } from "react";
import { db, realTimeDB, auth } from "../firebase";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { ref, set } from "firebase/database";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "../styles/StaffRegister.css";
import RegisterLogo from '../assets/Aktiv60.png';

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
    status: "pending",
  });

  const [branches, setBranches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [passwordError, setPasswordError] = useState("");
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "branches"));
        const branchList = querySnapshot.docs.map((doc) => doc.data().branch_name);
        setBranches(branchList);
      } catch (error) {
        console.error("Error fetching branches:", error);
        setError("Failed to fetch branches.");
      }
    };

    fetchBranches();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Password validation checks on each change
    if (e.target.name === "password") {
      const password = e.target.value;
      setPasswordValidation({
        minLength: /.{8,}/.test(password),
        hasNumber: /\d/.test(password),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      });
    }
  };

  const validatePassword = (password) => {
    const minLength = /.{8,}/; // At least 8 characters
    const number = /\d/; // At least one number
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/; // At least one special character

    if (!minLength.test(password)) {
      return "Password must be at least 8 characters.";
    } else if (!number.test(password)) {
      return "Password must contain at least one number.";
    } else if (!specialChar.test(password)) {
      return "Password must contain at least one special character.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const passwordValidationError = validatePassword(formData.password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }

    try {
      setIsLoading(true);
      const querySnapshot = await getDocs(collection(db, "users"));
      const emailExists = querySnapshot.docs.some((doc) => doc.data().email === formData.email);

      if (emailExists) {
        alert("This email is already registered. Please use another email.");
        setIsLoading(false);
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      const fullName = `${formData.name} ${formData.lastName}`;

      // Add staff data to Firestore
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
        uid: user.uid,
        createdAt: new Date(),
      });

      // Add user data to Firestore
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
        uid: user.uid,
        createdAt: new Date(),
      });

      // Add staff data to Firebase Realtime Database
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
        uid: user.uid,
        createdAt: new Date(),
      });

      // Add user data to Firebase Realtime Database
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="">
      <img src={RegisterLogo} alt="Logo" className="Register-logo" />
        <h2 className="Register-logo-text">
          Register to request access to the platform
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}
   <form onSubmit={handleSubmit}>
  <div className="grid grid-cols-2">
    <div>
      <p>First Name</p>
      <input
        type="text"
        name="name"
        placeholder="Enter your first name"
        value={formData.name}
        onChange={handleChange}
        className="Register-input"
        required
      />
    </div>
    <div>
      <p>Branch Location</p>
      <select
        name="branch"
        value={formData.branch}
        onChange={handleChange}
        className="Register-input"
        required
      >
        <option value="">--Select your branch location--</option>
        {branches.map((branch, index) => (
          <option key={index} value={branch}>
            {branch}
          </option>
        ))}
      </select>
    </div>
    <div>
      <p>Last Name</p>
      <input
        type="text"
        name="lastName"
        placeholder="Enter your last name"
        value={formData.lastName}
        onChange={handleChange}
        className="Register-input"
        required
      />
    </div>
    <div>
      <p>Work ID</p>
      <input
        type="text"
        name="workId"
        placeholder="Enter your work identification number"
        value={formData.workId}
        onChange={handleChange}
        className="Register-input"
        required
      />
    </div>

    <div>
      <p>Email</p>
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
        className="Register-input"
        required
      />
    </div>
    <div>
      <p>Password</p>
      <input
        type="password"
        name="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
        className="Register-input"
        required
      />
      <div className="password-validation">
        <ul>
          <li className={passwordValidation.minLength ? "valid" : "invalid"}>
            Eight Characters
          </li>
          <li className={passwordValidation.hasNumber ? "valid" : "invalid"}>
            One number
          </li>
          <li
            className={passwordValidation.hasSpecialChar ? "valid" : "invalid"}
          >
            One special character
          </li>
        </ul>
      </div>
    </div>
   

    <div>
      <p>Phone</p>
      <input
        type="text"
        name="phone"
        placeholder="Enter your phone number"
        value={formData.phone}
        onChange={handleChange}
        className="Register-phone"
        required
      />
    </div>
    <div>
      <p>Confirm your password</p>
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm your password"
        value={formData.confirmPassword}
        onChange={handleChange}
        className="Register-input"
        required
      />
    </div>

    <div>
      <p>Role</p>
      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        className="Register-input"
        required
      >
        <option value="">--Select your role--</option>
        <option value="Trainer">Trainer</option>
        <option value="Staff">Staff</option>
        <option value="Supervisor">Supervisor</option>
      </select>
    </div>

   

  

    

 

  </div>

  {passwordError && (
    <p className="text-red-500 text-sm">{passwordError}</p>
  )}

  <button
    type="submit"
    className="w-full bg-red-600 text-white p-2 rounded mt-4 hover:bg-red-700"
    disabled={isLoading}
  >
    {isLoading ? "Submitting..." : "Request Access"}
  </button>

  <p className="login-link">
  Already have access?{" "}
  <a href="/staff-login" className="text-red-500">
    Login
  </a>
</p>

</form>


  
      </div>
    </div>
  );
};

export default StaffRegister;
