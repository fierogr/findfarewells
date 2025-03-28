import React from "react";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { RegistrationFormValues } from "@/schemas/registrationFormSchema";
const greekRegions = ["Νομός Θεσσαλονίκης", "Νομός Σερρών", "Νομός Κιλκίς", "Νομός Πέλλας", "Νομός Ημαθίας", "Νομός Χαλκιδικής"];
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
    setSelectedRegions(prev => prev.includes(region) ? prev.filter(r => r !== region) : [...prev, region]);
  };
  return <div className="space-y-4">
      
    </div>;
};