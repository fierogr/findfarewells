
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
import { useSearchResults } from "@/hooks/useSearchResults";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const searchLocation = searchParams.get("location") || "";
  const searchPrefecture = searchParams.get("prefecture") || null;
  const searchServices = searchParams.get("services") ? searchParams.get("services")!.split(',') : [];
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [initialSearchDone, setInitialSearchDone] = useState(false);

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

  // Initial fetch on component mount
  useEffect(() => {
    if (!initialSearchDone) {
      console.log("Initial search with parameters:", {
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
      
      setInitialSearchDone(true);
    }
  }, [searchLocation, searchPrefecture, fetchFuneralHomes, clearFilters, toggleServiceSelection, searchServices, initialSearchDone]);

  // Re-run search when the URL parameters change
  useEffect(() => {
    // Only run this effect if the initial search has already been done
    // and when actual URL parameters change
    if (initialSearchDone) {
      console.log("URL parameters changed, running new search");
      fetchFuneralHomes(searchLocation, searchPrefecture, searchServices);
      
      // Update selected services
      clearFilters();
      searchServices.forEach(service => {
        toggleServiceSelection(service);
      });
    }
  }, [location.search, initialSearchDone]);

  const handleClearFilters = () => {
    clearFilters();
    // Reset URL parameters
    navigate('/search');
    // Fetch all funeral homes without filters
    fetchFuneralHomes(searchLocation);
  };

  const handleNewSearch = (formData: { location: string; prefecture: string | null; services: string[] }) => {
    // Construct URL parameters
    const params = new URLSearchParams();
    
    if (formData.location) {
      params.set("location", formData.location);
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
    
    // Fetch funeral homes with new parameters
    fetchFuneralHomes(
      formData.location, 
      formData.prefecture, 
      formData.services
    );
  };

  const renderContent = () => {
    if (loading) {
      return <LoadingState />;
    }
    
    if (error) {
      return (
        <div className="text-center py-10">
          <p className="text-destructive">{error}</p>
        </div>
      );
    }
    
    if (sortedHomes.length === 0) {
      return (
        <EmptyResults 
          onClearFilters={handleClearFilters}
          location={searchLocation || searchPrefecture || undefined}
        />
      );
    }
    
    return (
      <div className="grid grid-cols-1 gap-6">
        {sortedHomes.map((home) => (
          <FuneralHomeCard 
            key={home.id} 
            home={home}
            selectedServices={selectedServices}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Αποτελέσματα Αναζήτησης</h1>
      
      <div className="flex items-center justify-between flex-wrap gap-2 md:gap-0 mb-4">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => setIsSearchOpen(true)}
            disabled={loading}
          >
            <Filter className="h-4 w-4" />
            Νέα Αναζήτηση
          </Button>
          
          <SortButton 
            sortOrder={sortOrder}
            onClick={toggleSortOrder}
            disabled={loading || sortedHomes.length <= 1}
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
        
        {(searchPrefecture || searchServices.length > 0) && !loading && (
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
        onSearch={handleNewSearch}
        initialLocation={searchLocation}
        initialPrefecture={searchPrefecture}
        initialServices={searchServices}
        isLoading={loading}
      />

      {/* Search results */}
      {renderContent()}
    </div>
  );
};

export default SearchResults;
