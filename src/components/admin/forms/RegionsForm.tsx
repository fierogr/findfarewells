
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { PartnerFormValues } from "./combinedFormSchema";

const greekRegions = [
  "Νομός Θεσσαλονίκης",
  "Νομός Σερρών",
  "Νομός Κιλκίς",
  "Νομός Πέλλας",
  "Νομός Ημαθίας",
  "Νομός Χαλκιδικής"
];

interface RegionsFormProps {
  form: UseFormReturn<PartnerFormValues>;
  selectedRegions: string[];
  setSelectedRegions: React.Dispatch<React.SetStateAction<string[]>>;
}

const RegionsForm = ({ form, selectedRegions, setSelectedRegions }: RegionsFormProps) => {
  const toggleRegion = (region: string) => {
    setSelectedRegions(prev =>
      prev.includes(region)
        ? prev.filter(r => r !== region)
        : [...prev, region]
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Περιοχές Εξυπηρέτησης</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Επιλέξτε τις περιοχές στις οποίες δραστηριοποιείται το γραφείο τελετών.
      </p>
      
      <div className="grid grid-cols-2 gap-4">
        {greekRegions.map((region) => (
          <div key={region} className="flex items-center space-x-2">
            <Checkbox 
              id={`region-${region}`}
              checked={selectedRegions.includes(region)}
              onCheckedChange={() => toggleRegion(region)}
            />
            <label
              htmlFor={`region-${region}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {region}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegionsForm;
