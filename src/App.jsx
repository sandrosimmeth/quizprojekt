import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Create from "./pages/Create";
import Play from "./pages/Play";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Edit from "./pages/Edit";

const App = () => {
  const [user, setUser] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true); // Add loading state to manage restoration

  // Restore user from sessionStorage on mount
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Only set user if found in sessionStorage
    }
    setLoading(false); // Mark loading as complete
  }, []);

  // Save user to sessionStorage when it changes
  useEffect(() => {
    if (!loading) {
      if (user && user.username && user.user_id) {
        sessionStorage.setItem("user", JSON.stringify(user));
      } else {
        sessionStorage.removeItem("user"); // Clear storage if user is null
      }
    }
  }, [user, loading]); // Trigger only after loading is complete

  if (loading) {
    return <div>Loading...</div>; // Show loading state if still restoring user
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user}>
              <Dashboard user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute user={user}>
              <Create user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/play"
          element={
            <ProtectedRoute user={user}>
              <Play user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit"
          element={
            <ProtectedRoute user={user}>
              <Edit user={user} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
