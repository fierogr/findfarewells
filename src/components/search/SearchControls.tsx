
import React from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import SortButton from "./SortButton";

interface SearchControlsProps {
  onNewSearchClick: () => void;
  onSortOrderToggle: () => void;
  sortOrder: "asc" | "desc";
  loading: boolean;
  resultsCount: number;
}

const SearchControls = ({
  onNewSearchClick,
  onSortOrderToggle,
  sortOrder,
  loading,
  resultsCount
}: SearchControlsProps) => {
  return (
    <div className="flex items-center justify-between flex-wrap gap-2 md:gap-0 mb-4">
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={onNewSearchClick}
          disabled={loading}
        >
          <Filter className="h-4 w-4" />
          Νέα Αναζήτηση
        </Button>
        
        <SortButton 
          sortOrder={sortOrder}
          onClick={onSortOrderToggle}
          disabled={loading || resultsCount <= 1}
        />
      </div>
    </div>
  );
};

export default SearchControls;
