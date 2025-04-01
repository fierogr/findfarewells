
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FuneralHome } from "@/types/funeralHome";

interface CardActionsProps {
  homeId: string;
  onSelectPackage?: () => void;
  isSelecting?: boolean;
}

const CardActions = ({ 
  homeId, 
  onSelectPackage, 
  isSelecting = false 
}: CardActionsProps) => {
  return (
    <div className="space-y-2">
      <Link to={`/funeral-home/${homeId}`}>
        <Button className="w-full">Προβολή Λεπτομερειών</Button>
      </Link>
      {onSelectPackage && (
        <Button 
          variant="secondary" 
          className="w-full" 
          onClick={onSelectPackage}
          disabled={isSelecting}
        >
          {isSelecting ? "Επεξεργασία..." : "Επιλογή Πακέτου"}
        </Button>
      )}
      <Button variant="outline" className="w-full">Επικοινωνία</Button>
    </div>
  );
};

export default CardActions;
