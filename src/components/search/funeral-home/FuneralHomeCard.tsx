
import React from "react";
import { FuneralHome, ServicePackage } from "@/types/funeralHome";
import { Card, CardContent } from "@/components/ui/card";
import FuneralHomeImage from "./FuneralHomeImage";
import FuneralHomeInfo from "./FuneralHomeInfo";
import FuneralHomePackage from "./FuneralHomePackage";

interface FuneralHomeCardProps {
  home: FuneralHome;
  selectedServices: string[];
  packageToShow?: ServicePackage | null;
  onSelectPackage?: (home: FuneralHome, packageToShow: ServicePackage | null) => Promise<void>;
  isSelecting?: boolean;
}

const FuneralHomeCard = ({
  home,
  selectedServices,
  packageToShow = null,
  onSelectPackage,
  isSelecting = false
}: FuneralHomeCardProps) => {
  // Get the package to display - either the provided one or the first one
  const mainPackage = packageToShow || (home.packages && home.packages.length > 0 ? home.packages[0] : null);
  
  const handleSelectPackage = () => {
    if (onSelectPackage) {
      onSelectPackage(home, mainPackage);
    }
  };
  
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-3 h-full">
          <FuneralHomeImage 
            home={home} 
            packageToShow={packageToShow}
          />
          
          <FuneralHomeInfo 
            home={home}
          />
          
          <FuneralHomePackage 
            home={home}
            mainPackage={mainPackage}
            onSelectPackage={handleSelectPackage}
            isSelecting={isSelecting}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default FuneralHomeCard;
