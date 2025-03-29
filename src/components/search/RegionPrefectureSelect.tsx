
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RegionPrefectureSelectProps {
  selectedRegion: string;
  selectedPrefecture: string;
  availablePrefectures: string[];
  onRegionChange: (value: string) => void;
  onPrefectureChange: (value: string) => void;
  regions: string[];
  disabled?: boolean; // Add optional disabled property
}

const RegionPrefectureSelect: React.FC<RegionPrefectureSelectProps> = ({
  selectedRegion,
  selectedPrefecture,
  availablePrefectures,
  onRegionChange,
  onPrefectureChange,
  regions,
  disabled,
}) => {
  return (
    <>
      <div className="space-y-2">
        <label htmlFor="region" className="text-sm font-medium leading-none">
          Γεωγραφική Περιοχή
        </label>
        <Select
          value={selectedRegion}
          onValueChange={onRegionChange}
          disabled={disabled}
        >
          <SelectTrigger id="region" className="w-full">
            <SelectValue placeholder="Επιλέξτε περιοχή" />
          </SelectTrigger>
          <SelectContent>
            {regions.map((region) => (
              <SelectItem key={region} value={region}>
                {region}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label htmlFor="prefecture" className="text-sm font-medium leading-none">
          Νομός
        </label>
        <Select
          value={selectedPrefecture}
          onValueChange={onPrefectureChange}
          disabled={!selectedRegion || disabled}
        >
          <SelectTrigger id="prefecture" className="w-full">
            <SelectValue placeholder={selectedRegion ? "Επιλέξτε νομό" : "Πρώτα επιλέξτε περιοχή"} />
          </SelectTrigger>
          <SelectContent>
            {availablePrefectures.map((prefecture) => (
              <SelectItem key={prefecture} value={prefecture}>
                {prefecture}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default RegionPrefectureSelect;
