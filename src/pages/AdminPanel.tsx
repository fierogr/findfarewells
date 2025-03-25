
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import PartnersManagement from "@/components/admin/PartnersManagement";
import UserRequests from "@/components/admin/UserRequests";
import PartnerDetails from "@/components/admin/PartnerDetails";

const AdminPanel = () => {
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(null);

  const handlePartnerSelect = (partnerId: string) => {
    setSelectedPartnerId(partnerId);
  };

  const handleBackToList = () => {
    setSelectedPartnerId(null);
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Πίνακας Διαχείρισης</h1>

      {selectedPartnerId ? (
        <PartnerDetails partnerId={selectedPartnerId} onBack={handleBackToList} />
      ) : (
        <Tabs defaultValue="partners" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="partners">Συνεργάτες</TabsTrigger>
            <TabsTrigger value="requests">Αιτήματα Χρηστών</TabsTrigger>
            <TabsTrigger value="stats">Στατιστικά</TabsTrigger>
          </TabsList>
          <TabsContent value="partners">
            <Card>
              <CardHeader>
                <CardTitle>Διαχείριση Συνεργατών</CardTitle>
                <CardDescription>
                  Προβολή και διαχείριση όλων των εγγεγραμμένων γραφείων τελετών.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[calc(100vh-300px)]">
                  <PartnersManagement onPartnerSelect={handlePartnerSelect} />
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="requests">
            <Card>
              <CardHeader>
                <CardTitle>Αιτήματα Χρηστών</CardTitle>
                <CardDescription>
                  Διαχείριση αιτημάτων και επικοινωνίας με τους χρήστες.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[calc(100vh-300px)]">
                  <UserRequests />
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="stats">
            <Card>
              <CardHeader>
                <CardTitle>Στατιστικά Πλατφόρμας</CardTitle>
                <CardDescription>
                  Συνολικά στατιστικά και αναλύσεις.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center h-60">
                  <p className="text-muted-foreground text-center">
                    Στατιστικά στοιχεία θα είναι διαθέσιμα σύντομα.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default AdminPanel;
