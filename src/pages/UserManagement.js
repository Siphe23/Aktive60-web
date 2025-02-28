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
  getDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { ref, onValue, update } from "firebase/database";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

const UserManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [pendingAdmins, setPendingAdmins] = useState([]);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [removedAdmins, setRemovedAdmins] = useState([]);
  const [restrictedUsers, setRestrictedUsers] = useState([]);
  const [currentUserRole, setCurrentUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPendingAdmins, setShowPendingAdmins] = useState(false);
  const [showPendingUsers, setShowPendingUsers] = useState(false);
  const [showRemovedAdmins, setShowRemovedAdmins] = useState(false);
  const [showRestrictedUsers, setShowRestrictedUsers] = useState(false);
  const [currentUserData, setCurrentUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        onSnapshot(userRef, (doc) => {
          if (doc.exists()) {
            const data = doc.data();
            setCurrentUserRole(data.role);
            // Set user data (e.g., name, avatar, etc.)
            setCurrentUserData({
              uid: user.uid,
              email: user.email,
              name: data.name || "Guest", // Adjust based on your Firestore schema
              lastName: data.lastName || "",
              avatar: data.avatar || "default-avatar.png", // Default avatar if none exists
              ...data, // Include any other relevant fields
            });
          }
        });
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

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

  // Active Admins (Supervisors) from Firestore
  useEffect(() => {
    const q = query(
      collection(db, "staff"),
      where("role", "==", "Supervisor"),
      where("status", "==", "active")
    );

    let unsubscribeRealtime;

    const unsubscribeFirestore = onSnapshot(q, (querySnapshot) => {
      const firestoreAdmins = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        email: doc.data().email || "",
        branch_name: doc.data().branch || doc.data().branch_name || "",
        source: "firestore",
        ...doc.data(),
      }));

      const staffRef = ref(realTimeDB, "staff");

      unsubscribeRealtime = onValue(staffRef, (snapshot) => {
        const data = snapshot.val();
        const realtimeAdmins = data
          ? Object.entries(data)
              .filter(
                ([_, staff]) =>
                  staff.role === "Supervisor" && staff.status === "active"
              )
              .map(([id, staff]) => ({
                id,
                email: staff.email || "",
                branch_name: staff.branch_name || staff.branch || "",
                source: "realtime",
                ...staff,
              }))
          : [];

        // Merge Firestore and Realtime Database data
        setAdmins([...firestoreAdmins, ...realtimeAdmins]);
      });
    });

    return () => {
      unsubscribeFirestore();
      if (unsubscribeRealtime) unsubscribeRealtime();
    };
  }, []);

  // Pending Admins from both Firestore and Realtime Database
  useEffect(() => {
    const q = query(
      collection(db, "staff"),
      where("role", "==", "Supervisor"),
      where("status", "==", "pending")
    );
    let unsubscribeRealtime;
    const unsubscribeFirestore = onSnapshot(q, (querySnapshot) => {
      const firestoreAdmins = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        email: doc.data().email || "",
        branch_name: doc.data().branch || doc.data().branch_name || "",
        source: "firestore",
        ...doc.data(),
      }));

      const staffRef = ref(realTimeDB, "staff");
      unsubscribeRealtime = onValue(staffRef, (snapshot) => {
        const data = snapshot.val();
        const realtimeAdmins = data
          ? Object.entries(data)
              .filter(
                ([_, staff]) =>
                  staff.role === "Supervisor" && staff.status === "pending"
              )
              .map(([id, staff]) => ({
                id,
                email: staff.email || "",
                branch_name: staff.branch_name || staff.branch || "",
                source: "realtime",
                ...staff,
              }))
          : [];

        setPendingAdmins([...firestoreAdmins, ...realtimeAdmins]);
      });
    });

    return () => {
      unsubscribeFirestore();
      if (unsubscribeRealtime) unsubscribeRealtime();
    };
  }, []);

  // Active, Pending, and Restricted Users from Realtime Database
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
            branch_name: user.branch_name || user.branch || "",
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
            branch_name: user.branch_name || user.branch || "",
            packageCategory: user.packageCategory || "",
            ...user,
          }));
        setPendingUsers(pendingList);

        const restrictedList = Object.entries(data)
          .filter(
            ([_, user]) =>
              user.role === "client" && user.status === "restricted"
          )
          .map(([id, user]) => ({
            id,
            email: user.email || "",
            branch_name: user.branch_name || user.branch || "",
            packageCategory: user.packageCategory || "",
            ...user,
          }));
        setRestrictedUsers(restrictedList);
      }
    });
    return () => unsubscribe();
  }, []);

  // Removed Admins from Firestore
  // Removed Admins from both Firestore and Realtime Database
  useEffect(() => {
    let unsubscribeRealtime;

    // Firestore Query for Removed Admins
    const q = query(
      collection(db, "staff"),
      where("role", "==", "Supervisor"),
      where("status", "==", "removed")
    );

    const unsubscribeFirestore = onSnapshot(q, (querySnapshot) => {
      const firestoreRemovedAdmins = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        email: doc.data().email || "",
        branch_name: doc.data().branch || doc.data().branch_name || "",
        source: "firestore",
        ...doc.data(),
      }));

      // Realtime Database Query for Removed Admins
      const staffRef = ref(realTimeDB, "staff");
      unsubscribeRealtime = onValue(staffRef, (snapshot) => {
        const data = snapshot.val();
        const realtimeRemovedAdmins = data
          ? Object.entries(data)
              .filter(
                ([_, staff]) =>
                  staff.role === "Supervisor" && staff.status === "removed"
              )
              .map(([id, staff]) => ({
                id,
                email: staff.email || "",
                branch_name: staff.branch_name || staff.branch || "",
                source: "realtime",
                ...staff,
              }))
          : [];

        // Merge Firestore and Realtime Database removed admins
        setRemovedAdmins([...firestoreRemovedAdmins, ...realtimeRemovedAdmins]);
      });
    });

    return () => {
      unsubscribeFirestore();
      if (unsubscribeRealtime) unsubscribeRealtime();
    };
  }, []);

  const handleRemoveAdmin = async (adminId, source) => {
    if (currentUserRole !== "super_Admin") {
      toast.error("Only Super Admins can remove admins");
      return;
    }

    try {
      const updates = {
        role: "Supervisor",
        status: "removed",
        updatedAt: new Date().toISOString(),
      };

      // Update based on source
      if (source === "firestore") {
        const staffDocRef = doc(db, "staff", adminId);
        const docSnap = await getDoc(staffDocRef);
        if (docSnap.exists()) {
          await updateDoc(staffDocRef, updates);
          console.log(`Admin ${adminId} updated in Firestore`);
        } else {
          console.log(`Admin ${adminId} not found in Firestore`);
        }
      }

      if (source === "realtime") {
        await update(ref(realTimeDB, `staff/${adminId}`), updates);
        console.log(`Admin ${adminId} updated in Realtime Database`);
      }

      toast.success("Admin removed successfully");
    } catch (error) {
      console.error("Error removing admin:", error);
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

  const handleAdminRequest = async (adminId, action, source = "firestore") => {
    if (currentUserRole !== "super_Admin") {
      toast.error("Only Super Admins can manage admin requests");
      return;
    }

    try {
      const updates = {
        role: "Supervisor",
        status: action === "accept" ? "active" : "removed",
        updatedAt: new Date().toISOString(),
      };

      const staffDocRef = doc(db, "staff", adminId);
      const docSnap = await getDoc(staffDocRef);

      const updatePromises = [];

      // If document exists in Firestore or source is Firestore, update it
      if (docSnap.exists() || source === "firestore") {
        updatePromises.push(updateDoc(staffDocRef, updates));
      }

      // Always update Realtime Database
      updatePromises.push(update(ref(realTimeDB, `staff/${adminId}`), updates));

      await Promise.all(updatePromises);

      console.log(
        `Admin request ${adminId} ${
          action === "accept" ? "accepted" : "declined and marked as removed"
        } (Source: ${source})`
      );
      toast.success(
        `Admin request ${
          action === "accept" ? "approved" : "declined"
        } successfully`
      );

      setShowPendingAdmins(false);
    } catch (error) {
      console.error(`Error managing admin request:`, error);
      toast.error(`Error managing admin request: ${error.message}`);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="user-management">
      {/* Pass currentUserData as userData to Navbar */}
      <Navbar userData={currentUserData} currentUserRole={currentUserRole} />
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
          <p className="counters">{removedAdmins.length}</p>
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
          <p className="counters">{restrictedUsers.length}</p>
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
                  <p>Work ID: {admin.workId || "N/A"}</p>
                  <div>
                    <a
                      href="#"
                      className="accept"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAdminRequest(admin.id, "accept", admin.source);
                      }}
                    >
                      Accept
                    </a>
                    <a
                      href="#"
                      className="decline"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAdminRequest(admin.id, "decline", admin.source);
                      }}
                    >
                    Decline
                      {/* <img src="" alt="Decline" className="decline-image" /> */}
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
              <h4>Pending Requests</h4>
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
                    ></a>
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
              <h4>Removed Admins</h4>
              <p onClick={() => setShowRemovedAdmins(false)}>X</p>
            </div>
            <div className="list">
              {removedAdmins.map((admin) => (
                <div key={admin.id} className="list-item">
                  <p>
                    {admin.email} - {admin.branch_name}
                  </p>
                  <p>Joined: {new Date(admin.joined).toLocaleDateString()}</p>
                  <p>Work ID: {admin.workId || "N/A"}</p>
                  <div>
                    <a
                      href="#"
                      className="accept"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAdminRequest(admin.id, "accept");
                      }}
                    >
                      <span className="checkmark">✔</span>
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
              <h4>Restricted Users</h4>
              <p onClick={() => setShowRestrictedUsers(false)}>X</p>
            </div>
            <div className="list">
              {restrictedUsers.map((user) => (
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
              <th>Admin Email</th>
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
                      handleRemoveAdmin(admin.id, admin.source);
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
