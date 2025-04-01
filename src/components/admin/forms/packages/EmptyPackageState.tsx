
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface EmptyPackageStateProps {
  onAddPackage: () => void;
}

const EmptyPackageState = ({ onAddPackage }: EmptyPackageStateProps) => {
  return (
    <div className="text-center py-8 border border-dashed rounded-md">
      <p className="text-muted-foreground mb-4">Δεν έχετε προσθέσει κανένα πακέτο υπηρεσιών ακόμα.</p>
      <Button variant="outline" onClick={onAddPackage}>
        <Plus className="h-4 w-4 mr-1" /> Προσθήκη Πρώτου Πακέτου
      </Button>
    </div>
  );
};

export default EmptyPackageState;
