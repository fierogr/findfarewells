
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import FuneralHomeCard from "@/components/search/FuneralHomeCard";
import LoadingState from "@/components/search/LoadingState";
import EmptyResults from "@/components/search/EmptyResults";
import FilterSheet from "@/components/search/FilterSheet";
import SortButton from "@/components/search/SortButton";
import RegionSearchDialog from "@/components/search/RegionSearchDialog";
import { useFuneralHomeFetch } from "@/hooks/search/useFuneralHomeFetch";
import { useFuneralHomeFiltering } from "@/hooks/search/useFuneralHomeFiltering";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const searchLocation = searchParams.get("location") || "";
  const searchPrefecture = searchParams.get("prefecture") || null;
  const searchServices = searchParams.get("services") ? searchParams.get("services")!.split(',') : [];
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const { funeralHomes, loading, error, fetchFuneralHomes } = useFuneralHomeFetch();
  const {
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

  useEffect(() => {
    console.log("Search parameters changed:", {
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
  }, [fetchFuneralHomes, searchLocation, searchPrefecture, searchServices, toggleServiceSelection, clearFilters]);

  const handleClearFilters = () => {
    clearFilters();
    // Reset URL parameters
    navigate('/search');
    // Fetch all funeral homes without filters
    fetchFuneralHomes();
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Αποτελέσματα Αναζήτησης</h1>
      
      <div className="flex items-center justify-between flex-wrap gap-2 md:gap-0 mb-4">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => setIsSearchOpen(true)}
          >
            <Filter className="h-4 w-4" />
            Νέα Αναζήτηση
          </Button>
          
          <SortButton 
            sortOrder={sortOrder}
            onClick={toggleSortOrder}
          />
        </div>
      </div>
      
      {/* Display selected search parameters */}
      <div className="mb-6">
        {searchPrefecture && (
          <div className="inline-flex items-center bg-secondary rounded-full px-3 py-1 text-sm mr-2 mb-2">
            <span className="text-foreground">Νομός: {searchPrefecture}</span>
          </div>
        )}
        
        {searchServices.length > 0 && (
          <div className="inline-flex items-center bg-secondary rounded-full px-3 py-1 text-sm mr-2 mb-2">
            <span className="text-foreground">
              Υπηρεσίες: {searchServices.slice(0, 2).join(', ')}
              {searchServices.length > 2 ? ` +${searchServices.length - 2} ακόμη` : ''}
            </span>
          </div>
        )}
        
        {(searchPrefecture || searchServices.length > 0) && (
          <div className="mt-1 text-xs text-muted-foreground">
            Βρέθηκαν {sortedHomes.length} γραφεία τελετών με βάση τα κριτήρια αναζήτησης
          </div>
        )}
      </div>

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
      />

      {/* Search results */}
      {loading ? (
        <LoadingState />
      ) : error ? (
        <div className="text-center py-10">
          <p className="text-destructive">{error}</p>
        </div>
      ) : sortedHomes.length === 0 ? (
        <EmptyResults 
          onClearFilters={handleClearFilters}
          location={searchLocation || searchPrefecture || undefined}
        />
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {sortedHomes.map((home) => (
            <FuneralHomeCard 
              key={home.id} 
              home={home}
              selectedServices={selectedServices}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
