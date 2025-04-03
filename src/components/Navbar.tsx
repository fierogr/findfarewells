
import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { MapPin, UserPlus, Shield, LogIn, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Navbar = () => {
  const { isAuthenticated, isAdmin, logout, user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    console.log("Navbar rendering - Auth state:", { 
      isAuthenticated, 
      isAdmin, 
      userId: user?.id,
      loading,
      path: location.pathname
    });
  }, [isAuthenticated, isAdmin, user, loading, location]);

  const handleLogout = async () => {
    try {
      console.log("Navbar: Initiating logout");
      await logout();
      console.log("Navbar: Logout successful, navigating to home");
      // Force navigation to home page after logout
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Navbar: Error during logout:", error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <img 
              src="/lovable-uploads/4bccf2b8-8094-4207-a737-8b3cb7f4fd5a.png" 
              alt="Restinprice Logo" 
              className="h-10" 
            />
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link
              to="/"
              className="transition-colors hover:text-foreground/80 text-foreground"
            >
              Αρχική
            </Link>
            <Link
              to="/about"
              className="transition-colors hover:text-foreground/80 text-muted-foreground"
            >
              Σχετικά
            </Link>
            <Link
              to="/contact"
              className="transition-colors hover:text-foreground/80 text-muted-foreground"
            >
              Επικοινωνία
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/register-funeral-home" className="flex items-center">
              <UserPlus className="mr-1.5 h-4 w-4" />
              <span className="hidden sm:inline">Εγγραφή Γραφείου Τελετών</span>
              <span className="sm:hidden">Εγγραφή</span>
            </Link>
          </Button>
          
          {isAuthenticated && isAdmin && (
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin" className="flex items-center">
                <Shield className="mr-1.5 h-4 w-4" />
                <span className="hidden sm:inline">Διαχείριση</span>
                <span className="sm:hidden">Admin</span>
              </Link>
            </Button>
          )}
          
          {isAuthenticated ? (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout} 
              className="flex items-center"
              type="button"
            >
              <LogOut className="mr-1.5 h-4 w-4" />
              <span className="hidden sm:inline">Αποσύνδεση</span>
              <span className="sm:hidden">Έξοδος</span>
            </Button>
          ) : (
            <Button variant="outline" size="sm" asChild>
              <Link to="/admin-login" className="flex items-center">
                <LogIn className="mr-1.5 h-4 w-4" />
                <span className="hidden sm:inline">Σύνδεση</span>
                <span className="sm:hidden">Είσοδος</span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
