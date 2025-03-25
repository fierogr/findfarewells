
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { getFuneralHomes } from "@/services/funeralHomeService";
import { FuneralHome } from "@/types/funeralHome";

export const useSearchResults = (initialLocation: string) => {
  const [funeralHomes, setFuneralHomes] = useState<FuneralHome[]>([]);
  const [filteredHomes, setFilteredHomes] = useState<FuneralHome[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (initialLocation) {
      fetchFuneralHomes(initialLocation);
    } else {
      setLoading(false);
      toast({
        title: "Απαιτείται Τοποθεσία",
        description: "Παρακαλώ εισάγετε μια τοποθεσία για αναζήτηση γραφείων τελετών.",
        variant: "destructive",
      });
    }
  }, [initialLocation]);

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

  const fetchFuneralHomes = async (searchLocation: string) => {
    setLoading(true);
    try {
      // Get all funeral homes first
      const homes = await getFuneralHomes();
      
      // Filter homes based on the specified location
      const filteredByRegion = filterHomesByRegion(homes, searchLocation);
      
      setFuneralHomes(filteredByRegion);
      setFilteredHomes(filteredByRegion);
    } catch (error) {
      console.error("Error fetching funeral homes:", error);
      toast({
        title: "Σφάλμα",
        description: "Αποτυχία φόρτωσης γραφείων τελετών. Παρακαλώ δοκιμάστε ξανά.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Helper function to filter homes by region based on search location
  const filterHomesByRegion = (homes: FuneralHome[], searchLocation: string): FuneralHome[] => {
    // Normalize the search location (remove case sensitivity, accents, etc.)
    const normalizedLocation = searchLocation.toLowerCase().trim();
    
    // Map of possible region keywords to the full region names
    const regionKeywords: Record<string, string> = {
      'θεσσαλονικη': 'Νομός Θεσσαλονίκης',
      'θεσσαλονίκη': 'Νομός Θεσσαλονίκης',
      'σερρες': 'Νομός Σερρών',
      'σέρρες': 'Νομός Σερρών',
      'κιλκις': 'Νομός Κιλκίς',
      'κιλκίς': 'Νομός Κιλκίς',
      'πελλα': 'Νομός Πέλλας',
      'πέλλα': 'Νομός Πέλλας',
      'ημαθια': 'Νομός Ημαθίας',
      'ημαθία': 'Νομός Ημαθίας',
      'χαλκιδικη': 'Νομός Χαλκιδικής',
      'χαλκιδική': 'Νομός Χαλκιδικής'
    };
    
    // Try to match the search location to a region
    let matchedRegion = '';
    for (const [keyword, region] of Object.entries(regionKeywords)) {
      if (normalizedLocation.includes(keyword)) {
        matchedRegion = region;
        break;
      }
    }
    
    // If we found a matching region, filter homes by that region
    if (matchedRegion) {
      return homes.filter(home => 
        home.regions?.includes(matchedRegion) || 
        // Also check if the home's state field matches the region
        home.state.toLowerCase().includes(matchedRegion.toLowerCase())
      );
    }
    
    // If no specific region is found, try to match by city or general location
    return homes.filter(home => 
      home.city.toLowerCase().includes(normalizedLocation) || 
      home.state.toLowerCase().includes(normalizedLocation) || 
      home.address.toLowerCase().includes(normalizedLocation) ||
      (home.regions && home.regions.some(region => 
        region.toLowerCase().includes(normalizedLocation)
      ))
    );
  };

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
    funeralHomes,
    filteredHomes,
    sortedHomes: getSortedHomes(),
    loading,
    sortOrder,
    selectedServices,
    isFilterOpen,
    setIsFilterOpen,
    fetchFuneralHomes,
    toggleSortOrder,
    toggleServiceSelection,
    clearFilters
  };
};
