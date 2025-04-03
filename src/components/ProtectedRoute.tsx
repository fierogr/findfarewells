
import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const ProtectedRoute = () => {
  const { isAuthenticated, isAdmin, loading, user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    console.log("ProtectedRoute - Auth state:", { 
      isAuthenticated, 
      isAdmin, 
      loading,
      userId: user?.id,
      path: location.pathname
    });
  }, [isAuthenticated, isAdmin, loading, user, location]);

  // Wait for authentication check to complete
  if (loading) {
    console.log("ProtectedRoute - Still loading authentication state");
    return (
      <div className="container py-8 flex justify-center items-center min-h-[calc(100vh-200px)]">
        <p className="text-center text-muted-foreground">Checking authorization...</p>
      </div>
    );
  }

  // Redirect if not authenticated or not admin
  if (!isAuthenticated) {
    console.log("ProtectedRoute - User not authenticated, redirecting to login");
    return <Navigate to="/admin-login" replace />;
  }

  if (!isAdmin) {
    console.log("ProtectedRoute - User authenticated but not admin, redirecting to login");
    return <Navigate to="/admin-login" replace />;
  }

  // User is authenticated and is admin, render protected content
  console.log("ProtectedRoute - User is authenticated and admin, rendering protected route");
  return <Outlet />;
};

export default ProtectedRoute;
