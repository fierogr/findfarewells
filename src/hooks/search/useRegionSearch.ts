
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { REGIONS_AND_PREFECTURES } from "@/constants/geographicData";
import { useNavigate } from "react-router-dom";

export const useRegionSearch = () => {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedPrefecture, setSelectedPrefecture] = useState<string>("");
  const [availablePrefectures, setAvailablePrefectures] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Update available prefectures when region changes
  useEffect(() => {
    if (selectedRegion) {
      const prefectures = REGIONS_AND_PREFECTURES[selectedRegion];
      setAvailablePrefectures(prefectures ? [...prefectures] : []);
      setSelectedPrefecture(""); // Reset prefecture when region changes
    } else {
      setAvailablePrefectures([]);
    }
  }, [selectedRegion]);

  const handleServiceToggle = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  // This function is maintained for compatibility but will just log the attempt
  const saveSearchRequest = async () => {
    try {
      setIsSaving(true);
      
      console.log("Would save search request with data:", {
        location: selectedRegion || null,
        prefecture: selectedPrefecture || null,
        services: selectedServices.length > 0 ? selectedServices : null,
        phone_number: phoneNumber || ""
      });
      
      // We're not actually saving to the database due to RLS issues
      console.log("Database save skipped - would normally save search request");
      return true;
    } catch (error) {
      console.error('Error in saveSearchRequest:', error);
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const handleSearch = async () => {
    if (!selectedRegion && !selectedPrefecture) {
      toast({
        title: "Απαιτούνται πεδία",
        description: "Παρακαλώ επιλέξτε περιοχή και νομό για να συνεχίσετε.",
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
    
    // Log the attempt but don't wait for it to complete
    saveSearchRequest();
    
    console.log("Search params:", {
      region: selectedRegion,
      prefecture: selectedPrefecture,
      services: selectedServices
    });

    // Construct the search URL with parameters
    const params = new URLSearchParams();
    
    if (selectedRegion) {
      params.set('region', selectedRegion);
    }
    
    if (selectedPrefecture) {
      params.set('prefecture', selectedPrefecture);
    }
    
    if (selectedServices.length > 0) {
      params.set('services', selectedServices.join(','));
    }
    
    const searchUrl = `/search${params.toString() ? `?${params.toString()}` : ''}`;
    
    navigate(searchUrl);
  };

  const handleReset = () => {
    setSelectedRegion("");
    setSelectedPrefecture("");
    setSelectedServices([]);
    setPhoneNumber("");
  };

  return {
    selectedRegion,
    selectedPrefecture,
    selectedServices,
    availablePrefectures,
    phoneNumber,
    isSaving,
    setSelectedRegion,
    setSelectedPrefecture,
    setSelectedServices,
    setPhoneNumber,
    handleServiceToggle,
    handleSearch,
    handleReset,
    saveSearchRequest
  };
};
