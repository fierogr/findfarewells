
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
    
    if (!loading && !isAuthenticated) {
      console.log("User not authenticated, navigating to admin-login");
      navigate("/admin-login", { replace: true });
    } else if (!loading && isAuthenticated && !isAdmin) {
      console.log("User authenticated but not admin, navigating to admin-login");
      navigate("/admin-login", { replace: true });
    }
  }, [isAuthenticated, isAdmin, loading, navigate, user]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="container py-8 flex justify-center items-center min-h-[calc(100vh-200px)]">
        <p className="text-center text-muted-foreground">Checking authorization...</p>
      </div>
    );
  }

  // Redirect to login page if not authenticated or not admin
  if (!isAuthenticated || !isAdmin) {
    return null; // We're handling the redirect in the useEffect hook
  }

  // Render the protected route if authenticated and admin
  console.log("User is authenticated and admin, rendering the protected route");
  return <Outlet />;
};

export default ProtectedRoute;
