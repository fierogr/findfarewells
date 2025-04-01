
import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter, MapPin } from "lucide-react";

// Updated Greek services for filtering
const commonServices = [
  "Βασικό πακέτο κηδείας",
  "Οργάνωση μνημοσύνων",
  "Επαναπατρισμός σορών και αποστολή στο εξωτερικό",
  "Στολισμός ναού - στεφάνια",
  "Ιδιόκτητες αίθουσες δεξιώσεων",
  "Λεωφορεία για τη μεταφορά των συγγενών",
  "Αποτέφρωση - καύση νεκρών",
  "24ωρη εξυπηρέτηση",
  "Φαγητό - κεράσματα"
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
    <Card className="sticky top-24">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Φίλτρα
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="pt-4">
        {/* Services Section */}
        <div className="mb-6">
          <h3 className="font-medium mb-3 text-sm">Υπηρεσίες</h3>
          <div className="space-y-4">
            {commonServices.map((service) => (
              <div key={service} className="flex items-start space-x-2">
                <Checkbox 
                  id={`sidebar-service-${service}`}
                  checked={selectedServices.includes(service)}
                  onCheckedChange={() => onServiceToggle(service)}
                />
                <label
                  htmlFor={`sidebar-service-${service}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {service}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <Separator className="my-4" />
        
        {/* Regions Section */}
        <div className="mb-6">
          <h3 className="font-medium mb-3 text-sm flex items-center gap-2">
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
