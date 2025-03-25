
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react";

interface SortButtonProps {
  sortOrder: "asc" | "desc";
  onToggle: () => void;
}

const SortButton = ({ sortOrder, onToggle }: SortButtonProps) => {
  return (
    <Button 
      variant="outline" 
      className="flex items-center gap-2"
      onClick={onToggle}
    >
      Τιμή {sortOrder === "asc" ? "Χαμηλή προς Υψηλή" : "Υψηλή προς Χαμηλή"}
      {sortOrder === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
    </Button>
  );
};

export default SortButton;
