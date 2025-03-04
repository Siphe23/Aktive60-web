// UserManagement.jsx
import React, { useState, useEffect } from "react";
import "../styles/UserManagement.css";
import { realTimeDB, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ref, onValue, update } from "firebase/database";
import { toast } from "react-toastify";

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = ref(realTimeDB, `users/${user.uid}`);
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setCurrentUserRole(data.role);
          }
        });
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const staffRef = ref(realTimeDB, "users");
    const unsubscribe = onValue(staffRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Active Admins (Supervisors)
        const adminList = Object.entries(data)
          .filter(
            ([_, user]) =>
              user.role === "Supervisor" && user.status === "active"
          )
          .map(([id, user]) => ({
            id,
            email: user.email || "",
            branch_name: user.branch_name || "",
            ...user,
          }));
        setAdmins(adminList);

        // Pending Admins
        const pendingAdminList = Object.entries(data)
          .filter(
            ([_, user]) =>
              user.role === "Supervisor" && user.status === "pending"
          )
          .map(([id, user]) => ({
            id,
            email: user.email || "",
            branch_name: user.branch_name || "",
            ...user,
          }));
        setPendingAdmins(pendingAdminList);

        // Removed Admins
        const removedAdminList = Object.entries(data)
          .filter(
            ([_, user]) =>
              user.role === "Supervisor" && user.status === "restricted"
          )
          .map(([id, user]) => ({
            id,
            email: user.email || "",
            branch_name: user.branch_name || "",
            ...user,
          }));
        setRemovedAdmins(removedAdminList);

        // Active Users (Clients)
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

        // Pending Users
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

        // Restricted Users
        const restrictedList = Object.entries(data)
          .filter(
            ([_, user]) =>
              user.role === "client" && user.status === "restricted"
          )
          .map(([id, user]) => ({
            id,
            email: user.email || "",
            branch_name: user.branch_name || "",
            packageCategory: user.packageCategory || "",
            ...user,
          }));
        setRestrictedUsers(restrictedList);
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
        status: "restricted",
        updatedAt: new Date().toISOString(),
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

      await update(ref(realTimeDB, `users/${adminId}`), updates);
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
                      className="decline"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAdminRequest(admin.id, "decline");
                      }}
                    >
                      Decline
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
              <h4>Pending User Requests</h4>
              <p onClick={() => setShowPendingUsers(false)}>X</p>
            </div>
            <div className="list">
              {pendingUsers.map((user) => (
                <div key={user.id} className="list-item">
                  <p>{user.email}</p>
                  <p>Branch: {user.branch_name}</p>
                  <p>Package: {user.packageCategory || "N/A"}</p>
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
                  <p>{admin.email}</p>
                  <p>Branch: {admin.branch_name}</p>
                  <p>Work ID: {admin.workId || "N/A"}</p>
                  <p>
                    Updated: {new Date(admin.updatedAt).toLocaleDateString()}
                  </p>
                  <div>
                    <a
                      href="#"
                      className="accept"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAdminRequest(admin.id, "accept");
                      }}
                    >
                      Restore
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
                  <p>Branch: {user.branch_name}</p>
                  <p>Package: {user.packageCategory || "N/A"}</p>
                  <p>
                    Updated: {new Date(user.updatedAt).toLocaleDateString()}
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
                      Restore
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

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
