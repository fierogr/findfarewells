
import React from "react";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { RegistrationFormValues } from "@/schemas/registrationFormSchema";
import { REGIONS_AND_PREFECTURES } from "@/constants/geographicData";

interface RegionsFieldsProps {
  form: UseFormReturn<RegistrationFormValues>;
  selectedRegions: string[];
  setSelectedRegions: React.Dispatch<React.SetStateAction<string[]>>;
}

export const RegionsFields = ({
  form,
  selectedRegions,
  setSelectedRegions
}: RegionsFieldsProps) => {
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
        <FormLabel>Περιοχές Εξυπηρέτησης</FormLabel>
        <div className="mt-2 space-y-6">
          {Object.entries(REGIONS_AND_PREFECTURES).map(([region, prefectures]) => (
            <div key={region} className="space-y-2">
              <h4 className="font-medium text-sm">{region}</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {prefectures.map((prefecture) => (
                  <div key={prefecture} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`region-${prefecture}`}
                      checked={selectedRegions.includes(prefecture)}
                      onCheckedChange={() => toggleRegion(prefecture)}
                    />
                    <label
                      htmlFor={`region-${prefecture}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {prefecture}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <FormMessage />
      </FormItem>
    </div>
  );
};
