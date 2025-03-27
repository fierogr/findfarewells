
import React from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { ImportResultProps } from "./types";

const ImportResult = ({ importStatus }: ImportResultProps) => {
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
};

export default ImportResult;
