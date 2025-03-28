
import { useEffect, useCallback } from "react";
import { useFuneralHomeFetch } from "./search/useFuneralHomeFetch";
import { useFuneralHomeFiltering } from "./search/useFuneralHomeFiltering";
import { filterHomesByPrefecture } from "@/utils/searchUtils";

export const useSearchResults = (initialLocation: string, prefecture: string | null = null) => {
  const { funeralHomes, loading, error, fetchFuneralHomes: originalFetchFuneralHomes } = useFuneralHomeFetch();
  
  // Wrap the original fetch function to include prefecture filtering
  const fetchFuneralHomes = useCallback(
    async (location: string, prefecture: string | null = null) => {
      console.log(`Fetching funeral homes for location: "${location}", prefecture: "${prefecture}"`);
      
      // First get all funeral homes for the location
      await originalFetchFuneralHomes(location, prefecture);
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
