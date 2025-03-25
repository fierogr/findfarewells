
import React from "react";
import { Button } from "@/components/ui/button";

interface EmptyResultsProps {
  onClearFilters: () => void;
}

const EmptyResults = ({ onClearFilters }: EmptyResultsProps) => {
  return (
    <div className="text-center py-12 bg-secondary rounded-lg animate-fadeIn">
      <p className="text-xl mb-4">Δεν βρέθηκαν γραφεία τελετών με τις επιλεγμένες υπηρεσίες.</p>
      <p className="text-muted-foreground mb-6">Δοκιμάστε να αλλάξετε τα φίλτρα ή να αναζητήσετε σε διαφορετική τοποθεσία.</p>
      <Button onClick={onClearFilters}>Καθαρισμός Φίλτρων</Button>
    </div>
  );
};

export default EmptyResults;
