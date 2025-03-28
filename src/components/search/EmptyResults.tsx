
import React from "react";
import { Button } from "@/components/ui/button";
import { Search, MapPin, RefreshCw } from "lucide-react";

interface EmptyResultsProps {
  onClearFilters: () => void;
  location: string;
  onRetry?: () => void;
}

const EmptyResults = ({ onClearFilters, location, onRetry }: EmptyResultsProps) => {
  return (
    <div className="text-center py-12 bg-white rounded-lg shadow-sm animate-fadeIn">
      <div className="flex justify-center mb-4">
        <Search className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-medium mb-2 font-roboto">Δεν βρέθηκαν γραφεία τελετών</h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Δεν βρέθηκαν γραφεία τελετών στην περιοχή "{location}". Δοκιμάστε να αλλάξετε τα φίλτρα, 
        να επεκτείνετε την περιοχή αναζήτησης ή να αναζητήσετε σε διαφορετική τοποθεσία.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button onClick={onClearFilters} className="flex items-center gap-2 bg-[#FF7425] hover:bg-[#e56821]">
          <MapPin className="h-4 w-4" />
          Καθαρισμός Φίλτρων
        </Button>
        {onRetry && (
          <Button variant="outline" onClick={onRetry} className="flex items-center gap-2 border-[#FF7425] text-[#FF7425] hover:bg-[#FF7425]/10">
            <RefreshCw className="h-4 w-4" />
            Δοκιμάστε Ξανά
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmptyResults;
