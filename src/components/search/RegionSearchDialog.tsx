
import React, { useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { useRegionSearch } from "@/hooks/search/useRegionSearch";
import { REGIONS_AND_PREFECTURES } from "@/constants/geographicData";
import DialogHeader from "./DialogHeader";
import SearchFormContent from "./SearchFormContent";

interface RegionSearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSearch?: (data: { location: string; prefecture: string | null; services: string[] }) => void;
  initialLocation?: string;
  initialPrefecture?: string | null;
  initialServices?: string[];
  isLoading?: boolean;
}

const RegionSearchDialog = ({ 
  open, 
  onOpenChange,
  onSearch,
  initialLocation = "",
  initialPrefecture = null,
  initialServices = [],
  isLoading = false
}: RegionSearchDialogProps) => {
  const {
    selectedRegion,
    selectedPrefecture,
    selectedServices,
    availablePrefectures,
    phoneNumber,
    isSaving,
    setPhoneNumber,
    setSelectedRegion,
    setSelectedPrefecture,
    setSelectedServices,
    handleServiceToggle,
    handleReset,
  } = useRegionSearch();

  // Initialize form with values from props when dialog opens
  useEffect(() => {
    if (open) {
      if (initialLocation) {
        setSelectedRegion(initialLocation);
      }
      
      if (initialPrefecture) {
        setSelectedPrefecture(initialPrefecture);
      }
      
      if (initialServices && initialServices.length > 0) {
        setSelectedServices(initialServices);
      }
    }
  }, [open, initialLocation, initialPrefecture, initialServices, setSelectedRegion, setSelectedPrefecture, setSelectedServices]);

  const handleSubmit = async () => {
    try {
      // Validate form inputs
      if (!phoneNumber) {
        toast({
          title: "Απαιτούμενο πεδίο",
          description: "Παρακαλώ εισάγετε ένα τηλέφωνο επικοινωνίας για να συνεχίσετε.",
          variant: "destructive",
        });
        return;
      }

      if (!selectedRegion && !selectedPrefecture) {
        toast({
          title: "Απαιτούμενα πεδία",
          description: "Παρακαλώ επιλέξτε τουλάχιστον μία περιοχή ή νομό για να συνεχίσετε.",
          variant: "destructive",
        });
        return;
      }

      // Skip DB storage and proceed with search
      console.log("Proceeding with search without saving to database");
      
      // Call the onSearch callback if provided
      if (onSearch) {
        onSearch({
          location: selectedRegion,
          prefecture: selectedPrefecture,
          services: selectedServices
        });
      } else {
        console.error("No onSearch callback provided to RegionSearchDialog");
      }
      
      // Close the dialog
      onOpenChange(false);
      
    } catch (error) {
      console.error('Error during search process:', error);
      toast({
        title: "Σφάλμα",
        description: "Παρουσιάστηκε σφάλμα κατά την επεξεργασία του αιτήματος. Παρακαλώ δοκιμάστε ξανά.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader 
          title="Αναζήτηση Γραφείων Τελετών" 
          description="Συμπληρώστε τα παρακάτω πεδία για να βρείτε γραφεία τελετών στην περιοχή σας."
        />
        
        <SearchFormContent
          selectedRegion={selectedRegion}
          selectedPrefecture={selectedPrefecture}
          selectedServices={selectedServices}
          availablePrefectures={availablePrefectures}
          phoneNumber={phoneNumber || ""}
          isLoading={isLoading || isSaving}
          onRegionChange={setSelectedRegion}
          onPrefectureChange={setSelectedPrefecture}
          onServiceToggle={handleServiceToggle}
          onPhoneNumberChange={setPhoneNumber}
          onReset={handleReset}
          onSubmit={handleSubmit}
          regions={Object.keys(REGIONS_AND_PREFECTURES)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default RegionSearchDialog;
