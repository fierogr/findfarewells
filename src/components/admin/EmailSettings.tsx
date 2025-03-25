
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAdminEmail, setAdminEmail } from "@/services/emailService";
import { toast } from "@/hooks/use-toast";

const EmailSettings = () => {
  const [email, setEmail] = useState("");
  
  useEffect(() => {
    setEmail(getAdminEmail());
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Σφάλμα",
        description: "Παρακαλώ εισάγετε μια έγκυρη διεύθυνση email",
        variant: "destructive",
      });
      return;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Μη έγκυρο email",
        description: "Παρακαλώ εισάγετε μια έγκυρη διεύθυνση email",
        variant: "destructive",
      });
      return;
    }
    
    setAdminEmail(email);
    toast({
      title: "Επιτυχία",
      description: "Η διεύθυνση email ενημερώθηκε επιτυχώς",
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ρυθμίσεις Email</CardTitle>
        <CardDescription>
          Διαχειριστείτε τη διεύθυνση email όπου θα αποστέλλονται οι λεπτομέρειες εγγραφής συνεργατών.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="admin-email" className="text-sm font-medium">
              Email Διαχειριστή
            </label>
            <Input
              id="admin-email"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Σε αυτή τη διεύθυνση θα αποστέλλονται όλες οι ειδοποιήσεις εγγραφής νέων συνεργατών.
            </p>
          </div>
          <Button type="submit">Αποθήκευση</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EmailSettings;
