import React, { useEffect, useState } from "react";
import "../../styles/BranchPackages.css";
import { FaEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { ref, onValue, push, set } from "firebase/database";
import { realTimeDB } from "../../firebase"; // ✅ Import Firebase

const BranchPackages = () => {
  const [packages, setPackages] = useState([]);

  // ✅ Fetch services from Firebase on component mount
  useEffect(() => {
    const servicesRef = ref(realTimeDB, "services"); // Reference "services" table

    onValue(servicesRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const loadedPackages = Object.keys(data).map((key) => ({
          id: key,
          title: data[key].title,
          details: data[key].details || [],
        }));
        setPackages(loadedPackages);
      } else {
        console.log("No services found.");
        setPackages([]);
      }
    }, (error) => {
      console.error("Error fetching services:", error);
    });
  }, []);

  // ✅ Function to add a new service
  const addNewPackage = () => {
    const newTitle = prompt("Enter package title:");
    if (!newTitle) return;

    const newDetails = prompt("Enter package details (comma-separated):");
    if (!newDetails) return;

    const detailsArray = newDetails.split(",").map(item => item.trim());

    const servicesRef = ref(realTimeDB, "services");
    const newServiceRef = push(servicesRef);

    set(newServiceRef, {
      title: newTitle,
      details: detailsArray,
    }).then(() => {
      console.log("New service added!");
    }).catch((error) => {
      console.error("Error adding service:", error);
    });
  };

  return (
    <div className="branch-packages">
      <h2 className="branch-title">Branch Packages</h2>
      <button className="add-package-btn" onClick={addNewPackage}>
        <IoMdAdd /> Add new package
      </button>
      <div className="packages-grid">
        {packages.map((pkg) => (
          <div key={pkg.id} className="package-card">
            <h3 className="package-title">
              {pkg.title} <FaEdit className="edit-icon" />
            </h3>
            <div className="package-details">
              {pkg.details.map((detail, i) => (
                <p key={i}>{detail}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BranchPackages;
