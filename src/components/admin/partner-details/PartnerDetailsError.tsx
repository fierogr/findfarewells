
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface PartnerDetailsErrorProps {
  onBack: () => void;
}

const PartnerDetailsError = ({ onBack }: PartnerDetailsErrorProps) => {
  return (
    <div className="text-center py-4 text-red-500">
      Σφάλμα κατά τη φόρτωση των στοιχείων του συνεργάτη.
      <Button variant="outline" className="mt-2" onClick={onBack}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Επιστροφή
      </Button>
    </div>
  );
};

export default PartnerDetailsError;
