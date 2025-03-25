
import React, { useState } from "react";
import { useFuneralHomes } from "@/hooks/useFuneralHomes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface PartnersManagementProps {
  onPartnerSelect: (partnerId: string) => void;
}

const PartnersManagement = ({ onPartnerSelect }: PartnersManagementProps) => {
  const { data: funeralHomes, isLoading, error } = useFuneralHomes();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredHomes = funeralHomes?.filter(
    (home) =>
      home.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      home.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      home.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="text-center py-4">Φόρτωση συνεργατών...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">Σφάλμα κατά τη φόρτωση των συνεργατών.</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Αναζήτηση συνεργατών..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Προσθήκη Συνεργάτη
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Επωνυμία</TableHead>
              <TableHead>Τοποθεσία</TableHead>
              <TableHead>Τηλέφωνο</TableHead>
              <TableHead>Υπηρεσίες</TableHead>
              <TableHead>Κατάσταση</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredHomes?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24">
                  Δεν βρέθηκαν αποτελέσματα.
                </TableCell>
              </TableRow>
            ) : (
              filteredHomes?.map((home) => (
                <TableRow
                  key={home.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => onPartnerSelect(home.id)}
                >
                  <TableCell>{home.name}</TableCell>
                  <TableCell>{`${home.city}, ${home.state}`}</TableCell>
                  <TableCell>{home.phone}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {home.services.slice(0, 3).map((service, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                      {home.services.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{home.services.length - 3}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={home.featured ? "default" : "secondary"}>
                      {home.featured ? "Προβεβλημένο" : "Κανονικό"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PartnersManagement;
