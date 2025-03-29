
import React from "react";
import { Separator } from "@/components/ui/separator";
import RegionPrefectureSelect from "./RegionPrefectureSelect";
import ServicesCheckboxes from "./ServicesCheckboxes";
import PhoneNumberField from "./PhoneNumberField";
import ActionButtons from "./ActionButtons";

interface SearchFormContentProps {
  selectedRegion: string;
  selectedPrefecture: string;
  selectedServices: string[];
  availablePrefectures: string[];
  phoneNumber: string;
  isLoading: boolean;
  onRegionChange: (value: string) => void;
  onPrefectureChange: (value: string) => void;
  onServiceToggle: (service: string) => void;
  onPhoneNumberChange: (value: string) => void;
  onReset: () => void;
  onSubmit: () => void;
  regions: string[];
}

const SearchFormContent: React.FC<SearchFormContentProps> = ({
  selectedRegion,
  selectedPrefecture,
  selectedServices,
  availablePrefectures,
  phoneNumber,
  isLoading,
  onRegionChange,
  onPrefectureChange,
  onServiceToggle,
  onPhoneNumberChange,
  onReset,
  onSubmit,
  regions
}) => {
  return (
    <div className="py-4 space-y-6">
      {/* Region and Prefecture Selection */}
      <RegionPrefectureSelect 
        selectedRegion={selectedRegion}
        selectedPrefecture={selectedPrefecture}
        availablePrefectures={availablePrefectures}
        onRegionChange={onRegionChange}
        onPrefectureChange={onPrefectureChange}
        regions={regions}
        disabled={isLoading}
      />

      <Separator />

      {/* Phone Number Field */}
      <PhoneNumberField
        value={phoneNumber}
        onChange={onPhoneNumberChange}
        disabled={isLoading}
      />

      <Separator />

      {/* Services Checkboxes */}
      <ServicesCheckboxes 
        services={["Πλήρεις Υπηρεσίες Κηδείας", "Αποτέφρωση", "Μεταφορά Σορού", "Μνημόσυνα", "Στολισμός", "Έκδοση Πιστοποιητικών"]}
        selectedServices={selectedServices}
        onServiceToggle={onServiceToggle}
        disabled={isLoading}
      />

      {/* Action Buttons */}
      <ActionButtons
        onReset={onReset}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
    </div>
  );
};

export default SearchFormContent;
