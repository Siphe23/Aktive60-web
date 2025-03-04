import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";

const ProtectedRoute = ({ allowedRoles }) => {
  const [userRole, setUserRole] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Fetch user role from Realtime Database
          const db = getDatabase();
          const userRef = ref(db, `users/${user.uid}`); // Assuming users are stored under "users" node
          const snapshot = await get(userRef);

          if (snapshot.exists()) {
            const userData = snapshot.val();
            setUserRole(userData.role); // Assuming the role is stored in the Realtime Database
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner while checking auth
  }

  // If the user's role is allowed, render the route
  if (allowedRoles.includes(userRole)) {
    return <Outlet />; // Render the child routes
  }

  // If the user is not allowed, redirect to login or unauthorized page
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;