import React, { useState } from "react";
import "../../styles/BranchPackages.css";
import { FaEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

const BranchPackages = () => {
  const [packages, setPackages] = useState([
    {
      title: "PERSONALISED MEAL PLANS & PROGRAMS",
      details: ["4 Weeks - R400", "8 Weeks - R700", "12 Weeks - R1200"],
    },
    {
      title: "ONE-ON-ONE SESSIONS",
      details: [
        "Single Session: R200.00",
        "1 session per week R900 PM",
        "2 sessions per week R1400 PM",
        "3 sessions per week R1700 PM",
      ],
    },
    {
      title: "ONLINE HOURLY SESSIONS",
      details: ["R300"],
    },
    {
      title: "GROUP SESSIONS",
      details: [
        "1 session per week - R1200 PM",
        "2 sessions per week - R1600 PM",
        "3 sessions per week - R2000 PM",
      ],
    },
  ]);

  return (
    <div className="branch-packages">
      <h2 className="branch-title">Branch Packages</h2>
      <button className="add-package-btn">
        <IoMdAdd /> Add new package
      </button>
      <div className="packages-grid">
        {packages.map((pkg, index) => (
          <div key={index} className="package-card">
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
