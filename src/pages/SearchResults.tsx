
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchResults } from "@/hooks/useSearchResults";
import { useIsMobile } from "@/hooks/use-mobile";
import SearchForm from "@/components/search/SearchForm";
import FilterSidebar from "@/components/search/FilterSidebar";
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
    sortOrder,
    selectedServices,
    isFilterOpen,
    setIsFilterOpen,
    toggleSortOrder,
    toggleServiceSelection,
    clearFilters
  } = useSearchResults(location);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (newLocation.trim()) {
      setSearchParams({ location: newLocation });
    }
  };

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold mb-6 animate-fadeIn">
          Γραφεία Τελετών στην περιοχή {location}
        </h1>
        
        <div className="mb-6 text-sm text-muted-foreground flex items-center">
          <MapPin className="h-4 w-4 mr-1" />
          <span>Εμφανίζονται μόνο αποτελέσματα σε ακτίνα έως 50χλμ από την αναζήτησή σας</span>
        </div>
        
        <SearchForm 
          location={newLocation}
          onLocationChange={setNewLocation}
          onSubmit={handleSearch}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filter Sidebar - Hidden on mobile, shown on desktop */}
        <div className="hidden md:block w-64 shrink-0">
          <FilterSidebar
            selectedServices={selectedServices}
            onServiceToggle={toggleServiceSelection}
            onClearFilters={clearFilters}
          />
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-center mb-4 animate-fadeIn delay-200">
            <div className="flex items-center gap-2">
              <p className="text-muted-foreground">
                {loading 
                  ? "Αναζήτηση..." 
                  : `${filteredHomes.length} γραφεία τελετών εντός 50χλμ`}
              </p>
              <SelectedFiltersDisplay 
                selectedFiltersCount={selectedServices.length}
                onClearFilters={clearFilters}
              />
            </div>

            <div className="flex gap-2">
              {/* Only show sheet on mobile */}
              {isMobile && (
                <FilterSheet 
                  selectedServices={selectedServices}
                  onServiceToggle={toggleServiceSelection}
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
          ) : filteredHomes.length === 0 ? (
            <EmptyResults onClearFilters={clearFilters} />
          ) : (
            <div className="grid grid-cols-1 gap-6 animate-fadeIn delay-300">
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
