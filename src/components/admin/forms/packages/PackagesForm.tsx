
import React, { useState } from "react";
import { ServicePackage } from "@/types/funeralHome";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import PackageCard from "./PackageCard";
import PackageFormEditor from "./PackageFormEditor";
import EmptyPackageState from "./EmptyPackageState";

interface PackagesFormProps {
  packages: ServicePackage[];
  setPackages: React.Dispatch<React.SetStateAction<ServicePackage[]>>;
}

interface PackageFormData {
  name: string;
  description: string;
  price: string;
  includedServices: string;
}

const PackagesForm = ({ packages, setPackages }: PackagesFormProps) => {
  const [isAddingPackage, setIsAddingPackage] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<PackageFormData>({
    name: "",
    description: "",
    price: "",
    includedServices: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      includedServices: "",
    });
    setIsAddingPackage(false);
    setEditIndex(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddPackage = () => {
    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      alert("Παρακαλώ εισάγετε μια έγκυρη τιμή");
      return;
    }

    if (!formData.name) {
      alert("Παρακαλώ εισάγετε ένα όνομα για το πακέτο");
      return;
    }

    const newPackage: ServicePackage = {
      id: crypto.randomUUID(),
      name: formData.name,
      price: price,
      description: formData.description,
      includedServices: formData.includedServices
        ? formData.includedServices.split(',').map(s => s.trim())
        : [],
    };

    if (editIndex !== null) {
      // Update existing package
      const updatedPackages = [...packages];
      updatedPackages[editIndex] = { ...newPackage, id: packages[editIndex].id };
      setPackages(updatedPackages);
    } else {
      // Add new package
      setPackages(prev => [...prev, newPackage]);
    }

    resetForm();
  };

  const handleEditPackage = (index: number) => {
    const pkg = packages[index];
    setFormData({
      name: pkg.name,
      description: pkg.description || "",
      price: pkg.price.toString(),
      includedServices: pkg.includedServices.join(", "),
    });
    setEditIndex(index);
    setIsAddingPackage(true);
  };

  const handleDeletePackage = (index: number) => {
    setPackages(prev => prev.filter((_, i) => i !== index));
  };

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
          handleAddPackage={handleAddPackage}
          resetForm={resetForm}
          editIndex={editIndex}
        />
      ) : packages.length === 0 ? (
        <EmptyPackageState onAddPackage={() => setIsAddingPackage(true)} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {packages.map((pkg, index) => (
            <PackageCard 
              key={pkg.id}
              pkg={pkg}
              index={index}
              onEdit={handleEditPackage}
              onDelete={handleDeletePackage}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PackagesForm;
