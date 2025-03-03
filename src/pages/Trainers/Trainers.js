import React, { useState, useEffect } from "react";
import Sidebar from "../../../src/components/Sidebar";
import NavigationBar from "../../../src/components/Navbar";
import "../../../src/styles/Trainers.css";
import { db } from "../../../src/firebase";
import { collection, getDocs } from "firebase/firestore";
import "react-toastify/dist/ReactToastify.css";

const Trainers = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const trainersData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.role === "client") {
            trainersData.push({
              id: doc.id,
              name: data.name,
              assignedClients: data.assignedClients || 0,
              totalSessions: data.totalSessions || 0,
              location: data.location || "Not specified",
              availability: data.availability || "Not Available",
              profileImage: data.profileImage || "https://via.placeholder.com/100", // Default avatar
            });
          }
        });
        setTrainers(trainersData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching trainers:", err);
        setError("Failed to fetch trainers. Please try again later.");
        setLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="dashboard-container">
      <NavigationBar />
      <div className="main-content">
        <Sidebar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
        <div className={`content ${isExpanded ? "expanded" : "collapsed"}`}>
          <div className="container">
            <div className="header">
              <h2 className="title">Trainers Overview</h2>
            </div>
            {trainers.length === 0 ? (
              <div className="no-trainers">No Trainers in the branch</div>
            ) : (
              <div className="trainer-cards">
                {trainers.map((trainer) => (
                  <div key={trainer.id} className="trainer-card">
                    <img src={trainer.profileImage} alt={trainer.name} className="trainer-image" />
                    <div className="trainer-info">
                      <div className="trainer-name">{trainer.name}</div>
                      <div className="trainer-details">
                        <div>Assigned Clients: {trainer.assignedClients}</div>
                        <div>Total Sessions This Week: {trainer.totalSessions}</div>
                        <div>Location: {trainer.location}</div>
                      </div>
                      <div className="availability-status">
                        Current Availability Status: {trainer.availability}
                      </div>
                    </div>
                    <button className="details-btn small">Profile</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trainers;
