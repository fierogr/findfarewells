
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ActionButtons from "./ActionButtons";

interface PartnerNavigationProps {
  onBack: () => void;
  onDelete: () => void;
  onSave: () => void;
}

const PartnerNavigation = ({ onBack, onDelete, onSave }: PartnerNavigationProps) => {
  return (
    <div className="flex justify-between items-center">
      <Button variant="outline" onClick={onBack}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Επιστροφή στη λίστα
      </Button>
      <ActionButtons 
        onDelete={onDelete} 
        onSave={onSave} 
      />
    </div>
  );
};

export default PartnerNavigation;
