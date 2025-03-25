
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PartnersManagement from "@/components/admin/PartnersManagement";
import UserRequests from "@/components/admin/UserRequests";
import PartnerDetails from "@/components/admin/PartnerDetails";
import { useFuneralHomes } from "@/hooks/useFuneralHomes";

const AdminPanel = () => {
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(null);
  const { data: funeralHomes } = useFuneralHomes();

  const handlePartnerSelect = (partnerId: string) => {
    setSelectedPartnerId(partnerId);
  };

  const handleBackToList = () => {
    setSelectedPartnerId(null);
  };

  // Calculate some basic statistics
  const totalPartners = funeralHomes?.length || 0;
  const featuredPartners = funeralHomes?.filter(home => home.featured).length || 0;
  const partnersByState = funeralHomes?.reduce((acc, home) => {
    acc[home.state] = (acc[home.state] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

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
                {!funeralHomes ? (
                  <div className="flex flex-col items-center justify-center h-60">
                    <p className="text-muted-foreground text-center">
                      Φόρτωση στατιστικών...
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 border rounded-lg">
                        <div className="text-2xl font-bold">{totalPartners}</div>
                        <div className="text-sm text-muted-foreground">Συνολικοί Συνεργάτες</div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="text-2xl font-bold">{featuredPartners}</div>
                        <div className="text-sm text-muted-foreground">Προβεβλημένοι Συνεργάτες</div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="text-2xl font-bold">{Object.keys(partnersByState).length}</div>
                        <div className="text-sm text-muted-foreground">Νομοί με Συνεργάτες</div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Κατανομή ανά Περιοχή</h3>
                      <div className="border rounded-lg overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Νομός</TableHead>
                              <TableHead>Αριθμός Συνεργατών</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {Object.entries(partnersByState).length > 0 ? (
                              Object.entries(partnersByState)
                                .sort((a, b) => b[1] - a[1])
                                .map(([state, count]) => (
                                  <TableRow key={state}>
                                    <TableCell>{state}</TableCell>
                                    <TableCell>{count}</TableCell>
                                  </TableRow>
                                ))
                            ) : (
                              <TableRow>
                                <TableCell colSpan={2} className="text-center">
                                  Δεν υπάρχουν δεδομένα.
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default AdminPanel;
