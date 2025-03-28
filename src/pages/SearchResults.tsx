
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchResults } from "@/hooks/useSearchResults";
import { useIsMobile } from "@/hooks/use-mobile";
import SearchForm from "@/components/search/SearchForm";
import FilterSidebar from "@/components/search/FilterSidebar";
import FilterSheet from "@/components/search/FilterSheet";
import SortButton from "@/components/search/SortButton";
import LoadingState from "@/components/search/LoadingState";
import EmptyResults from "@/components/search/EmptyResults";
import FuneralHomeCard from "@/components/search/FuneralHomeCard";
import SelectedFiltersDisplay from "@/components/search/SelectedFiltersDisplay";
import { MapPin } from "lucide-react";

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = searchParams.get("location") || "";
  const [newLocation, setNewLocation] = useState(location);
  const isMobile = useIsMobile();
  
  const {
    funeralHomes,
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
  } = useSearchResults(location);

  // Re-fetch when location changes
  useEffect(() => {
    if (location) {
      setNewLocation(location);
      fetchFuneralHomes(location);
    }
  }, [location, fetchFuneralHomes]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (newLocation.trim()) {
      setSearchParams({ location: newLocation });
    }
  };

  const handleRetry = () => {
    if (location) {
      fetchFuneralHomes(location);
    }
  };

  // Calculate total active filters
  const totalActiveFilters = selectedServices.length + selectedRegions.length;

  return (
    <div className="container py-8 md:py-12 bg-[#f0f2f6]">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 animate-fadeIn font-roboto text-[#1A3674]">
          Διάλεξε το πακέτο που σου ταιριάζει στη καλύτερη τιμή της αγοράς
        </h1>
        
        <div className="mb-6 text-sm text-muted-foreground flex items-center">
          <MapPin className="h-4 w-4 mr-1" />
          <span>Βρέθηκαν 16 προσφορές για Βασικό πακέτο 12μηνης διάρκειας</span>
        </div>
        
        <SearchForm 
          location={newLocation}
          onLocationChange={setNewLocation}
          onSubmit={handleSearch}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filter Sidebar - Hidden on mobile, shown on desktop */}
        <div className="hidden md:block w-72 shrink-0">
          <FilterSidebar
            selectedServices={selectedServices}
            selectedRegions={selectedRegions}
            onServiceToggle={toggleServiceSelection}
            onRegionToggle={toggleRegionSelection}
            onClearFilters={clearFilters}
          />
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-center mb-4 animate-fadeIn delay-200">
            <div className="flex items-center gap-2">
              <p className="text-muted-foreground font-roboto">
                {loading 
                  ? "Αναζήτηση..." 
                  : `${filteredHomes.length} γραφεία τελετών εντός 50χλμ`}
              </p>
              <SelectedFiltersDisplay 
                selectedFiltersCount={totalActiveFilters}
                onClearFilters={clearFilters}
              />
            </div>

            <div className="flex gap-2">
              {/* Only show sheet on mobile */}
              {isMobile && (
                <FilterSheet 
                  selectedServices={selectedServices}
                  selectedRegions={selectedRegions}
                  onServiceToggle={toggleServiceSelection}
                  onRegionToggle={toggleRegionSelection}
                  onClearFilters={clearFilters}
                  isOpen={isFilterOpen}
                  onOpenChange={setIsFilterOpen}
                />
              )}

              <SortButton 
                sortOrder={sortOrder}
                onToggle={toggleSortOrder}
              />
            </div>
          </div>
          
          {loading ? (
            <LoadingState />
          ) : error ? (
            <EmptyResults 
              onClearFilters={clearFilters} 
              location={location}
              onRetry={handleRetry}
            />
          ) : filteredHomes.length === 0 ? (
            <EmptyResults 
              onClearFilters={clearFilters}
              location={location}
              onRetry={handleRetry}
            />
          ) : (
            <div className="space-y-6 animate-fadeIn delay-300">
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
      </div>
    </div>
  );
};

export default SearchResults;
