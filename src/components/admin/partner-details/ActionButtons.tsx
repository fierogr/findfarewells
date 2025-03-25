
import React from "react";
import { Button } from "@/components/ui/button";
import { Save, Trash2 } from "lucide-react";

interface ActionButtonsProps {
  onDelete: () => void;
  onSave: () => void;
}

const ActionButtons = ({ onDelete, onSave }: ActionButtonsProps) => {
  return (
    <div className="flex space-x-2">
      <Button 
        variant="destructive" 
        onClick={onDelete}
      >
        <Trash2 className="mr-2 h-4 w-4" /> Διαγραφή
      </Button>
      <Button onClick={onSave}>
        <Save className="mr-2 h-4 w-4" /> Αποθήκευση
      </Button>
    </div>
  );
};

export default ActionButtons;
