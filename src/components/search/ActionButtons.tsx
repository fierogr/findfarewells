
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ActionButtonsProps {
  onReset: () => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  onReset, 
  onSubmit, 
  isLoading 
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 pt-4">
      <Button 
        variant="outline" 
        onClick={onReset} 
        className="sm:flex-1"
        disabled={isLoading}
      >
        Επαναφορά
      </Button>
      <Button 
        onClick={onSubmit} 
        className="sm:flex-1"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Αναζήτηση...
          </>
        ) : (
          "Αναζήτηση"
        )}
      </Button>
    </div>
  );
};

export default ActionButtons;
