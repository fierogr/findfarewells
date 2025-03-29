
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowDownUp } from "lucide-react";

export interface SortButtonProps {
  sortOrder: "asc" | "desc";
  onClick: () => void;
}

const SortButton = ({ sortOrder, onClick }: SortButtonProps) => {
  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="flex items-center gap-2"
      onClick={onClick}
    >
      <ArrowDownUp className="h-4 w-4" />
      Τιμή {sortOrder === "asc" ? "Αύξουσα" : "Φθίνουσα"}
    </Button>
  );
};

export default SortButton;
