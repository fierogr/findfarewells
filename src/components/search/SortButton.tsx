
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";

export interface SortButtonProps {
  sortOrder: "asc" | "desc";
  onClick: () => void;
  disabled?: boolean;
}

const SortButton = ({ sortOrder, onClick, disabled }: SortButtonProps) => {
  const isAscending = sortOrder === "asc";
  
  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="flex items-center gap-2"
      onClick={onClick}
      disabled={disabled}
    >
      {isAscending ? (
        <ArrowUp className="h-4 w-4" />
      ) : (
        <ArrowDown className="h-4 w-4" />
      )}
      Τιμή: {isAscending ? "Χαμηλή → Υψηλή" : "Υψηλή → Χαμηλή"}
    </Button>
  );
};

export default SortButton;
