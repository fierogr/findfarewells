
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchForm from "@/components/search/SearchForm";
import FuneralHomeCard from "@/components/search/FuneralHomeCard";
import LoadingState from "@/components/search/LoadingState";
import EmptyResults from "@/components/search/EmptyResults";
import FilterSheet from "@/components/search/FilterSheet";
import SortButton from "@/components/search/SortButton";
import SelectedFiltersDisplay from "@/components/search/SelectedFiltersDisplay";
import { useFuneralHomeFetch } from "@/hooks/search/useFuneralHomeFetch";
import { useFuneralHomeFiltering } from "@/hooks/search/useFuneralHomeFiltering";
import RegionSearchDialog from "@/components/search/RegionSearchDialog";

const SearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchLocation = searchParams.get("location") || "";
  const searchPrefecture = searchParams.get("prefecture") || null;
  const searchServices = searchParams.get("services") ? searchParams.get("services")!.split(',') : [];
  
  const [localLocation, setLocalLocation] = useState(searchLocation);
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
    // Set initial services from URL
    if (searchServices.length > 0) {
      for (const service of searchServices) {
        toggleServiceSelection(service);
      }
    }
    
    // Initial fetch based on URL parameters
    fetchFuneralHomes(searchLocation, searchPrefecture, searchServices);
  }, [fetchFuneralHomes, searchLocation, searchPrefecture, searchServices]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchFuneralHomes(localLocation, searchPrefecture);
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
        <EmptyResults />
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
