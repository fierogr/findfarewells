
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { ServicePackage } from "@/types/funeralHome";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PackageForm from "./package-dialog/PackageForm";
import { packageFormSchema, PackageFormValues } from "./package-dialog/types";

interface PackageDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddPackage: (newPackage: ServicePackage) => void;
}

const PackageDialog = ({ isOpen, onOpenChange, onAddPackage }: PackageDialogProps) => {
  const { toast } = useToast();
  
  const packageForm = useForm<PackageFormValues>({
    resolver: zodResolver(packageFormSchema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      includedServices: []
    }
  });

  const resetPackageForm = () => {
    packageForm.reset();
  };

  const handleAddPackage = (data: PackageFormValues) => {
    const newPackage: ServicePackage = {
      id: `pkg-${Date.now()}`,
      name: data.name,
      price: data.price,
      description: data.description,
      includedServices: data.includedServices || [],
    };
    
    onAddPackage(newPackage);
    
    toast({
      title: "Νέο πακέτο",
      description: "Το πακέτο προστέθηκε επιτυχώς."
    });
    
    resetPackageForm();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) resetPackageForm();
      onOpenChange(open);
    }}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Προσθήκη Νέου Πακέτου</DialogTitle>
          <DialogDescription>
            Συμπληρώστε τα στοιχεία για το νέο πακέτο υπηρεσιών.
          </DialogDescription>
        </DialogHeader>
        
        <PackageForm
          form={packageForm}
          onSubmit={handleAddPackage}
          resetForm={resetPackageForm}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PackageDialog;
