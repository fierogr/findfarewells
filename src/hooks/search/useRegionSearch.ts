
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { REGIONS_AND_PREFECTURES } from "@/constants/geographicData";

export const useRegionSearch = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedPrefecture, setSelectedPrefecture] = useState<string>("");
  const [availablePrefectures, setAvailablePrefectures] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  // Update available prefectures when region changes
  useEffect(() => {
    if (selectedRegion) {
      setAvailablePrefectures(REGIONS_AND_PREFECTURES[selectedRegion] || []);
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

  const handleSearch = () => {
    if (!selectedRegion || !selectedPrefecture) {
      toast({
        title: "Απαιτούνται πεδία",
        description: "Παρακαλώ επιλέξτε περιοχή και νομό για να συνεχίσετε.",
        variant: "destructive",
      });
      return;
    }

    console.log("Search params:", {
      region: selectedRegion,
      prefecture: selectedPrefecture,
      services: selectedServices
    });
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
    setSelectedRegion,
    setSelectedPrefecture,
    setSelectedServices,
    setPhoneNumber,
    handleServiceToggle,
    handleSearch,
    handleReset
  };
};
