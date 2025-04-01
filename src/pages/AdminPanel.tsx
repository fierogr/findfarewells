import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import PartnersManagement from "@/components/admin/PartnersManagement";
import UserRequests from "@/components/admin/UserRequests";
import PartnerDetails from "@/components/admin/PartnerDetails";
import EmailSettings from "@/components/admin/EmailSettings";
import PartnerRequests from "@/components/admin/PartnerRequests";
import SearchRequests from "@/components/admin/SearchRequests";
import { useFuneralHomes } from "@/hooks/useFuneralHomes";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(null);
  const { data: funeralHomes, error: dataError } = useFuneralHomes();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handlePartnerSelect = (partnerId: string) => {
    setSelectedPartnerId(partnerId);
  };

  const handleBackToList = () => {
    setSelectedPartnerId(null);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/admin-login");
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Πίνακας Διαχείρισης</h1>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleLogout}
          className="flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          Αποσύνδεση
        </Button>
      </div>

      {dataError && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="text-destructive">Σφάλμα κατά τη φόρτωση δεδομένων. Παρακαλώ προσπαθήστε ξανά αργότερα.</p>
          </CardContent>
        </Card>
      )}

      {selectedPartnerId ? (
        <PartnerDetails partnerId={selectedPartnerId} onBack={handleBackToList} />
      ) : (
        <Tabs defaultValue="partners" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="partners">Συνεργάτες</TabsTrigger>
            <TabsTrigger value="requests">Νέες Αιτήσεις</TabsTrigger>
            <TabsTrigger value="user-requests">Αιτήματα Χρηστών</TabsTrigger>
            <TabsTrigger value="search-requests">Αιτήματα Αναζήτησης</TabsTrigger>
            <TabsTrigger value="stats">Στατιστικά</TabsTrigger>
            <TabsTrigger value="settings">Ρυθμίσεις</TabsTrigger>
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
                <CardTitle>Αιτήσεις Εγγραφής</CardTitle>
                <CardDescription>
                  Διαχείριση αιτήσεων εγγραφής από γραφεία τελετών.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[calc(100vh-300px)]">
                  <PartnerRequests />
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="user-requests">
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
          <TabsContent value="search-requests">
            <Card>
              <CardHeader>
                <CardTitle>Αιτήματα Αναζήτησης</CardTitle>
                <CardDescription>
                  Προβολή όλων των αιτημάτων αναζήτησης από χρήστες.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[calc(100vh-300px)]">
                  <SearchRequests />
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
          <TabsContent value="settings">
            <div className="grid grid-cols-1 gap-6">
              <EmailSettings />
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default AdminPanel;
