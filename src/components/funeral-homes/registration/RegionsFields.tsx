
import React from "react";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { RegistrationFormValues } from "@/schemas/registrationFormSchema";

const greekRegions = [
  "Νομός Θεσσαλονίκης",
  "Νομός Σερρών",
  "Νομός Κιλκίς",
  "Νομός Πέλλας",
  "Νομός Ημαθίας",
  "Νομός Χαλκιδικής"
];

interface RegionsFieldsProps {
  form: UseFormReturn<RegistrationFormValues>;
  selectedRegions: string[];
  setSelectedRegions: React.Dispatch<React.SetStateAction<string[]>>;
}

export const RegionsFields = ({ form, selectedRegions, setSelectedRegions }: RegionsFieldsProps) => {
  const toggleRegion = (region: string) => {
    setSelectedRegions(prev =>
      prev.includes(region)
        ? prev.filter(r => r !== region)
        : [...prev, region]
    );
  };

  return (
    <div className="space-y-4">
      <FormItem>
        <FormLabel className="text-base">Περιοχές Εξυπηρέτησης</FormLabel>
        <div className="grid grid-cols-2 gap-4 mt-2">
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
        <FormMessage />
      </FormItem>
    </div>
  );
};
