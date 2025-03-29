
import React from "react";
import { Button } from "@/components/ui/button";
import { SearchX } from "lucide-react";

export interface EmptyResultsProps {
  onClearFilters: () => void;
  location?: string;
}

const EmptyResults = ({ onClearFilters, location }: EmptyResultsProps) => {
  return (
    <div className="text-center py-10">
      <div className="inline-flex items-center justify-center rounded-full p-4 bg-muted mb-4">
        <SearchX className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-medium mb-2">Δεν βρέθηκαν αποτελέσματα</h3>
      <p className="text-muted-foreground mb-6">
        {location 
          ? `Δεν βρέθηκαν γραφεία τελετών στην περιοχή "${location}"`
          : "Δεν βρέθηκαν γραφεία τελετών με τα επιλεγμένα κριτήρια"}
      </p>
      <Button onClick={onClearFilters}>
        Καθαρισμός φίλτρων
      </Button>
    </div>
  );
};

export default EmptyResults;
