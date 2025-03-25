
import { useState, useEffect } from "react";
import { FuneralHome } from "@/types/funeralHome";

export const useFuneralHomeFiltering = (funeralHomes: FuneralHome[]) => {
  const [filteredHomes, setFilteredHomes] = useState<FuneralHome[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Update filtered homes when selection changes
  useEffect(() => {
    if (selectedServices.length === 0) {
      setFilteredHomes(funeralHomes);
    } else {
      const filtered = funeralHomes.filter(home => 
        selectedServices.every(service => 
          home.services.some(homeService => 
            homeService.toLowerCase().includes(service.toLowerCase())
          )
        )
      );
      setFilteredHomes(filtered);
    }
  }, [selectedServices, funeralHomes]);

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

  const clearFilters = () => {
    setSelectedServices([]);
  };

  const getDisplayPrice = (home: FuneralHome) => {
    if (home.packages && home.packages.length > 0) {
      return home.packages[0].price;
    }
    return home.basicPrice;
  };

  const getSortedHomes = () => {
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
    isFilterOpen,
    setIsFilterOpen,
    toggleSortOrder,
    toggleServiceSelection,
    clearFilters
  };
};
