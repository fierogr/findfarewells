
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
import { Filter } from "lucide-react";

// Greek services for filtering
const commonServices = [
  "Βασικό πακέτο",
  "Αποτέφρωση",
  "Έξτρα στολισμός", 
  "Φαγητό",
  "Μουσική"
];

interface FilterSheetProps {
  selectedServices: string[];
  onServiceToggle: (service: string) => void;
  onClearFilters: () => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const FilterSheet = ({ 
  selectedServices, 
  onServiceToggle, 
  onClearFilters, 
  isOpen,
  onOpenChange
}: FilterSheetProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Φίλτρα
          {selectedServices.length > 0 && (
            <span className="ml-1 text-xs bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center">
              {selectedServices.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[300px] sm:w-[450px]">
        <SheetHeader>
          <SheetTitle>Φίλτρα Υπηρεσιών</SheetTitle>
          <SheetDescription>
            Επιλέξτε τις υπηρεσίες που σας ενδιαφέρουν
          </SheetDescription>
        </SheetHeader>
        <Separator className="my-4" />
        <div className="grid grid-cols-1 gap-4 my-4">
          <div className="space-y-4">
            <h3 className="font-medium">Υπηρεσίες</h3>
            {commonServices.map((service) => (
              <div key={service} className="flex items-start space-x-2">
                <Checkbox 
                  id={`service-${service}`}
                  checked={selectedServices.includes(service)}
                  onCheckedChange={() => onServiceToggle(service)}
                />
                <label
                  htmlFor={`service-${service}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {service}
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
