import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute() {
  
  const { token, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>; 

  return token ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;