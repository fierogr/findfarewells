
import { useEffect } from "react";
import { useFuneralHomeFetch } from "./search/useFuneralHomeFetch";
import { useFuneralHomeFiltering } from "./search/useFuneralHomeFiltering";

export const useSearchResults = (initialLocation: string) => {
  const { funeralHomes, loading, fetchFuneralHomes } = useFuneralHomeFetch();
  
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
  } = useFuneralHomeFiltering(funeralHomes);

  // Initial fetch on component mount
  useEffect(() => {
    if (initialLocation) {
      fetchFuneralHomes(initialLocation);
    }
  }, [initialLocation, fetchFuneralHomes]);

  return {
    funeralHomes,
    filteredHomes,
    sortedHomes,
    loading,
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
