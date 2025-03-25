
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, FileUp, AlertCircle, CheckCircle2 } from "lucide-react";
import { FuneralHome } from "@/types/funeralHome";
import { addFuneralHome } from "@/services/funeralHomeService";
import { toast } from "@/hooks/use-toast";

interface ImportPartnersModalProps {
  open: boolean;
  onClose: () => void;
  onImportComplete: () => void;
}

interface CSVRow {
  name: string;
  city: string;
  state: string;
  address: string;
  zip: string;
  phone: string;
  email: string;
  website: string;
  description: string;
  services: string;
}

const ImportPartnersModal = ({
  open,
  onClose,
  onImportComplete,
}: ImportPartnersModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [importStatus, setImportStatus] = useState<{
    success: number;
    errors: number;
    total: number;
  } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setImportStatus(null);
    }
  };

  const parseCSV = (text: string): CSVRow[] => {
    const lines = text.split("\n");
    const headers = lines[0].split(",").map(header => header.trim());
    
    const results: CSVRow[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      
      const values = lines[i].split(",").map(value => value.trim());
      const row: any = {};
      
      headers.forEach((header, index) => {
        const lowerHeader = header.toLowerCase();
        if (index < values.length) {
          row[lowerHeader] = values[index].replace(/^"(.*)"$/, "$1");
        } else {
          row[lowerHeader] = "";
        }
      });
      
      results.push(row as CSVRow);
    }
    
    return results;
  };

  const convertToFuneralHome = (row: CSVRow): FuneralHome => {
    // Split services into an array if it's a comma-separated string
    const servicesArray = row.services ? row.services.split(';').map(s => s.trim()) : [];
    
    return {
      id: crypto.randomUUID(),
      name: row.name || "",
      city: row.city || "",
      state: row.state || "",
      address: row.address || "",
      zip: row.zip || "",
      phone: row.phone || "",
      email: row.email || "",
      website: row.website || "",
      hours: "Mon-Fri: 9am-5pm, Sat: 10am-2pm, Sun: Closed",
      description: row.description || "",
      about: row.description || "",
      imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80",
      coverImageUrl: "https://images.unsplash.com/photo-1468779065891-103dac4a7c48",
      rating: 0,
      reviewCount: 0,
      services: servicesArray,
      amenities: [],
      basicPrice: 0,
      featured: false,
      packages: [],
      additionalServices: [],
      reviews: []
    };
  };

  const processImport = async () => {
    if (!file) return;
    
    setIsProcessing(true);
    
    try {
      const text = await file.text();
      const rows = parseCSV(text);
      
      let successCount = 0;
      let errorCount = 0;
      
      for (const row of rows) {
        try {
          if (row.name && row.city && row.state) {
            const funeralHome = convertToFuneralHome(row);
            await addFuneralHome(funeralHome);
            successCount++;
          } else {
            errorCount++;
          }
        } catch (error) {
          errorCount++;
        }
      }
      
      setImportStatus({
        success: successCount,
        errors: errorCount,
        total: rows.length,
      });
      
      if (successCount > 0) {
        onImportComplete();
        toast({
          title: "Εισαγωγή Ολοκληρώθηκε",
          description: `Εισήχθησαν επιτυχώς ${successCount} από ${rows.length} συνεργάτες.`,
        });
      }
    } catch (error) {
      toast({
        title: "Σφάλμα Εισαγωγής",
        description: "Παρουσιάστηκε σφάλμα κατά την εισαγωγή του αρχείου.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const renderContent = () => {
    if (importStatus) {
      return (
        <div className="space-y-4 py-4">
          <div className="flex justify-center">
            {importStatus.errors === 0 ? (
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            ) : (
              <AlertCircle className="h-16 w-16 text-yellow-500" />
            )}
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-lg font-medium">Ολοκλήρωση Εισαγωγής</h3>
            <p>Επιτυχής εισαγωγή: {importStatus.success} συνεργάτες</p>
            {importStatus.errors > 0 && (
              <p className="text-yellow-600">Αποτυχημένες εγγραφές: {importStatus.errors}</p>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4 py-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500 mb-2">
            Επιλέξτε ένα αρχείο CSV ή μεταφέρετε το εδώ
          </p>
          <Input
            id="file-upload"
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleFileChange}
          />
          <Button asChild variant="outline" className="mt-2">
            <label htmlFor="file-upload" className="cursor-pointer">
              <FileUp className="h-4 w-4 mr-2" />
              Επιλογή Αρχείου
            </label>
          </Button>
        </div>

        {file && (
          <Alert>
            <AlertDescription className="flex items-center justify-between">
              <span>{file.name}</span>
              <Button size="sm" onClick={() => setFile(null)} variant="ghost">
                Αλλαγή
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <div className="bg-muted p-3 rounded-md text-sm">
          <p className="font-medium mb-2">Το CSV πρέπει να περιέχει τις εξής στήλες:</p>
          <ul className="list-disc pl-5 text-muted-foreground space-y-1">
            <li>Name - Επωνυμία συνεργάτη</li>
            <li>City - Πόλη</li>
            <li>State - Νομός</li>
            <li>Address - Διεύθυνση</li>
            <li>Zip - Ταχυδρομικός κώδικας</li>
            <li>Phone - Τηλέφωνο</li>
            <li>Email - Email</li>
            <li>Website - Ιστοσελίδα</li>
            <li>Description - Περιγραφή</li>
            <li>Services - Υπηρεσίες (διαχωρισμένες με ';')</li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Εισαγωγή Συνεργατών από CSV</DialogTitle>
        </DialogHeader>
        
        {renderContent()}
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {importStatus ? "Κλείσιμο" : "Ακύρωση"}
          </Button>
          
          {!importStatus && (
            <Button 
              onClick={processImport} 
              disabled={!file || isProcessing}
            >
              {isProcessing ? "Επεξεργασία..." : "Εισαγωγή"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImportPartnersModal;
