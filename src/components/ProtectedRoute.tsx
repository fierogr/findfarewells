
import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const ProtectedRoute = () => {
  const { isAuthenticated, isAdmin, loading, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("ProtectedRoute - Auth state:", { 
      isAuthenticated, 
      isAdmin, 
      loading,
      userId: user?.id 
    });
  }, [isAuthenticated, isAdmin, loading, user]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="container py-8 flex justify-center items-center min-h-[calc(100vh-200px)]">
        <p className="text-center text-muted-foreground">Checking authorization...</p>
      </div>
    );
  }

  // Redirect to login page if not authenticated
  if (!isAuthenticated) {
    console.log("User not authenticated, redirecting to admin-login");
    return <Navigate to="/admin-login" replace />;
  }
  
  // Redirect to login page if authenticated but not an admin
  if (!isAdmin) {
    console.log("User authenticated but not admin, redirecting to admin-login");
    return <Navigate to="/admin-login" replace />;
  }

  // Render the protected route if authenticated and admin
  console.log("User is authenticated and admin, rendering the protected route");
  return <Outlet />;
};

export default ProtectedRoute;
