
import React from "react";
import { ServicePackage } from "@/types/funeralHome";
import PackageCard from "./PackageCard";

interface PackagesListProps {
  packages: ServicePackage[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

const PackagesList = ({ packages, onEdit, onDelete }: PackagesListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {packages.map((pkg, index) => (
        <PackageCard 
          key={pkg.id}
          pkg={pkg}
          index={index}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default PackagesList;
