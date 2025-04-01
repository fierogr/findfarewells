
import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const ProtectedRoute = () => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is authenticated but not admin, redirect to home
    if (isAuthenticated && !isAdmin && !loading) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, isAdmin, loading, navigate]);

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
    return <Navigate to="/admin-login" replace />;
  }

  // Redirect to home if authenticated but not admin
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Render the protected route if authenticated and admin
  return <Outlet />;
};

export default ProtectedRoute;
