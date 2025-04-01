
import { useState, useEffect, useMemo } from "react";
import { FuneralHome, ServicePackage } from "@/types/funeralHome";

export const useFuneralHomeFiltering = (funeralHomes: FuneralHome[]) => {
  const [filteredHomes, setFilteredHomes] = useState<FuneralHome[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Helper function to check if a home offers a specific service
  const homeHasService = (home: FuneralHome, service: string): boolean => {
    // Check in regular services array
    if (Array.isArray(home.services) && home.services.some(s => 
      s.toLowerCase().includes(service.toLowerCase())
    )) {
      return true;
    }
    
    // Check in packages
    if (Array.isArray(home.packages)) {
      for (const pkg of home.packages) {
        if (Array.isArray(pkg.includedServices) && pkg.includedServices.some(s => 
          s.toLowerCase().includes(service.toLowerCase())
        )) {
          return true;
        }
      }
    }
    
    return false;
  };

  // Helper function to check if a home serves a specific region
  const homeServesRegion = (home: FuneralHome, region: string): boolean => {
    if (!Array.isArray(home.regions) || home.regions.length === 0) {
      return false;
    }
    
    return home.regions.some(r => 
      r.toLowerCase().includes(region.toLowerCase()) || 
      region.toLowerCase().includes(r.toLowerCase())
    );
  };

  // Update filtered homes when selection changes - optimized version
  useEffect(() => {
    // Start with all homes
    let result = [...funeralHomes];
    
    // Performance optimization: Only filter if we have selections
    if (selectedServices.length > 0 || selectedRegions.length > 0) {
      // Filter by services if any are selected
      if (selectedServices.length > 0) {
        result = result.filter(home => 
          selectedServices.every(service => homeHasService(home, service))
        );
      }
      
      // Filter by regions if any are selected
      if (selectedRegions.length > 0) {
        result = result.filter(home => 
          selectedRegions.some(region => homeServesRegion(home, region))
        );
      }
    }
    
    setFilteredHomes(result);
    
    // Log for debugging
    console.log(`Filtered ${funeralHomes.length} homes to ${result.length} based on ${selectedServices.length} services and ${selectedRegions.length} regions`);
  }, [selectedServices, selectedRegions, funeralHomes]);

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === "asc" ? "desc" : "asc");
  };

  const toggleServiceSelection = (service: string) => {
    setSelectedServices(prev => {
      if (prev.includes(service)) {
        return prev.filter(s => s !== service);
      } else {
        return [...prev, service];
      }
    });
  };

  const toggleRegionSelection = (region: string) => {
    setSelectedRegions(prev => {
      if (prev.includes(region)) {
        return prev.filter(r => r !== region);
      } else {
        return [...prev, region];
      }
    });
  };

  const clearFilters = () => {
    setSelectedServices([]);
    setSelectedRegions([]);
  };

  // Get the lowest price from a funeral home (either from packages or basic price)
  const getLowestPrice = (home: FuneralHome): number => {
    if (!home.packages || home.packages.length === 0) {
      return home.basicPrice || 0;
    }
    
    // Get the minimum price from all packages
    const packagePrices = home.packages.map(pkg => pkg.price).filter(price => typeof price === 'number');
    
    if (packagePrices.length === 0) {
      return home.basicPrice || 0;
    }
    
    const minPackagePrice = Math.min(...packagePrices);
    
    // If basic price is not set, return the minimum package price
    if (typeof home.basicPrice !== 'number' || home.basicPrice === 0) {
      return minPackagePrice;
    }
    
    // Return the lower of basic price or minimum package price
    return Math.min(home.basicPrice, minPackagePrice);
  };

  // Sort homes by price - memoized to avoid unnecessary recalculations
  const sortedHomes = useMemo(() => {
    return [...filteredHomes].sort((a, b) => {
      const priceA = getLowestPrice(a);
      const priceB = getLowestPrice(b);
      
      if (sortOrder === "asc") {
        return priceA - priceB;
      } else {
        return priceB - priceA;
      }
    });
  }, [filteredHomes, sortOrder]);

  return {
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
  };
};
