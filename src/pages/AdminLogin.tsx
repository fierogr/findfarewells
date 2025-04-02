
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, isAdmin, login, signup } = useAuth();
  const navigate = useNavigate();

  // Debug the auth state
  useEffect(() => {
    console.log("AdminLogin component - Auth state:", { isAuthenticated, isAdmin });
    
    // Redirect to admin page if already authenticated and is admin
    if (isAuthenticated && isAdmin) {
      console.log("User is authenticated and admin, redirecting to /admin");
      navigate("/admin");
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log("Attempting login with:", email);
      const { error } = await login(email, password);
      
      if (!error) {
        toast.success("Επιτυχής σύνδεση");
        
        // Force a delay to ensure the admin status is updated
        setTimeout(async () => {
          // Get current auth state from context
          const { isAuthenticated, isAdmin } = useAuth();
          console.log("Checking auth state after login delay:", { isAuthenticated, isAdmin });
          
          if (isAdmin) {
            console.log("User confirmed as admin, redirecting to /admin");
            navigate("/admin");
          } else {
            console.log("User not confirmed as admin after login");
            toast.error("Ο λογαριασμός σας δεν έχει δικαιώματα διαχειριστή");
          }
        }, 500);
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Σφάλμα κατά τη σύνδεση");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Συμπληρώστε όλα τα πεδία");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await signup(email, password);
      
      if (!error) {
        toast.success("Η εγγραφή ολοκληρώθηκε", {
          description: "Ο λογαριασμός σας δημιουργήθηκε. Θα πρέπει να σας ανατεθεί ρόλος διαχειριστή για να αποκτήσετε πρόσβαση.",
        });
      }
    } catch (err) {
      console.error("Signup error:", err);
      toast.error("Σφάλμα κατά την εγγραφή");
    } finally {
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
                <p className="text-sm text-muted-foreground">
                  Η εγγραφή δεν παρέχει αυτόματα δικαιώματα διαχειριστή. Θα πρέπει να ζητήσετε πρόσβαση από έναν υπάρχοντα διαχειριστή.
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
