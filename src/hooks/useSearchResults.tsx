
import { useEffect, useCallback, useState, useRef } from "react";
import { useFuneralHomeFetch } from "./search/useFuneralHomeFetch";
import { useFuneralHomeFiltering } from "./search/useFuneralHomeFiltering";
import { filterHomesByPrefecture } from "@/utils/searchUtils";
import { toast } from "@/components/ui/use-toast";

export const useSearchResults = (initialLocation: string, prefecture: string | null = null) => {
  const { funeralHomes, loading: fetchLoading, error, fetchFuneralHomes: originalFetchFuneralHomes } = useFuneralHomeFetch();
  const [isSearching, setIsSearching] = useState(false);
  const [lastSearchParams, setLastSearchParams] = useState<{
    location: string;
    prefecture: string | null;
    services: string[];
  } | null>(null);
  const initialSearchCompleted = useRef(false);
  
  // Wrap the original fetch function to include prefecture filtering and loading state
  const fetchFuneralHomes = useCallback(
    async (location: string, prefecture: string | null = null, services: string[] = []) => {
      // Skip empty searches
      if (!location && !prefecture && (!services || services.length === 0)) {
        if (initialSearchCompleted.current) {
          return;
        }
      }
      
      // Avoid duplicate searches with the same parameters
      const searchParamsString = JSON.stringify({ location, prefecture, services });
      const lastParamsString = lastSearchParams ? JSON.stringify(lastSearchParams) : null;
      
      if (searchParamsString === lastParamsString && lastParamsString !== null) {
        console.log("Skipping duplicate search with same parameters");
        return;
      }
      
      setIsSearching(true);
      console.log(`Fetching funeral homes for location: "${location}", prefecture: "${prefecture}"`);
      
      try {
        // First get all funeral homes for the location
        await originalFetchFuneralHomes(location, prefecture, services);
        // Update last search params to prevent duplicate searches
        setLastSearchParams({ location, prefecture, services });
        initialSearchCompleted.current = true;
      } catch (error) {
        console.error("Error in search:", error);
        toast({
          title: "Σφάλμα Αναζήτησης",
          description: "Προέκυψε ένα σφάλμα κατά την αναζήτηση. Παρακαλώ δοκιμάστε ξανά.",
          variant: "destructive",
        });
      } finally {
        // Ensure loading state finishes even if there's an error
        setTimeout(() => {
          setIsSearching(false);
        }, 800); // Match the progress interval from LoadingState
      }
    },
    [originalFetchFuneralHomes, lastSearchParams]
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

  // Combined loading state
  const loading = fetchLoading || isSearching;

  return {
    funeralHomes: prefectureFilteredHomes,
    filteredHomes,
    sortedHomes,
    loading,
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
