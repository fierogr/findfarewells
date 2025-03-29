
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { PartnerFormValues } from "./combinedFormSchema";
import { GREEK_PREFECTURES } from "@/utils/prefectureData";
import { REGIONS_AND_PREFECTURES } from "@/constants/geographicData";

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
      
      {Object.entries(REGIONS_AND_PREFECTURES).map(([region, prefectures]) => (
        <div key={region} className="mb-6">
          <h4 className="font-medium text-sm mb-2">{region}</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
  );
};

export default RegionsForm;
