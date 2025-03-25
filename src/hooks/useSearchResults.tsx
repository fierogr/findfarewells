
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
      console.log("Fetched homes:", homes);
      
      // Filter homes based on the specified location
      const filteredByRegion = filterHomesByRegion(homes, searchLocation);
      console.log("Filtered by region:", filteredByRegion);
      
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

  // Enhanced function to filter homes by region based on search location
  const filterHomesByRegion = (homes: FuneralHome[], searchLocation: string): FuneralHome[] => {
    // Normalize the search location (remove case sensitivity, accents, etc.)
    const normalizedLocation = searchLocation.toLowerCase().trim();
    console.log("Searching for location:", normalizedLocation);
    
    // Map of possible region keywords to the full region names
    const regionKeywords: Record<string, string[]> = {
      'θεσσαλονικη': ['Νομός Θεσσαλονίκης', 'θεσσαλονίκη', 'θεσσαλονικη'],
      'θεσσαλονίκη': ['Νομός Θεσσαλονίκης', 'θεσσαλονίκη', 'θεσσαλονικη'],
      'σερρες': ['Νομός Σερρών', 'σέρρες', 'σερρες'],
      'σέρρες': ['Νομός Σερρών', 'σέρρες', 'σερρες'],
      'κιλκις': ['Νομός Κιλκίς', 'κιλκίς', 'κιλκις'],
      'κιλκίς': ['Νομός Κιλκίς', 'κιλκίς', 'κιλκις'],
      'πελλα': ['Νομός Πέλλας', 'πέλλα', 'πελλα'],
      'πέλλα': ['Νομός Πέλλας', 'πέλλα', 'πελλα'],
      'ημαθια': ['Νομός Ημαθίας', 'ημαθία', 'ημαθια'],
      'ημαθία': ['Νομός Ημαθίας', 'ημαθία', 'ημαθια'],
      'χαλκιδικη': ['Νομός Χαλκιδικής', 'χαλκιδική', 'χαλκιδικη'],
      'χαλκιδική': ['Νομός Χαλκιδικής', 'χαλκιδική', 'χαλκιδικη']
    };
    
    // Try to match the search location to potential regions
    let matchedRegionVariants: string[] = [];
    
    // Check if the location matches any known region keyword
    for (const [keyword, variants] of Object.entries(regionKeywords)) {
      if (normalizedLocation.includes(keyword)) {
        matchedRegionVariants = variants;
        console.log("Matched region variants:", matchedRegionVariants);
        break;
      }
    }
    
    // If we found matching region variants, filter homes by these variants
    if (matchedRegionVariants.length > 0) {
      return homes.filter(home => {
        // Ensure regions is an array before working with it
        const homeRegions = Array.isArray(home.regions) ? home.regions : [];
        
        // Look for any match between home regions and our region variants
        const regionMatch = homeRegions.some(region => 
          matchedRegionVariants.some(variant => 
            region.toLowerCase().includes(variant.toLowerCase())
          )
        );
        
        // Also check state field as fallback
        const stateMatch = matchedRegionVariants.some(variant => 
          home.state.toLowerCase().includes(variant.toLowerCase())
        );
        
        return regionMatch || stateMatch;
      });
    }
    
    // If no specific region is found, try to match by city or general location as a fallback
    return homes.filter(home => {
      // Ensure regions is an array before working with it
      const homeRegions = Array.isArray(home.regions) ? home.regions : [];
      
      return (
        home.city.toLowerCase().includes(normalizedLocation) || 
        home.state.toLowerCase().includes(normalizedLocation) || 
        home.address.toLowerCase().includes(normalizedLocation) ||
        homeRegions.some(region => 
          region.toLowerCase().includes(normalizedLocation)
        )
      );
    });
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
