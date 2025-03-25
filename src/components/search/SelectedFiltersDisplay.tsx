
import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface SelectedFiltersDisplayProps {
  selectedFiltersCount: number;
  onClearFilters: () => void;
}

const SelectedFiltersDisplay = ({ 
  selectedFiltersCount, 
  onClearFilters 
}: SelectedFiltersDisplayProps) => {
  if (selectedFiltersCount === 0) return null;
  
  return (
    <div className="flex items-center">
      <Separator orientation="vertical" className="h-4 mx-2" />
      <p className="text-sm text-primary">
        {selectedFiltersCount} φίλτρα ενεργά
      </p>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onClearFilters} 
        className="text-xs ml-1 h-auto py-1"
      >
        Καθαρισμός
      </Button>
    </div>
  );
};

export default SelectedFiltersDisplay;
