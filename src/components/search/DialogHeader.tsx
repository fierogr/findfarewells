
import React from "react";
import { DialogHeader as UIDialogHeader, DialogTitle } from "@/components/ui/dialog";

interface DialogHeaderProps {
  title: string;
}

const DialogHeader: React.FC<DialogHeaderProps> = ({ title }) => {
  return (
    <UIDialogHeader>
      <DialogTitle className="text-2xl">{title}</DialogTitle>
    </UIDialogHeader>
  );
};

export default DialogHeader;
