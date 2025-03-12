import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Nutzer aus sessionStorage laden
  const user = JSON.parse(sessionStorage.getItem("user"));

  // ist nutzer eingeloggt?
  const isAuthenticated = user && user.username && user.user_id;

  // Entweder protected contendt laden oder zurück auf login
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
