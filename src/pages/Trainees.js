import React, { useState, useEffect } from "react";
import Sidebar from "../../src/components/Sidebar";
import NavigationBar from "../../src/components/Navbar";
import "../../src/styles/Trainers.css";
import { realTimeDB } from "../../src/firebase";
import { ref, onValue } from "firebase/database";
import "react-toastify/dist/ReactToastify.css";

const Trainees = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const fetchMembers = () => {
      try {
        const membersRef = ref(realTimeDB, "members"); // Reference to the "members" node in Realtime Database
        onValue(membersRef, (snapshot) => {
          const membersData = [];
          snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();
            membersData.push({
              id: childSnapshot.key, // Use the key as the ID
              email: data.email,
              fullName: data.fullName,
              gymLocation: data.gymLocation,
              joinDate: data.joinDate,
              memberId: data.memberId,
            });
          });
          setMembers(membersData);
          setLoading(false);
        });
      } catch (err) {
        console.error("Error fetching members:", err);
        setError("Failed to fetch members. Please try again later.");
        setLoading(false);
      }
    };

    fetchMembers();
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
              <h2 className="title">Trainees</h2>
              <p className="subtitle">Total: {members.length}</p>
            </div>
            <div className="trainer-cards">
              {members.map((member) => (
                <div key={member.id} className="trainer-card">
                  <div className="trainer-info">
                    <div className="trainer-name">Member Name: {member.fullName}</div>
                    <div className="trainer-details">
                      <div>Email: {member.email}</div>
                      <div>Gym Location: {member.gymLocation}</div>
                      <div>Joined: {new Date(member.joinDate).toLocaleDateString()}</div>
                    </div>
                    <div className="availability-status">
                      Member ID: {member.memberId}
                    </div>
                  </div>
                  <button className="details-btn">See full details</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trainees;