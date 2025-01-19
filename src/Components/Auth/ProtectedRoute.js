import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const { loading, isLogged } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;
  if (!isLogged) return <Navigate to="/signin" replace />;

  return children;
};
