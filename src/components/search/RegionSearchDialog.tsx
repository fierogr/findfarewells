
import React from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Phone } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import RegionPrefectureSelect from "./RegionPrefectureSelect";
import ServicesCheckboxes from "./ServicesCheckboxes";
import { useRegionSearch } from "@/hooks/search/useRegionSearch";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { REGIONS_AND_PREFECTURES } from "@/constants/geographicData";

interface RegionSearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RegionSearchDialog = ({ open, onOpenChange }: RegionSearchDialogProps) => {
  const {
    selectedRegion,
    selectedPrefecture,
    selectedServices,
    availablePrefectures,
    phoneNumber,
    setPhoneNumber,
    setSelectedRegion,
    setSelectedPrefecture,
    handleServiceToggle,
    handleSearch,
    handleReset
  } = useRegionSearch();

  const saveSearchRequest = async () => {
    try {
      const { error } = await supabase.from('search_requests').insert({
        location: selectedRegion,
        prefecture: selectedPrefecture,
        services: selectedServices.length > 0 ? selectedServices : null,
        phone_number: phoneNumber
      });

      if (error) throw error;
    } catch (error) {
      console.error('Error saving search request:', error);
      // Don't show error to user, just log it
    }
  };

  const handleSubmit = async () => {
    if (!selectedRegion || !selectedPrefecture || !phoneNumber) {
      toast({
        title: "Απαιτούνται πεδία",
        description: "Παρακαλώ συμπληρώστε όλα τα υποχρεωτικά πεδία για να συνεχίσετε.",
        variant: "destructive",
      });
      return;
    }

    // Save the search request to the database
    await saveSearchRequest();
    
    // Close the dialog and redirect to search results
    onOpenChange(false);
    handleSearch();
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
          />

          <Separator />

          {/* Phone Number Field */}
          <div className="space-y-2">
            <FormLabel htmlFor="phone-number">Τηλέφωνο Επικοινωνίας</FormLabel>
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
              />
            </div>
          </div>

          <Separator />

          {/* Services Checkboxes */}
          <ServicesCheckboxes 
            services={["Πλήρεις Υπηρεσίες Κηδείας", "Αποτέφρωση", "Μεταφορά Σορού", "Μνημόσυνα", "Στολισμός", "Έκδοση Πιστοποιητικών"]}
            selectedServices={selectedServices}
            onServiceToggle={handleServiceToggle}
          />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 pt-4">
            <Button variant="outline" onClick={handleReset} className="sm:flex-1">
              Επαναφορά
            </Button>
            <Button onClick={handleSubmit} className="sm:flex-1">
              Αναζήτηση
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RegionSearchDialog;
