import React, { useState, useEffect } from "react";
import "../styles/UserManagement.css";
import { db, realTimeDB, auth } from "../firebase";
import { collection, query, where, onSnapshot, doc } from "firebase/firestore";
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

  // Previous useEffect hooks remain unchanged
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
      where("status", "==", "active"),
      
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const adminList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        email: doc.data().email || "",
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
      where("status", "==", "pending"),
      
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const pendingAdminList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        email: doc.data().email || "",
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
      toast.success("Admin removed successfully");
    } catch (error) {
      toast.error("Error removing admin: " + error.message);
    }
  };

  // Updated handleAccess function with accept/decline options
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

  if (loading) return <div>Loading...</div>;

  return (
    <div className="user-management">
      <h2>User Management</h2>
      <div className="requests">
        <div className="request-box">
          <h4>Pending Admin Requests</h4>
          <p>{pendingAdmins.length}</p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setShowPendingAdmins(!showPendingAdmins);
            }}
          >
            View All
          </a>
        </div>
        <div className="request-box">
          <h4>Pending User Requests</h4>
          <p>{pendingUsers.length}</p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setShowPendingUsers(!showPendingUsers);
            }}
          >
            View All
          </a>
        </div>
      </div>

      {showPendingAdmins && (
        <section className="table-section">
          <h4>Pending Admin Requests</h4>
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
              {pendingAdmins.map((admin) => (
                <tr key={admin.id}>
                  <td>{admin.email}</td>
                  <td>{admin.location}</td>
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
      )}

      {showPendingUsers && (
        <section className="table-section">
          <h4>Pending User Requests</h4>
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
              {pendingUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.email}</td>
                  <td>{user.location}</td>
                  <td>{user.subscriptionPackage}</td>
                  <td>{new Date(user.joined).toLocaleDateString()}</td>
                  <td>
                    <a
                      href="#"
                      className="accept"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAccess(user.id, "accept");
                      }}
                    >
                      Accept
                    </a>
                    <a
                      href="#"
                      className="decline"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAccess(user.id, "decline");
                      }}
                    >
                      Decline
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

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
                <td>{admin.location}</td>
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
                <td>{user.location}</td>
                <td>{user.subscriptionPackage}</td>
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
