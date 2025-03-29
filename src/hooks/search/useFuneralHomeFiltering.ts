
import { useState, useEffect } from "react";
import { FuneralHome, ServicePackage } from "@/types/funeralHome";

export const useFuneralHomeFiltering = (funeralHomes: FuneralHome[]) => {
  const [filteredHomes, setFilteredHomes] = useState<FuneralHome[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Update filtered homes when selection changes
  useEffect(() => {
    let filtered = [...funeralHomes];
    
    // Filter by services if any are selected
    if (selectedServices.length > 0) {
      filtered = filtered.filter(home => 
        selectedServices.every(service => 
          home.services.some(homeService => 
            homeService.toLowerCase().includes(service.toLowerCase())
          ) || 
          // Also check services in packages
          (home.packages && home.packages.some(pkg => 
            pkg.includedServices.some(includedService => 
              includedService.toLowerCase().includes(service.toLowerCase())
            )
          ))
        )
      );
    }
    
    // Filter by regions if any are selected
    if (selectedRegions.length > 0) {
      filtered = filtered.filter(home => 
        home.regions && selectedRegions.some(region => 
          home.regions?.some(homeRegion => 
            homeRegion.toLowerCase().includes(region.toLowerCase())
          )
        )
      );
    }
    
    setFilteredHomes(filtered);
  }, [selectedServices, selectedRegions, funeralHomes]);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const toggleServiceSelection = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const toggleRegionSelection = (region: string) => {
    setSelectedRegions(prev => 
      prev.includes(region)
        ? prev.filter(r => r !== region)
        : [...prev, region]
    );
  };

  const clearFilters = () => {
    setSelectedServices([]);
    setSelectedRegions([]);
  };

  const getDisplayPrice = (home: FuneralHome) => {
    if (home.packages && home.packages.length > 0) {
      return home.packages[0].price;
    }
    return home.basicPrice;
  };

  const getSortedHomes = () => {
    // For home-based sorting (not package-based)
    return [...filteredHomes].sort((a, b) => {
      const priceA = getDisplayPrice(a);
      const priceB = getDisplayPrice(b);
      return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
    });
  };

  return {
    filteredHomes,
    sortedHomes: getSortedHomes(),
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
