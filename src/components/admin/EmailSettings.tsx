
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAdminEmail, setAdminEmail } from "@/services/emailService";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const EmailSettings = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  useEffect(() => {
    const fetchAdminEmail = async () => {
      setIsLoading(true);
      try {
        const adminEmail = await getAdminEmail();
        setEmail(adminEmail);
      } catch (error) {
        console.error("Error fetching admin email:", error);
        toast({
          title: "Σφάλμα",
          description: "Αδυναμία φόρτωσης email διαχειριστή",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAdminEmail();
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
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
    
    setIsSaving(true);
    try {
      const success = await setAdminEmail(email);
      
      if (success) {
        toast({
          title: "Επιτυχία",
          description: "Η διεύθυνση email ενημερώθηκε επιτυχώς",
        });
      } else {
        throw new Error("Failed to save email");
      }
    } catch (error) {
      console.error("Error saving admin email:", error);
      toast({
        title: "Σφάλμα",
        description: "Αδυναμία αποθήκευσης email διαχειριστή",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ρυθμίσεις Email</CardTitle>
        <CardDescription>
          Διαχειριστείτε τη διεύθυνση email όπου θα αποστέλλονται οι ειδοποιήσεις για νέες εγγραφές και αιτήματα.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
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
                Σε αυτή τη διεύθυνση θα αποστέλλονται όλες οι ειδοποιήσεις για νέες εγγραφές συνεργατών και αιτήματα αναζήτησης.
              </p>
            </div>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Αποθήκευση...
                </>
              ) : (
                "Αποθήκευση"
              )}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default EmailSettings;
