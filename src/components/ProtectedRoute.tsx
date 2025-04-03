
import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const ProtectedRoute = () => {
  const { isAuthenticated, isAdmin, loading, user } = useAuth();
  const navigate = useNavigate();
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

  // Redirect logic in a separate effect to avoid race conditions
  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        console.log("User not authenticated, navigating to admin-login");
        navigate("/admin-login", { replace: true });
      } else if (!isAdmin) {
        console.log("User authenticated but not admin, navigating to admin-login");
        navigate("/admin-login", { replace: true });
      }
    }
  }, [isAuthenticated, isAdmin, loading, navigate]);

  // Show loading state while checking authentication
  if (loading) {
    console.log("ProtectedRoute - Still loading authentication state");
    return (
      <div className="container py-8 flex justify-center items-center min-h-[calc(100vh-200px)]">
        <p className="text-center text-muted-foreground">Checking authorization...</p>
      </div>
    );
  }

  // Only render the protected content if authenticated and admin
  if (isAuthenticated && isAdmin) {
    console.log("User is authenticated and admin, rendering the protected route");
    return <Outlet />;
  }

  // For any other case, render nothing as the redirect will happen
  return null;
};

export default ProtectedRoute;
