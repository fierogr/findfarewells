
import React from "react";
import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import RegionPrefectureSelect from "./RegionPrefectureSelect";
import ServicesCheckboxes from "./ServicesCheckboxes";
import { useRegionSearch } from "@/hooks/search/useRegionSearch";
import { REGIONS_AND_PREFECTURES, SERVICES } from "@/constants/geographicData";

interface RegionSearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RegionSearchDialog: React.FC<RegionSearchDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const {
    selectedRegion,
    selectedPrefecture,
    selectedServices,
    availablePrefectures,
    setSelectedRegion,
    setSelectedPrefecture,
    handleServiceToggle,
    handleSearch,
    handleReset
  } = useRegionSearch();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Αναζήτηση Γραφείων Τελετών</DialogTitle>
          <DialogDescription>
            Επιλέξτε την περιοχή, τον νομό και τις υπηρεσίες που σας ενδιαφέρουν.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Geographical Region and Prefecture Selection */}
          <RegionPrefectureSelect
            selectedRegion={selectedRegion}
            selectedPrefecture={selectedPrefecture}
            availablePrefectures={availablePrefectures}
            onRegionChange={setSelectedRegion}
            onPrefectureChange={setSelectedPrefecture}
            regions={Object.keys(REGIONS_AND_PREFECTURES)}
          />

          <Separator />

          {/* Services Selection */}
          <ServicesCheckboxes
            services={SERVICES}
            selectedServices={selectedServices}
            onServiceToggle={handleServiceToggle}
          />
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={handleReset} type="button">
            Επαναφορά
          </Button>
          <Button onClick={handleSearch} type="button" className="gap-2">
            <Search className="h-4 w-4" />
            Αναζήτηση
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RegionSearchDialog;
