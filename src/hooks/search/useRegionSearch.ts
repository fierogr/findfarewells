
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { REGIONS_AND_PREFECTURES } from "@/constants/geographicData";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export const useRegionSearch = () => {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedPrefecture, setSelectedPrefecture] = useState<string>("");
  const [availablePrefectures, setAvailablePrefectures] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Attempt to load phone number from session storage on initial mount
  useEffect(() => {
    const savedPhone = sessionStorage.getItem('searchPhoneNumber');
    if (savedPhone) {
      setPhoneNumber(savedPhone);
    }
  }, []);

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

  // This function actually saves to the database now
  const saveSearchRequest = async () => {
    try {
      setIsSaving(true);
      
      console.log("Saving search request with data:", {
        location: selectedRegion || null,
        prefecture: selectedPrefecture || null,
        services: selectedServices.length > 0 ? selectedServices : null,
        phone_number: phoneNumber || ""
      });
      
      // Always save phone number to sessionStorage for later use
      if (phoneNumber) {
        sessionStorage.setItem('searchPhoneNumber', phoneNumber);
      }
      
      const { data, error } = await supabase
        .from('search_requests')
        .insert({
          location: selectedRegion || null,
          prefecture: selectedPrefecture || null,
          services: selectedServices.length > 0 ? selectedServices : null,
          phone_number: phoneNumber || ""
        });
      
      if (error) {
        console.error('Error saving search request:', error);
        return false;
      }
      
      console.log("Search request saved successfully:", data);
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
    
    // Save the search request and wait for it to complete
    const saved = await saveSearchRequest();
    
    if (!saved) {
      toast({
        title: "Σφάλμα",
        description: "Παρουσιάστηκε πρόβλημα κατά την αποθήκευση του αιτήματος. Παρακαλώ προσπαθήστε ξανά.",
        variant: "destructive",
      });
    }
    
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
    // Don't reset phone number to improve user experience
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
