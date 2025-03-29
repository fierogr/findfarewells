
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowDownUp } from "lucide-react";

export interface SortButtonProps {
  sortOrder: "asc" | "desc";
  onClick: () => void;
  disabled?: boolean; // Add optional disabled property
}

const SortButton = ({ sortOrder, onClick, disabled }: SortButtonProps) => {
  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="flex items-center gap-2"
      onClick={onClick}
      disabled={disabled}
    >
      <ArrowDownUp className="h-4 w-4" />
      Τιμή {sortOrder === "asc" ? "Αύξουσα" : "Φθίνουσα"}
    </Button>
  );
};

export default SortButton;
