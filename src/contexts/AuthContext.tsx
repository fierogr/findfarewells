
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";

type AuthContextType = {
  isAuthenticated: boolean;
  isAdmin: boolean;
  user: User | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<{ error: any | null }>;
  signup: (email: string, password: string) => Promise<{ error: any | null }>;
  logout: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast: uiToast } = useToast();

  const checkAdminStatus = async (userId: string) => {
    try {
      console.log("Checking admin status for user ID:", userId);
      
      // Make a direct RPC call to check admin status
      const { data, error } = await supabase.rpc('is_admin');
      
      if (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
        return false;
      }
      
      console.log("Admin check result:", data);
      
      // Set admin status based on the response
      setIsAdmin(!!data);
      console.log("Updated isAdmin state to:", !!data);
      
      return !!data;
    } catch (err) {
      console.error("Error in admin check:", err);
      setIsAdmin(false);
      return false;
    }
  };

  useEffect(() => {
    console.log("Auth provider initializing");
    setLoading(true);
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log("Auth state changed:", event, newSession?.user?.id);
        
        if (newSession?.user) {
          setUser(newSession.user);
          setSession(newSession);
          setIsAuthenticated(true);
          
          // Check admin status after authentication
          await checkAdminStatus(newSession.user.id);
        } else {
          setUser(null);
          setSession(null);
          setIsAuthenticated(false);
          setIsAdmin(false);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(async ({ data: { session: initialSession } }) => {
      console.log("Initial session check:", initialSession?.user?.id);
      
      if (initialSession?.user) {
        setUser(initialSession.user);
        setSession(initialSession);
        setIsAuthenticated(true);
        
        // Check admin status if session exists
        await checkAdminStatus(initialSession.user.id);
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log("Attempting login with email:", email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error.message);
        toast.error("Login failed", {
          description: error.message,
        });
        setLoading(false);
        return { error };
      }
      
      console.log("Login successful, user:", data.user?.id);
      
      // After successful login, check admin status
      if (data.user) {
        await checkAdminStatus(data.user.id);
      }
      
      toast.success("Login successful", {
        description: "You have been logged in successfully",
      });
      
      setLoading(false);
      return { error: null };
    } catch (error: any) {
      console.error("Unexpected login error:", error);
      toast.error("Login failed", {
        description: "An unexpected error occurred",
      });
      setLoading(false);
      return { error };
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        toast.error("Signup failed", {
          description: error.message,
        });
        return { error };
      }

      toast.success("Signup successful", {
        description: "Please check your email for verification instructions",
      });
      return { error: null };
    } catch (error) {
      toast.error("Signup failed", {
        description: "An unexpected error occurred",
      });
      return { error };
    }
  };

  const logout = async () => {
    try {
      console.log("Starting logout process");
      setLoading(true);
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Logout error:", error.message);
        toast.error("Logout failed", {
          description: error.message,
        });
        setLoading(false);
        throw error;
      }
      
      // Manually reset auth state
      setIsAuthenticated(false);
      setIsAdmin(false);
      setUser(null);
      setSession(null);
      
      console.log("Logout completed successfully");
      
      toast.success("Logged out", {
        description: "You have been successfully logged out",
      });
      
      setLoading(false);
    } catch (error: any) {
      console.error("Unexpected logout error:", error);
      setLoading(false);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAdmin,
        user,
        session,
        login,
        signup,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
