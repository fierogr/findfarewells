
import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const ProtectedRoute = () => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("ProtectedRoute: Auth state updated - isAdmin:", isAdmin, "isAuthenticated:", isAuthenticated, "loading:", loading);
  }, [isAuthenticated, isAdmin, loading]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="container py-8 flex justify-center items-center min-h-[calc(100vh-200px)]">
        <p className="text-center text-muted-foreground">Checking authorization...</p>
      </div>
    );
  }

  // Redirect to login page if not authenticated or not an admin
  if (!isAuthenticated) {
    console.log("User not authenticated, redirecting to admin-login");
    return <Navigate to="/admin-login" replace />;
  }
  
  if (!isAdmin) {
    console.log("User authenticated but not admin, redirecting to admin-login");
    return <Navigate to="/admin-login" replace />;
  }

  // Render the protected route if authenticated and admin
  console.log("User is authenticated and admin, rendering the protected route");
  return <Outlet />;
};

export default ProtectedRoute;
