
import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter, MapPin, Check } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Greek services for filtering - reusing the same list from FilterSheet
const commonServices = [
  "Βασικό πακέτο",
  "Αποτέφρωση",
  "Έξτρα στολισμός", 
  "Φαγητό",
  "Μουσική"
];

// Greek regions for filtering
const commonRegions = [
  "Νομός Θεσσαλονίκης",
  "Νομός Σερρών",
  "Νομός Κιλκίς",
  "Νομός Πέλλας",
  "Νομός Ημαθίας",
  "Νομός Χαλκιδικής"
];

interface FilterSidebarProps {
  selectedServices: string[];
  selectedRegions: string[];
  onServiceToggle: (service: string) => void;
  onRegionToggle: (region: string) => void;
  onClearFilters: () => void;
}

const FilterSidebar = ({ 
  selectedServices, 
  selectedRegions,
  onServiceToggle, 
  onRegionToggle,
  onClearFilters 
}: FilterSidebarProps) => {
  const hasActiveFilters = selectedServices.length > 0 || selectedRegions.length > 0;
  
  return (
    <Card className="sticky top-24 border rounded-xl shadow-sm overflow-hidden">
      <CardHeader className="pb-3 bg-white">
        <CardTitle className="text-lg font-roboto font-bold flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Πακέτο (Βασική)
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="pt-4 bg-white">
        {/* Services Section - Now using radio buttons like in the image */}
        <div className="mb-6">
          <RadioGroup defaultValue="Βασική" className="space-y-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Βασική" id="option-basic" className="h-5 w-5" />
              <label 
                htmlFor="option-basic" 
                className="text-base font-medium leading-none cursor-pointer flex items-center"
              >
                Βασική
                <div className="ml-auto">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Πυρός & κλοπής" id="option-fire" className="h-5 w-5" />
              <label 
                htmlFor="option-fire" 
                className="text-base font-medium leading-none cursor-pointer flex items-center"
              >
                Πυρός & κλοπής
                <div className="ml-auto">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Μικτή" id="option-mixed" className="h-5 w-5" />
              <label 
                htmlFor="option-mixed" 
                className="text-base font-medium leading-none cursor-pointer flex items-center"
              >
                Μικτή 
                <div className="ml-auto">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </label>
            </div>
          </RadioGroup>
        </div>
        
        <Separator className="my-4" />
        
        {/* Regions Section */}
        <div className="mb-6">
          <h3 className="font-medium mb-3 text-sm font-roboto flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Περιοχές
          </h3>
          <div className="space-y-4">
            {commonRegions.map((region) => (
              <div key={region} className="flex items-start space-x-2">
                <Checkbox 
                  id={`sidebar-region-${region}`}
                  checked={selectedRegions.includes(region)}
                  onCheckedChange={() => onRegionToggle(region)}
                />
                <label
                  htmlFor={`sidebar-region-${region}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {region}
                </label>
              </div>
            ))}
          </div>
        </div>

        {hasActiveFilters && (
          <Button 
            variant="outline" 
            onClick={onClearFilters}
            className="w-full mt-4"
          >
            Καθαρισμός Φίλτρων
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default FilterSidebar;
