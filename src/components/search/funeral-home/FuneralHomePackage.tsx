
import React from "react";
import { FuneralHome, ServicePackage } from "@/types/funeralHome";
import PriceDisplay from "./PriceDisplay";
import ServicesList from "./ServicesList";
import CardActions from "./CardActions";

interface FuneralHomePackageProps {
  home: FuneralHome;
  mainPackage: ServicePackage | null;
  onSelectPackage: () => void;
  isSelecting: boolean;
}

const FuneralHomePackage = ({ 
  home, 
  mainPackage, 
  onSelectPackage, 
  isSelecting 
}: FuneralHomePackageProps) => {
  // Determine which services to display
  const servicesToDisplay = mainPackage 
    ? mainPackage.includedServices 
    : (Array.isArray(home.services) ? home.services : []);

  return (
    <div className="p-4 md:p-6 bg-secondary flex flex-col">
      <PriceDisplay home={home} mainPackage={mainPackage} />
      
      <div className="mb-4">
        <ServicesList services={servicesToDisplay} limit={4} />
      </div>
      
      <div className="mt-auto">
        <CardActions 
          homeId={home.id} 
          onSelectPackage={onSelectPackage} 
          isSelecting={isSelecting} 
        />
      </div>
    </div>
  );
};

export default FuneralHomePackage;
