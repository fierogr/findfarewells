
import React from "react";
import { FuneralHome, ServicePackage } from "@/types/funeralHome";
import FuneralHomeCard from "../FuneralHomeCard";

interface PackageWithHome {
  home: FuneralHome;
  package: ServicePackage | null;
}

interface ResultsListProps {
  paginatedResults: PackageWithHome[];
  selectedServices: string[];
  isSelecting: boolean;
  onSelectPackage: (home: FuneralHome, packageToShow: ServicePackage | null) => Promise<void>;
}

const ResultsList = ({
  paginatedResults,
  selectedServices,
  isSelecting,
  onSelectPackage
}: ResultsListProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 mb-6">
      {paginatedResults.map((item, index) => (
        <FuneralHomeCard 
          key={`${item.home.id}-${item.package?.id || 'basic'}-${index}`}
          home={item.home}
          packageToShow={item.package}
          selectedServices={selectedServices}
          onSelectPackage={onSelectPackage}
          isSelecting={isSelecting}
        />
      ))}
    </div>
  );
};

export default ResultsList;
