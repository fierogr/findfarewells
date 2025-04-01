
import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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

interface FilterSheetProps {
  selectedServices: string[];
  selectedRegions: string[];
  onServiceToggle: (service: string) => void;
  onRegionToggle: (region: string) => void;
  onClearFilters: () => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const FilterSheet = ({ 
  selectedServices, 
  selectedRegions,
  onServiceToggle, 
  onRegionToggle,
  onClearFilters, 
  isOpen,
  onOpenChange
}: FilterSheetProps) => {
  const totalActiveFilters = selectedServices.length + selectedRegions.length;
  
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Φίλτρα
          {totalActiveFilters > 0 && (
            <span className="ml-1 text-xs bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center">
              {totalActiveFilters}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[300px] sm:w-[450px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Φίλτρα</SheetTitle>
          <SheetDescription>
            Επιλέξτε τις υπηρεσίες και περιοχές που σας ενδιαφέρουν
          </SheetDescription>
        </SheetHeader>
        <Separator className="my-4" />
        
        {/* Services Section */}
        <div className="grid grid-cols-1 gap-4 mb-6">
          <div className="space-y-4">
            <h3 className="font-medium">Υπηρεσίες</h3>
            {commonServices.map((service) => (
              <div key={service} className="flex items-start space-x-2">
                <Checkbox 
                  id={`service-${service.replace(/\s+/g, '-')}`}
                  checked={selectedServices.includes(service)}
                  onCheckedChange={() => onServiceToggle(service)}
                />
                <label
                  htmlFor={`service-${service.replace(/\s+/g, '-')}`}
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
        <div className="grid grid-cols-1 gap-4 mb-6">
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Περιοχές
            </h3>
            {commonRegions.map((region) => (
              <div key={region} className="flex items-start space-x-2">
                <Checkbox 
                  id={`region-${region.replace(/\s+/g, '-')}`}
                  checked={selectedRegions.includes(region)}
                  onCheckedChange={() => onRegionToggle(region)}
                />
                <label
                  htmlFor={`region-${region.replace(/\s+/g, '-')}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {region}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={onClearFilters}>
            Καθαρισμός
          </Button>
          <Button onClick={() => onOpenChange(false)}>
            Εφαρμογή
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FilterSheet;
