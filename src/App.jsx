import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Create from "./pages/Create";
import Play from "./pages/Play";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Edit from "./pages/Edit";
import Faq from "./pages/Faq";
import ReportedQuestions from "./pages/ReportedQuestions";
import Impressum from "./pages/Impressum";
import About from "./pages/About";

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
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Login setUser={setUser} />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/about" element={<About />} />

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
            <Route path="/faq" element={<Faq user={user} />} />
            <Route
              path="/reports"
              element={
                <ProtectedRoute user={user}>
                  <ReportedQuestions user={user} />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <footer className="bg-base-200 p-1 justify-center flex flex-row gap-16 text-sm w-full">
          <Link to="/dashboard" className="hover:text-secondary">
            Home
          </Link>
          <Link to="/impressum" className="hover:text-secondary">
            Impressum
          </Link>
          <Link to="/about" className="hover:text-secondary">
            Über uns
          </Link>
        </footer>
      </div>
    </Router>
  );
};

export default App;
