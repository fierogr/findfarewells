
import React from "react";

interface SearchParametersDisplayProps {
  searchPrefecture: string | null;
  searchServices: string[];
  resultsCount: number;
  loading: boolean;
}

const SearchParametersDisplay = ({ 
  searchPrefecture, 
  searchServices, 
  resultsCount,
  loading
}: SearchParametersDisplayProps) => {
  if (!searchPrefecture && searchServices.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      {searchPrefecture && (
        <div className="inline-flex items-center bg-secondary rounded-full px-3 py-1 text-sm mr-2 mb-2">
          <span className="text-foreground">Νομός: {searchPrefecture}</span>
        </div>
      )}
      
      {searchServices.length > 0 && (
        <div className="inline-flex items-center bg-secondary rounded-full px-3 py-1 text-sm mr-2 mb-2">
          <span className="text-foreground">
            Υπηρεσίες: {searchServices.slice(0, 2).join(', ')}
            {searchServices.length > 2 ? ` +${searchServices.length - 2} ακόμη` : ''}
          </span>
        </div>
      )}
      
      {(searchPrefecture || searchServices.length > 0) && !loading && (
        <div className="mt-1 text-xs text-muted-foreground">
          Βρέθηκαν {resultsCount} γραφεία τελετών με βάση τα κριτήρια αναζήτησης
        </div>
      )}
    </div>
  );
};

export default SearchParametersDisplay;
