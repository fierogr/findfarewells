
import React, { useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Phone, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import RegionPrefectureSelect from "./RegionPrefectureSelect";
import ServicesCheckboxes from "./ServicesCheckboxes";
import { useRegionSearch } from "@/hooks/search/useRegionSearch";
import { toast } from "@/components/ui/use-toast";
import { REGIONS_AND_PREFECTURES } from "@/constants/geographicData";
import { supabase } from "@/integrations/supabase/client";

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
    saveSearchRequest
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
    } catch (error) {
      console.error('Error saving search request:', error);
      // Don't show error to user, just log it
    }
    
    // Call the onSearch callback if provided
    if (onSearch) {
      onSearch({
        location: selectedRegion,
        prefecture: selectedPrefecture,
        services: selectedServices
      });
    }
    
    // Close the dialog
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Αναζήτηση Γραφείων Τελετών</DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-6">
          {/* Region and Prefecture Selection */}
          <RegionPrefectureSelect 
            selectedRegion={selectedRegion}
            selectedPrefecture={selectedPrefecture}
            availablePrefectures={availablePrefectures}
            onRegionChange={setSelectedRegion}
            onPrefectureChange={setSelectedPrefecture}
            regions={Object.keys(REGIONS_AND_PREFECTURES)}
            disabled={isLoading || isSaving}
          />

          <Separator />

          {/* Phone Number Field */}
          <div className="space-y-2">
            <Label htmlFor="phone-number">Τηλέφωνο Επικοινωνίας</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Phone className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input
                id="phone-number"
                type="tel"
                placeholder="Εισάγετε το τηλέφωνό σας"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="pl-10"
                required
                disabled={isLoading || isSaving}
              />
            </div>
          </div>

          <Separator />

          {/* Services Checkboxes */}
          <ServicesCheckboxes 
            services={["Πλήρεις Υπηρεσίες Κηδείας", "Αποτέφρωση", "Μεταφορά Σορού", "Μνημόσυνα", "Στολισμός", "Έκδοση Πιστοποιητικών"]}
            selectedServices={selectedServices}
            onServiceToggle={handleServiceToggle}
            disabled={isLoading || isSaving}
          />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 pt-4">
            <Button 
              variant="outline" 
              onClick={handleReset} 
              className="sm:flex-1"
              disabled={isLoading || isSaving}
            >
              Επαναφορά
            </Button>
            <Button 
              onClick={handleSubmit} 
              className="sm:flex-1"
              disabled={isLoading || isSaving}
            >
              {isLoading || isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Αναζήτηση...
                </>
              ) : (
                "Αναζήτηση"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RegionSearchDialog;
