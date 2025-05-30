import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { auth, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  if (!auth.token) return <Navigate to="/login" replace />;

  const user = auth.user;
  if (allowedRoles && !allowedRoles.includes(user?.role?.name)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children || <Outlet />;
};

export default ProtectedRoute;
