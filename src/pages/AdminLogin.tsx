
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [adminCode, setAdminCode] = useState("");
  const { isAuthenticated, isAdmin, login, signup, loading, makeAdmin, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // For testing purposes, the admin code is "admin123"
  const ADMIN_CODE = "admin123";

  // Debug the auth state
  useEffect(() => {
    console.log("AdminLogin component - Auth state:", { 
      isAuthenticated, 
      isAdmin, 
      loading,
      path: location.pathname,
      userId: user?.id
    });
    
    // Redirect to admin page if already authenticated and is admin
    if (!loading && isAuthenticated && isAdmin) {
      console.log("User is authenticated and admin, redirecting to /admin");
      navigate("/admin", { replace: true });
    }
  }, [isAuthenticated, isAdmin, navigate, loading, location, user]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setIsLoading(true);
    
    try {
      console.log("Attempting login with:", email);
      const { error } = await login(email, password);
      
      if (error) {
        console.error("Login error:", error);
        toast.error("Invalid login credentials");
        setIsLoading(false);
        return;
      }
      
      // Login successful - the auth state change will trigger the redirect in useEffect
      toast.success("Login successful");
    } catch (err) {
      console.error("Login error:", err);
      toast.error("An error occurred during login");
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await signup(email, password);
      
      if (error) {
        console.error("Signup error:", error);
        toast.error("Error during signup");
        setIsLoading(false);
        return;
      }
      
      toast.success("Account created", {
        description: "Your account has been created. Admin access will need to be granted separately.",
      });
      
      // If admin code is provided and correct, make this user an admin
      if (adminCode === ADMIN_CODE && user) {
        await makeAdminUser();
      }
      
      setIsLoading(false);
    } catch (err) {
      console.error("Signup error:", err);
      toast.error("Error during signup");
      setIsLoading(false);
    }
  };

  const makeAdminUser = async () => {
    if (!user) {
      toast.error("You must be logged in to become an admin");
      return;
    }
    
    if (adminCode !== ADMIN_CODE) {
      toast.error("Invalid admin code");
      return;
    }
    
    try {
      setIsLoading(true);
      
      const success = await makeAdmin(user.id, user.email || "");
      
      if (success) {
        toast.success("Admin privileges granted!");
        
        // Navigate to admin page after a short delay
        setTimeout(() => {
          navigate("/admin", { replace: true });
        }, 1000);
      }
      
      setIsLoading(false);
    } catch (err) {
      console.error("Error making user admin:", err);
      toast.error("Failed to grant admin privileges");
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-8 flex justify-center items-center min-h-[calc(100vh-200px)]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Πίνακας Διαχείρισης</CardTitle>
          <CardDescription>
            Συνδεθείτε για να αποκτήσετε πρόσβαση στον πίνακα διαχείρισης
          </CardDescription>
        </CardHeader>
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid grid-cols-2 mx-6">
            <TabsTrigger value="login">Σύνδεση</TabsTrigger>
            <TabsTrigger value="register">Εγγραφή</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Κωδικός</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                {isAuthenticated && !isAdmin && (
                  <div className="space-y-2 border-t pt-4 mt-4">
                    <Label htmlFor="admin-code">Admin Code</Label>
                    <Input
                      id="admin-code"
                      type="password"
                      value={adminCode}
                      onChange={(e) => setAdminCode(e.target.value)}
                      placeholder="Enter admin code"
                    />
                    <Button 
                      type="button" 
                      className="w-full mt-2" 
                      onClick={makeAdminUser}
                      disabled={isLoading}
                    >
                      {isLoading ? "Processing..." : "Become Admin"}
                    </Button>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Σύνδεση..." : "Σύνδεση"}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
          
          <TabsContent value="register">
            <form onSubmit={handleSignup}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input
                    id="register-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Κωδικός</Label>
                  <Input
                    id="register-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-admin-code">Admin Code (Optional)</Label>
                  <Input
                    id="register-admin-code"
                    type="password"
                    value={adminCode}
                    onChange={(e) => setAdminCode(e.target.value)}
                    placeholder="Enter admin code if you have one"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Η εγγραφή δεν παρέχει αυτόματα δικαιώματα διαχειριστή. Θα πρέπει να εισάγετε τον κωδικό διαχειριστή ή να ζητήσετε πρόσβαση από έναν υπάρχοντα διαχειριστή.
                </p>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Εγγραφή..." : "Εγγραφή"}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default AdminLogin;
