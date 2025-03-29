
import React, { useState } from "react";
import { ServicePackage } from "@/types/funeralHome";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import PackageFormEditor from "./packages/PackageFormEditor";
import PackagesList from "./packages/PackagesList";
import EmptyPackageState from "./packages/EmptyPackageState";
import { usePackageForm } from "./packages/usePackageForm";

interface PackagesFormProps {
  packages: ServicePackage[];
  setPackages: React.Dispatch<React.SetStateAction<ServicePackage[]>>;
}

const PackagesForm = ({ packages, setPackages }: PackagesFormProps) => {
  const [isAddingPackage, setIsAddingPackage] = useState(false);
  const { 
    formData, 
    editIndex, 
    handleChange, 
    handleServiceToggle, 
    handleAddPackage, 
    resetForm, 
    handleEditPackage, 
    handleDeletePackage 
  } = usePackageForm(packages, setPackages, setIsAddingPackage);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Πακέτα Υπηρεσιών</h3>
        {!isAddingPackage && (
          <Button 
            type="button" 
            onClick={() => setIsAddingPackage(true)}
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" /> Προσθήκη Πακέτου
          </Button>
        )}
      </div>

      {isAddingPackage ? (
        <PackageFormEditor
          formData={formData}
          handleChange={handleChange}
          handleServiceToggle={handleServiceToggle}
          handleAddPackage={handleAddPackage}
          resetForm={resetForm}
          editIndex={editIndex}
        />
      ) : packages.length === 0 ? (
        <EmptyPackageState onAddPackage={() => setIsAddingPackage(true)} />
      ) : (
        <PackagesList 
          packages={packages} 
          onEdit={handleEditPackage} 
          onDelete={handleDeletePackage} 
        />
      )}
    </div>
  );
};

export default PackagesForm;
