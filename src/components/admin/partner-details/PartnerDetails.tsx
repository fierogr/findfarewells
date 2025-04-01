
import React from "react";
import { usePartnerDetails } from "@/hooks/usePartnerDetails";
import PartnerNavigation from "./PartnerNavigation";
import PartnerDetailsTabs from "./PartnerDetailsTabs";
import PartnerDetailsError from "./PartnerDetailsError";
import DeletePartnerDialog from "./DeletePartnerDialog";

interface PartnerDetailsProps {
  partnerId: string;
  onBack: () => void;
}

const PartnerDetails = ({ partnerId, onBack }: PartnerDetailsProps) => {
  const {
    editedHome,
    setEditedHome,
    isLoading,
    error,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    handleSave
  } = usePartnerDetails(partnerId);

  if (isLoading) {
    return <div className="text-center py-4">Φόρτωση στοιχείων συνεργάτη...</div>;
  }

  if (error || !editedHome) {
    return <PartnerDetailsError onBack={onBack} />;
  }

  const handleFieldChange = (field: keyof typeof editedHome, value: any) => {
    setEditedHome({ ...editedHome, [field]: value });
  };

  return (
    <div className="space-y-6">
      <PartnerNavigation 
        onBack={onBack} 
        onDelete={() => setIsDeleteDialogOpen(true)} 
        onSave={handleSave} 
      />

      <PartnerDetailsTabs 
        editedHome={editedHome}
        onInputChange={(field, value) => handleFieldChange(field, value)}
        onServicesChange={(services) => handleFieldChange("services", services)}
        onPackagesChange={(packages) => handleFieldChange("packages", packages)}
        onAdditionalServicesChange={(additionalServices) => handleFieldChange("additionalServices", additionalServices)}
        onRegionsChange={(regions) => {
          console.log("PartnerDetails: Updating regions to:", regions);
          handleFieldChange("regions", [...regions]);
        }}
        onPhotoChange={(field, value) => handleFieldChange(field, value)}
      />
      
      <DeletePartnerDialog 
        isOpen={isDeleteDialogOpen} 
        onOpenChange={setIsDeleteDialogOpen}
        partnerId={partnerId}
        onBack={onBack}
      />
    </div>
  );
};

export default PartnerDetails;
