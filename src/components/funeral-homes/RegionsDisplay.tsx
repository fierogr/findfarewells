
import React from "react";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RegionsDisplayProps {
  regions?: string[];
}

export const RegionsDisplay = ({ regions }: RegionsDisplayProps) => {
  // Enhanced null check - make sure we don't render with empty regions
  const hasRegions = Array.isArray(regions) && regions.length > 0;
  
  console.log("RegionsDisplay: Received regions:", regions);
  
  if (!hasRegions) {
    console.log("RegionsDisplay: No regions to display");
    return null;
  }

  console.log("RegionsDisplay: Displaying regions:", regions);

  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 mb-2">
        <MapPin className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-lg font-medium">Περιοχές Εξυπηρέτησης</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {regions.map((region, index) => (
          <Badge key={index} variant="outline" className="px-3 py-1">
            {region}
          </Badge>
        ))}
      </div>
    </div>
  );
};
