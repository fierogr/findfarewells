
import React from "react";
import { FuneralHome, ServicePackage } from "@/types/funeralHome";

interface PriceDisplayProps {
  home: FuneralHome;
  mainPackage: ServicePackage | null;
}

const PriceDisplay = ({ home, mainPackage }: PriceDisplayProps) => {
  const getDisplayPrice = () => {
    if (mainPackage) {
      return mainPackage.price;
    } else if (home.packages && home.packages.length > 0) {
      return home.packages[0].price;
    }
    return home.basicPrice;
  };

  return (
    <div className="text-center mb-4">
      <p className="text-sm text-muted-foreground mb-1">
        {mainPackage ? mainPackage.name : "Βασική Υπηρεσία"} Από
      </p>
      <p className="text-3xl font-semibold text-primary">
        {getDisplayPrice().toLocaleString()}€
      </p>
      <p className="text-xs text-muted-foreground">Συν ΦΠΑ</p>
    </div>
  );
};

export default PriceDisplay;
