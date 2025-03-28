
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AdminLogin = () => {
  const navigate = useNavigate();

  // Automatically redirect to admin page
  useEffect(() => {
    navigate("/admin");
  }, [navigate]);

  return (
    <div className="container py-8 flex justify-center items-center min-h-[calc(100vh-200px)]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Διαχείριση</CardTitle>
          <CardDescription>
            Ανακατεύθυνση στον πίνακα διαχείρισης...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">Παρακαλώ περιμένετε...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
