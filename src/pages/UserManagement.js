// UserManagement.jsx
import React, { useState, useEffect } from "react";
import "../styles/UserManagement.css";
import { db, realTimeDB, auth } from "../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { ref, onValue, update } from "firebase/database";
import { toast } from "react-toastify";

const UserManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [pendingAdmins, setPendingAdmins] = useState([]);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [currentUserRole, setCurrentUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPendingAdmins, setShowPendingAdmins] = useState(false);
  const [showPendingUsers, setShowPendingUsers] = useState(false);
  const [showRemovedAdmins, setShowRemovedAdmins] = useState(false);
  const [showRestrictedUsers, setShowRestrictedUsers] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        onSnapshot(userRef, (doc) => {
          if (doc.exists()) {
            setCurrentUserRole(doc.data().role);
          }
        });
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, "staff"),
      where("role", "==", "Supervisor"),
      where("status", "==", "active")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const adminList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        email: doc.data().email || "",
        branch_name: doc.data().branch_name || "",
        ...doc.data(),
      }));
      setAdmins(adminList);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, "staff"),
      where("role", "==", "Supervisor"),
      where("status", "==", "pending")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const pendingAdminList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        email: doc.data().email || "",
        branch_name: doc.data().branch || "",
        ...doc.data(),
      }));
      setPendingAdmins(pendingAdminList);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const usersRef = ref(realTimeDB, "users");
    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const activeList = Object.entries(data)
          .filter(
            ([_, user]) => user.role === "client" && user.status === "active"
          )
          .map(([id, user]) => ({
            id,
            email: user.email || "",
            branch_name: user.branch_name || "",
            packageCategory: user.packageCategory || "",
            ...user,
          }));
        setActiveUsers(activeList);

        const pendingList = Object.entries(data)
          .filter(
            ([_, user]) => user.role === "client" && user.status === "pending"
          )
          .map(([id, user]) => ({
            id,
            email: user.email || "",
            branch_name: user.branch_name || "",
            packageCategory: user.packageCategory || "",
            ...user,
          }));
        setPendingUsers(pendingList);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleRemoveAdmin = async (adminId) => {
    if (currentUserRole !== "super_Admin") {
      toast.error("Only Super Admins can remove admins");
      return;
    }
    try {
      await update(ref(realTimeDB, `users/${adminId}`), {
        role: "client",
      });
      await updateDoc(doc(db, "staff", adminId), {
        role: "client",
      });
      toast.success("Admin removed successfully");
    } catch (error) {
      toast.error("Error removing admin: " + error.message);
    }
  };

  const handleAccess = async (userId, action) => {
    if (currentUserRole !== "Supervisor" && currentUserRole !== "super_Admin") {
      toast.error("Only Supervisors and Super Admins can manage user access");
      return;
    }

    try {
      const updates = {
        updatedAt: new Date().toISOString(),
      };

      if (action === "accept") {
        updates.status = "active";
        toast.success("User access approved successfully");
      } else if (action === "decline") {
        updates.status = "restricted";
        toast.success("User access declined successfully");
      }

      await update(ref(realTimeDB, `users/${userId}`), updates);
    } catch (error) {
      toast.error(`Error managing access: ${error.message}`);
    }
  };

  const handleAdminRequest = async (adminId, action) => {
    if (currentUserRole !== "super_Admin") {
      toast.error("Only Super Admins can manage admin requests");
      return;
    }

    try {
      const updates = {
        updatedAt: new Date().toISOString(),
      };

      if (action === "accept") {
        updates.status = "active";
        toast.success("Admin request approved successfully");
      } else if (action === "decline") {
        updates.status = "restricted";
        toast.success("Admin request declined successfully");
      }

      await update(ref(realTimeDB, `staff/${adminId}`), updates);
      await updateDoc(doc(db, "staff", adminId), updates);
    } catch (error) {
      toast.error(`Error managing admin request: ${error.message}`);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    
    <div className="user-management">
      <h2>User Management</h2>
      <div className="requests">
        <div className="request-box">
          <h4>Pending Admin Requests</h4>
          <p className="counters">{pendingAdmins.length}</p>
          <a
            href="#"
            className="viewall"
            onClick={(e) => {
              e.preventDefault();
              setShowPendingAdmins(true);
            }}
          >
            View All
          </a>
        </div>
        <div className="request-box">
          <h4>Pending User Requests</h4>
          <p className="counters">{pendingUsers.length}</p>
          <a
            href="#"
            className="viewall"
            onClick={(e) => {
              e.preventDefault();
              setShowPendingUsers(true);
            }}
          >
            View All
          </a>
        </div>
        <div className="request-box">
          <h4>Removed Admins</h4>
          <p className="counters">{pendingUsers.length}</p>
          <a
            href="#"
            className="viewall"
            onClick={(e) => {
              e.preventDefault();
              setShowRemovedAdmins(true);
            }}
          >
            View All
          </a>
        </div>
        <div className="request-box">
          <h4>Restricted Users</h4>
          <p className="counters">{pendingUsers.length}</p>
          <a
            href="#"
            className="viewall"
            onClick={(e) => {
              e.preventDefault();
              setShowRestrictedUsers(true);
            }}
          >
            View All
          </a>
        </div>
      </div>

      {/* Modals */}
      {showPendingAdmins && (
        <div className="modal" onClick={() => setShowPendingAdmins(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="top-content">
              <h4>Pending Admin Requests</h4>
              <p onClick={() => setShowPendingAdmins(false)}>X</p>
            </div>
            <div className="list">
              {pendingAdmins.map((admin) => (
                <div key={admin.id} className="list-item">
                  <p>
                    {admin.email} - {admin.branch_name}
                  </p>
                  <p>Joined: {new Date(admin.joined).toLocaleDateString()}</p>
                  <p>Work ID: {admin.workId}</p>
                  <div>
                    <a
                      href="#"
                      className="accept"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAdminRequest(admin.id, "accept");
                      }}
                    >
                      Accept
                    </a>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAccess(admin.id, "decline");
                      }}
                    >
                      <img
                        src=""
                        alt="Decline"
                        className="decline-image"
                      />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showPendingUsers && (
        <div className="modal" onClick={() => setShowPendingUsers(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="top-content">
            <h4>Pending Requests </h4>
            <p onClick={() => setShowPendingUsers(false)}>X</p>
            </div>
            <div className="list">
              {pendingUsers.map((user) => (
                <div key={user.id} className="list-item">
                  <p>{user.email}</p>
                  <p>Role: {user.role || "Trainer"}</p>
                  <p>Work ID: {user.workId || "N/A"}</p>
                  <p>
                    Requested:{" "}
                    {new Date(
                      user.requested || user.joined
                    ).toLocaleDateString()}
                  </p>
                  <div>
                    <a
                      href="#"
                      className="accept"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAccess(user.id, "accept");
                      }}
                    >
                      <span className="checkmark">✔</span>
                    </a>
                    <a
                      href="#"
                      className="decline"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAccess(user.id, "decline");
                      }}
                    >

                    </a>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {showRemovedAdmins && (
       <div className="modal" onClick={() => setShowRemovedAdmins(false)}>
       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
       <div className="top-content">
         <h4>Removed Admins </h4>
         <p onClick={() => setShowRemovedAdmins(false)}>X</p>
         </div>
         <div className="list">
           {pendingUsers.map((user) => (
             <div key={user.id} className="list-item">
               <p>{user.email}</p>
               <p>Role: {user.role || "Trainer"}</p>
               <p>Work ID: {user.workId || "N/A"}</p>
               <p>
                 Requested:{" "}
                 {new Date(
                   user.requested || user.joined
                 ).toLocaleDateString()}
               </p>
               <div>
                 <a
                   href="#"
                   className="accept"
                   onClick={(e) => {
                     e.preventDefault();
                     handleAccess(user.id, "accept");
                   }}
                 >
                   <span className="checkmark">✔</span>
                 </a>
                 <a
                   href="#"
                   className="decline"
                   onClick={(e) => {
                     e.preventDefault();
                     handleAccess(user.id, "decline");
                   }}
                 >

                 </a>
               </div>
             </div>
           ))}
         </div>
         </div>
        </div>
      )}

      {showRestrictedUsers && (
        <div className="modal" onClick={() => setShowRestrictedUsers(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
       <div className="top-content">
         <h4>Removed Admins </h4>
         <p onClick={() => setShowRestrictedUsers(false)}>X</p>
         </div>
         <div className="list">
           {pendingUsers.map((user) => (
             <div key={user.id} className="list-item">
               <p>{user.email}</p>
               <p>Role: {user.role || "Trainer"}</p>
               <p>Work ID: {user.workId || "N/A"}</p>
               <p>
                 Requested:{" "}
                 {new Date(
                   user.requested || user.joined
                 ).toLocaleDateString()}
               </p>
               <div>
                 <a
                   href="#"
                   className="accept"
                   onClick={(e) => {
                     e.preventDefault();
                     handleAccess(user.id, "accept");
                   }}
                 >
                   <span className="checkmark">✔</span>
                 </a>
                 <a
                   href="#"
                   className="decline"
                   onClick={(e) => {
                     e.preventDefault();
                     handleAccess(user.id, "decline");
                   }}
                 >

                 </a>
               </div>
             </div>
           ))}
          </div>
        </div>
        </div>
      )}

      {/* Admins and Active Users Tables */}
      <section className="table-section">
        <h4>Admins</h4>
        <table>
          <thead>
            <tr>
              <th>Admin Name</th>
              <th>Location Name</th>
              <th>Joined</th>
              <th>Work ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td>{admin.email}</td>
                <td>{admin.branch_name}</td>
                <td>{new Date(admin.joined).toLocaleDateString()}</td>
                <td>{admin.workId}</td>
                <td>
                  <a
                    href="#"
                    className="remove"
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemoveAdmin(admin.id);
                    }}
                  >
                    Remove admin
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="table-section">
        <h4>Active Users</h4>
        <table>
          <thead>
            <tr>
              <th>User Email</th>
              <th>Location Name</th>
              <th>Subscription Package</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {activeUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>{user.branch_name}</td>
                <td>{user.packageCategory}</td>
                <td>{new Date(user.joined).toLocaleDateString()}</td>
                <td>
                  <a
                    href="#"
                    className="restrict"
                    onClick={(e) => {
                      e.preventDefault();
                      handleAccess(user.id, "decline");
                    }}
                  >
                    Restrict Access
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default UserManagement;
