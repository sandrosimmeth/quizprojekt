import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, children }) => {
  const isAuthenticated = user && user.username && user.user_id;
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
