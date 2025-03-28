
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
import { findPrefectureForLocation, filterHomesByPrefecture } from "@/utils/searchUtils";
import { toast } from "@/components/ui/use-toast";

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = searchParams.get("location") || "";
  const prefectureParam = searchParams.get("prefecture");
  const [newLocation, setNewLocation] = useState(location);
  const [prefecture, setPrefecture] = useState<string | null>(prefectureParam);
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
  } = useSearchResults(location, prefecture);

  // Determine prefecture if not provided and re-fetch when location changes
  useEffect(() => {
    const getPrefectureAndFetch = async () => {
      if (location) {
        setNewLocation(location);
        
        // If prefecture is not provided in URL params, try to find it
        if (!prefectureParam) {
          try {
            const foundPrefecture = await findPrefectureForLocation(location);
            setPrefecture(foundPrefecture);
            
            if (foundPrefecture) {
              console.log(`Found prefecture: ${foundPrefecture} for location: ${location}`);
              
              // Update URL with the found prefecture
              setSearchParams(prev => {
                const newParams = new URLSearchParams(prev);
                newParams.set("prefecture", foundPrefecture);
                return newParams;
              });
              
              toast({
                title: "Βρέθηκε νομός",
                description: `Η περιοχή "${location}" ανήκει στον ${foundPrefecture}`,
                variant: "default"
              });
            }
          } catch (error) {
            console.error("Error finding prefecture:", error);
          }
        } else {
          setPrefecture(prefectureParam);
        }
        
        // Fetch funeral homes with the determined prefecture
        fetchFuneralHomes(location, prefecture || prefectureParam);
      }
    };
    
    getPrefectureAndFetch();
  }, [location, prefectureParam, fetchFuneralHomes, setSearchParams]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newLocation.trim()) {
      // First try to find the prefecture
      const foundPrefecture = await findPrefectureForLocation(newLocation);
      
      // Update search params with location and prefecture if found
      const params: Record<string, string> = { location: newLocation };
      if (foundPrefecture) {
        params.prefecture = foundPrefecture;
      }
      
      setSearchParams(params);
    }
  };

  const handleRetry = () => {
    if (location) {
      fetchFuneralHomes(location, prefecture);
    }
  };

  // Calculate total active filters
  const totalActiveFilters = selectedServices.length + selectedRegions.length;

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold mb-6 animate-fadeIn">
          Γραφεία Τελετών στην περιοχή {location}
          {prefecture && (
            <span className="block text-lg font-medium text-muted-foreground mt-2">
              {prefecture}
            </span>
          )}
        </h1>
        
        <div className="mb-6 text-sm text-muted-foreground flex items-center">
          <MapPin className="h-4 w-4 mr-1" />
          <span>
            {prefecture 
              ? `Εμφανίζονται αποτελέσματα γραφείων που εξυπηρετούν τον ${prefecture}` 
              : "Εμφανίζονται μόνο αποτελέσματα σε ακτίνα έως 50χλμ από την αναζήτησή σας"}
          </span>
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
            selectedRegions={selectedRegions}
            onServiceToggle={toggleServiceSelection}
            onRegionToggle={toggleRegionSelection}
            onClearFilters={clearFilters}
          />
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-center mb-4 animate-fadeIn delay-200">
            <div className="flex items-center gap-2">
              <p className="text-muted-foreground">
                {loading 
                  ? "Αναζήτηση..." 
                  : prefecture
                    ? `${filteredHomes.length} γραφεία τελετών στον ${prefecture}`
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
