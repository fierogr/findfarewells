
import React from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Search } from "lucide-react";

interface EmptyResultsProps {
  onClearFilters: () => void;
}

const EmptyResults = ({ onClearFilters }: EmptyResultsProps) => {
  return (
    <div className="text-center py-12 bg-secondary rounded-lg animate-fadeIn">
      <div className="flex justify-center mb-4">
        <Search className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-medium mb-2">Δεν βρέθηκαν γραφεία τελετών</h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Δοκιμάστε να αλλάξετε τα φίλτρα, να επεκτείνετε την περιοχή αναζήτησης ή να αναζητήσετε σε διαφορετική τοποθεσία.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button onClick={onClearFilters} className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          Καθαρισμός Φίλτρων
        </Button>
      </div>
    </div>
  );
};

export default EmptyResults;
