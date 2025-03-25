
import React, { useState } from "react";
import { useFuneralHomes } from "@/hooks/useFuneralHomes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, FileDown, FileUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FuneralHome } from "@/types/funeralHome";
import { addFuneralHome } from "@/services/funeralHomeService";
import PartnerForm from "./PartnerForm";
import ImportPartnersModal from "./ImportPartnersModal";
import { exportToCSV } from "@/utils/exportUtils";
import { toast } from "@/hooks/use-toast";

interface PartnersManagementProps {
  onPartnerSelect: (partnerId: string) => void;
}

const PartnersManagement = ({ onPartnerSelect }: PartnersManagementProps) => {
  const { data: funeralHomes, isLoading, error, refetch } = useFuneralHomes();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddPartnerOpen, setIsAddPartnerOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const filteredHomes = funeralHomes?.filter(
    (home) =>
      home.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      home.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      home.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPartner = async (partnerData: FuneralHome) => {
    await addFuneralHome(partnerData);
    refetch();
  };

  const handleExport = () => {
    if (funeralHomes && funeralHomes.length > 0) {
      exportToCSV(funeralHomes, "partners-list");
      toast({
        title: "Εξαγωγή Λίστας",
        description: "Η λίστα των συνεργατών εξήχθη επιτυχώς",
      });
    } else {
      toast({
        title: "Προσοχή",
        description: "Δεν υπάρχουν συνεργάτες για εξαγωγή",
        variant: "destructive",
      });
    }
  };

  const handleImportComplete = () => {
    refetch();
  };

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
        <Button variant="outline" onClick={handleExport}>
          <FileDown className="mr-2 h-4 w-4" /> Εξαγωγή
        </Button>
        <Button variant="outline" onClick={() => setIsImportModalOpen(true)}>
          <FileUp className="mr-2 h-4 w-4" /> Εισαγωγή
        </Button>
        <Button onClick={() => setIsAddPartnerOpen(true)}>
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

      <PartnerForm
        open={isAddPartnerOpen}
        onClose={() => setIsAddPartnerOpen(false)}
        onSave={handleAddPartner}
      />

      <ImportPartnersModal
        open={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImportComplete={handleImportComplete}
      />
    </div>
  );
};

export default PartnersManagement;
