
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FilterSheet from "@/components/search/FilterSheet";
import RegionSearchDialog from "@/components/search/RegionSearchDialog";
import { useSearchResults } from "@/hooks/useSearchResults";
import SearchControls from "@/components/search/SearchControls";
import SearchParametersDisplay from "@/components/search/SearchParametersDisplay";
import SearchResultsList from "@/components/search/SearchResultsList";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const searchLocation = searchParams.get("region") || searchParams.get("location") || "";
  const searchPrefecture = searchParams.get("prefecture") || null;
  const searchServices = searchParams.get("services") ? searchParams.get("services")!.split(',') : [];
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const initialSearchDone = useRef(false);

  const {
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
  } = useSearchResults(searchLocation, searchPrefecture);

  // Initial fetch on component mount - only once
  useEffect(() => {
    if (!initialSearchDone.current) {
      console.log("Initial search with parameters:", {
        location: searchLocation,
        prefecture: searchPrefecture,
        services: searchServices
      });
      
      // Initial fetch based on URL parameters
      fetchFuneralHomes(searchLocation, searchPrefecture, searchServices);
      
      // Set initial services from URL to the filter state
      if (searchServices.length > 0) {
        // Reset services to avoid duplicating selections
        clearFilters();
        
        // Then add each service from the URL
        searchServices.forEach(service => {
          toggleServiceSelection(service);
        });
      }
      
      initialSearchDone.current = true;
    }
  }, [searchLocation, searchPrefecture, fetchFuneralHomes, clearFilters, toggleServiceSelection, searchServices]);

  // Re-run search when the URL parameters change (only if initial search is done)
  useEffect(() => {
    const currentParams = new URLSearchParams(location.search);
    const currentLocation = currentParams.get("region") || currentParams.get("location") || "";
    const currentPrefecture = currentParams.get("prefecture") || null;
    const currentServices = currentParams.get("services") ? currentParams.get("services")!.split(',') : [];

    // Only run this effect if the initial search has already been done
    // and when actual URL parameters change
    if (initialSearchDone.current) {
      console.log("URL parameters changed, running new search");
      fetchFuneralHomes(currentLocation, currentPrefecture, currentServices);
      
      // Update selected services
      clearFilters();
      currentServices.forEach(service => {
        toggleServiceSelection(service);
      });
    }
  }, [location.search, clearFilters, fetchFuneralHomes, toggleServiceSelection]);

  const handleClearFilters = () => {
    clearFilters();
    // Reset URL parameters
    navigate('/search');
    // Fetch all funeral homes without filters
    fetchFuneralHomes("", null, []);
  };

  const handleNewSearch = (formData: { location: string; prefecture: string | null; services: string[] }) => {
    // Construct URL parameters
    const params = new URLSearchParams();
    
    if (formData.location) {
      params.set("region", formData.location);
    }
    
    if (formData.prefecture) {
      params.set("prefecture", formData.prefecture);
    }
    
    if (formData.services.length > 0) {
      params.set("services", formData.services.join(','));
    }
    
    // Navigate to search results with new parameters
    navigate(`/search?${params.toString()}`);
    
    // Close the search dialog
    setIsSearchOpen(false);
    
    // Fetch funeral homes with new parameters - this will be triggered by the URL change effect
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Αποτελέσματα Αναζήτησης</h1>
      
      <SearchControls 
        onNewSearchClick={() => setIsSearchOpen(true)}
        onSortOrderToggle={toggleSortOrder}
        sortOrder={sortOrder}
        loading={loading}
        resultsCount={sortedHomes.length}
      />
      
      <SearchParametersDisplay 
        searchPrefecture={searchPrefecture}
        searchServices={searchServices}
        resultsCount={sortedHomes.length}
        loading={loading}
      />

      {/* Filter sheet */}
      <FilterSheet
        selectedServices={selectedServices}
        selectedRegions={selectedRegions}
        onServiceToggle={toggleServiceSelection}
        onRegionToggle={toggleRegionSelection}
        onClearFilters={clearFilters}
        isOpen={isFilterOpen}
        onOpenChange={setIsFilterOpen}
      />
      
      {/* Search dialog */}
      <RegionSearchDialog 
        open={isSearchOpen} 
        onOpenChange={setIsSearchOpen}
        onSearch={handleNewSearch}
        initialLocation={searchLocation}
        initialPrefecture={searchPrefecture}
        initialServices={searchServices}
        isLoading={loading}
      />

      {/* Search results */}
      <SearchResultsList 
        homes={sortedHomes}
        loading={loading}
        error={error}
        selectedServices={selectedServices}
        onClearFilters={handleClearFilters}
        searchLocation={searchLocation}
        searchPrefecture={searchPrefecture}
      />
    </div>
  );
};

export default SearchResults;
