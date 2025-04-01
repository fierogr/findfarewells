
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import PartnersManagement from "@/components/admin/PartnersManagement";
import UserRequests from "@/components/admin/UserRequests";
import EmailSettings from "@/components/admin/EmailSettings";
import PartnerRequests from "@/components/admin/PartnerRequests";
import SearchRequests from "@/components/admin/SearchRequests";
import AdminStats from "@/components/admin/stats/AdminStats";
import { FuneralHome } from "@/types/funeralHome";

interface AdminTabsProps {
  onPartnerSelect: (partnerId: string) => void;
  funeralHomes: FuneralHome[] | undefined;
  dataError: any;
}

const AdminTabs = ({ onPartnerSelect, funeralHomes, dataError }: AdminTabsProps) => {
  return (
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
              <PartnersManagement onPartnerSelect={onPartnerSelect} />
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
            <AdminStats 
              funeralHomes={funeralHomes} 
              isLoading={!funeralHomes && !dataError} 
            />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="settings">
        <div className="grid grid-cols-1 gap-6">
          <EmailSettings />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default AdminTabs;
