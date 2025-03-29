
import { useEffect, useCallback, useState } from "react";
import { useFuneralHomeFetch } from "./search/useFuneralHomeFetch";
import { useFuneralHomeFiltering } from "./search/useFuneralHomeFiltering";
import { filterHomesByPrefecture } from "@/utils/searchUtils";
import { toast } from "@/components/ui/use-toast";

export const useSearchResults = (initialLocation: string, prefecture: string | null = null) => {
  const { funeralHomes, loading, error, fetchFuneralHomes: originalFetchFuneralHomes } = useFuneralHomeFetch();
  const [isSearching, setIsSearching] = useState(false);
  
  // Wrap the original fetch function to include prefecture filtering and loading state
  const fetchFuneralHomes = useCallback(
    async (location: string, prefecture: string | null = null, services: string[] = []) => {
      setIsSearching(true);
      console.log(`Fetching funeral homes for location: "${location}", prefecture: "${prefecture}"`);
      
      try {
        // First get all funeral homes for the location
        await originalFetchFuneralHomes(location, prefecture, services);
      } catch (error) {
        console.error("Error in search:", error);
        toast({
          title: "Σφάλμα Αναζήτησης",
          description: "Προέκυψε ένα σφάλμα κατά την αναζήτηση. Παρακαλώ δοκιμάστε ξανά.",
          variant: "destructive",
        });
      } finally {
        // Delay slightly to ensure UI has time to update
        setTimeout(() => {
          setIsSearching(false);
        }, 300);
      }
    },
    [originalFetchFuneralHomes]
  );
  
  // Apply prefecture filter to funeral homes
  const prefectureFilteredHomes = prefecture 
    ? filterHomesByPrefecture(funeralHomes, prefecture) 
    : funeralHomes;
  
  const {
    filteredHomes,
    sortedHomes,
    sortOrder,
    selectedServices,
    selectedRegions,
    isFilterOpen,
    setIsFilterOpen,
    toggleSortOrder,
    toggleServiceSelection,
    toggleRegionSelection,
    clearFilters
  } = useFuneralHomeFiltering(prefectureFilteredHomes);

  // Initial fetch on component mount or location/prefecture change
  useEffect(() => {
    if (initialLocation) {
      fetchFuneralHomes(initialLocation, prefecture);
    }
  }, [initialLocation, prefecture, fetchFuneralHomes]);

  return {
    funeralHomes: prefectureFilteredHomes,
    filteredHomes,
    sortedHomes,
    loading: loading || isSearching,
    error,
    sortOrder,
    selectedServices,
    selectedRegions,
    isFilterOpen,
    setIsFilterOpen,
    fetchFuneralHomes,
    toggleSortOrder,
    toggleServiceSelection,
    toggleRegionSelection,
    clearFilters
  };
};
