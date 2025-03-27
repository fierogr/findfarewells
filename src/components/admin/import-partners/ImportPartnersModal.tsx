
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { addFuneralHome } from "@/services/funeralHomeService";
import { ImportPartnersModalProps, ImportStatus } from "./types";
import FileUpload from "./FileUpload";
import CSVFormatGuide from "./CSVFormatGuide";
import ImportResult from "./ImportResult";
import { parseCSV, convertToFuneralHome } from "./csvUtils";

const ImportPartnersModal = ({
  open,
  onClose,
  onImportComplete,
}: ImportPartnersModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [importStatus, setImportStatus] = useState<ImportStatus | null>(null);

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
      return <ImportResult importStatus={importStatus} />;
    }

    return (
      <div className="space-y-4 py-4">
        <FileUpload file={file} setFile={setFile} />
        <CSVFormatGuide />
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
