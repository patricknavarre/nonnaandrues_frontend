import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminLoginForm from "./AdminLoginForm"; // We'll create this component next

const AdminRoute = ({ children }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // If not authenticated, show the admin login form
  if (!isAuthenticated) {
    return <AdminLoginForm />;
  }

  // If authenticated but not admin, redirect to home
  if (user && user.role !== "admin") {
    return <Navigate to="/" />;
  }

  // If admin, show the actual admin component
  return children;
};

export default AdminRoute;
