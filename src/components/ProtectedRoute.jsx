// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  if (role && currentUser.role !== role) {
    return <div style={{ padding: 20 }}>Unauthorized — access denied.</div>;
  }

  return children;
}
