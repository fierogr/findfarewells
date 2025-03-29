
import React, { useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { useRegionSearch } from "@/hooks/search/useRegionSearch";
import { REGIONS_AND_PREFECTURES } from "@/constants/geographicData";
import { supabase } from "@/integrations/supabase/client";
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
    if (!selectedPrefecture && !selectedRegion) {
      toast({
        title: "Απαιτούμενα πεδία",
        description: "Παρακαλώ επιλέξτε τουλάχιστον μία περιοχή ή νομό για να συνεχίσετε.",
        variant: "destructive",
      });
      return;
    }

    if (!phoneNumber) {
      toast({
        title: "Απαιτούμενο πεδίο",
        description: "Παρακαλώ εισάγετε ένα τηλέφωνο επικοινωνίας για να συνεχίσετε.",
        variant: "destructive",
      });
      return;
    }

    // Save the search request to the database
    try {
      // Insert the search request
      const { data: insertedData, error } = await supabase.from('search_requests').insert({
        location: selectedRegion,
        prefecture: selectedPrefecture,
        services: selectedServices.length > 0 ? selectedServices : null,
        phone_number: phoneNumber
      }).select('id').single();

      if (error) throw error;
      
      // If insertion was successful, trigger the notification edge function
      if (insertedData?.id) {
        try {
          await supabase.functions.invoke('notify-search-request', {
            body: { id: insertedData.id }
          });
        } catch (notifyError) {
          // Just log the error but don't show to user
          console.error('Error sending notification:', notifyError);
        }
      }

      console.log("Search request saved successfully, calling onSearch callback");
      
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
      console.error('Error saving search request:', error);
      toast({
        title: "Σφάλμα",
        description: "Παρουσιάστηκε σφάλμα κατά την αποθήκευση του αιτήματος. Παρακαλώ δοκιμάστε ξανά.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader title="Αναζήτηση Γραφείων Τελετών" />
        
        <SearchFormContent
          selectedRegion={selectedRegion}
          selectedPrefecture={selectedPrefecture}
          selectedServices={selectedServices}
          availablePrefectures={availablePrefectures}
          phoneNumber={phoneNumber}
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
