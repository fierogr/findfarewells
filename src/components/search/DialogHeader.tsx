
import React from "react";
import { DialogHeader as BaseDialogHeader, DialogTitle } from "@/components/ui/dialog";

interface DialogHeaderProps {
  title: string;
  description?: string;
}

const DialogHeader: React.FC<DialogHeaderProps> = ({ title, description }) => {
  return (
    <BaseDialogHeader>
      <DialogTitle>{title}</DialogTitle>
      {description && (
        <p className="text-sm text-muted-foreground mt-1">
          {description}
        </p>
      )}
    </BaseDialogHeader>
  );
};

export default DialogHeader;
