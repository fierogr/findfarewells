
import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter } from "lucide-react";

// Greek services for filtering - reusing the same list from FilterSheet
const commonServices = [
  "Βασικό πακέτο",
  "Αποτέφρωση",
  "Έξτρα στολισμός", 
  "Φαγητό",
  "Μουσική"
];

interface FilterSidebarProps {
  selectedServices: string[];
  onServiceToggle: (service: string) => void;
  onClearFilters: () => void;
}

const FilterSidebar = ({ 
  selectedServices, 
  onServiceToggle, 
  onClearFilters 
}: FilterSidebarProps) => {
  return (
    <Card className="sticky top-24">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Φίλτρα Υπηρεσιών
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="pt-4">
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

        {selectedServices.length > 0 && (
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
