
import { useState } from "react";
import { ServicePackage } from "@/types/funeralHome";

interface PackageFormData {
  name: string;
  description: string;
  price: string;
  includedServices: string[];
}

export const usePackageForm = (
  packages: ServicePackage[],
  setPackages: React.Dispatch<React.SetStateAction<ServicePackage[]>>,
  setIsAddingPackage: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<PackageFormData>({
    name: "",
    description: "",
    price: "",
    includedServices: [],
  });

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      includedServices: [],
    });
    setIsAddingPackage(false);
    setEditIndex(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => {
      const updatedServices = prev.includedServices.includes(service)
        ? prev.includedServices.filter(s => s !== service)
        : [...prev.includedServices, service];
      
      return { ...prev, includedServices: updatedServices };
    });
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
      includedServices: formData.includedServices,
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
      includedServices: pkg.includedServices || [],
    });
    setEditIndex(index);
    setIsAddingPackage(true);
  };

  const handleDeletePackage = (index: number) => {
    setPackages(prev => prev.filter((_, i) => i !== index));
  };

  return {
    formData,
    editIndex,
    handleChange,
    handleServiceToggle,
    handleAddPackage,
    resetForm,
    handleEditPackage,
    handleDeletePackage
  };
};
