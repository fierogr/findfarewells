import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { getFuneralHomes, calculateDistance } from "@/services/funeralHomeService";
import { isWithinDistance, geocodeLocation } from "@/services/geocodingService";
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
    let retries = 0;
    const maxRetries = 2;

    const attempt = async () => {
      try {
        const homes = await getFuneralHomes();
        console.log("Fetched homes:", homes);
        
        if (!homes || homes.length === 0) {
          throw new Error("No funeral homes returned from service");
        }
        
        const filteredByRegion = await filterHomesByRegion(homes, searchLocation);
        console.log("Filtered by region:", filteredByRegion);
        
        setFuneralHomes(filteredByRegion);
        setFilteredHomes(filteredByRegion);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching funeral homes:", error);
        
        if (retries < maxRetries) {
          retries++;
          console.log(`Retrying fetch attempt ${retries}...`);
          setTimeout(attempt, 1000);
        } else {
          setLoading(false);
          toast({
            title: "Σφάλμα",
            description: "Αποτυχία φόρτωσης γραφείων τελετών. Παρακαλώ δοκιμάστε ξανά.",
            variant: "destructive",
          });
        }
      }
    };

    attempt();
  };

  const filterHomesByRegion = async (homes: FuneralHome[], searchLocation: string): Promise<FuneralHome[]> => {
    const normalizedLocation = searchLocation.toLowerCase().trim();
    console.log("Searching for location:", normalizedLocation);
    
    const regionKeywords: Record<string, string[]> = {
      'θεσσαλονικη': ['Νομός Θεσσαλονίκης', 'θεσσαλονίκη', 'θεσσαλονικη'],
      'σερρες': ['Νομός Σερρών', 'σέρρες', 'σερρες'],
      'κιλκις': ['Νομός Κιλκίς', 'κιλκίς', 'κιλκις'],
      'πελλα': ['Νομός Πέλλας', 'πέλλα', 'πελλα'],
      'ημαθια': ['Νομός Ημαθίας', 'ημαθία', 'ημαθια'],
      'χαλκιδικη': ['Νομός Χαλκιδικής', 'χαλκιδική', 'χαλκιδικη']
    };
    
    let matchedRegionVariants: string[] = [];
    
    for (const [keyword, variants] of Object.entries(regionKeywords)) {
      if (normalizedLocation.includes(keyword)) {
        matchedRegionVariants = variants;
        console.log("Matched region variants:", matchedRegionVariants);
        break;
      }
    }
    
    const exactMatches = homes.filter(home => {
      const homeRegions = Array.isArray(home.regions) ? home.regions : [];
      
      if (matchedRegionVariants.length > 0) {
        const regionMatch = homeRegions.some(region => 
          matchedRegionVariants.some(variant => 
            region.toLowerCase().includes(variant.toLowerCase())
          )
        );
        
        const stateMatch = matchedRegionVariants.some(variant => 
          home.state.toLowerCase().includes(variant.toLowerCase())
        );
        
        return regionMatch || stateMatch;
      }
      
      return (
        home.city.toLowerCase().includes(normalizedLocation) || 
        home.state.toLowerCase().includes(normalizedLocation) || 
        home.address.toLowerCase().includes(normalizedLocation) ||
        homeRegions.some(region => 
          region.toLowerCase().includes(normalizedLocation)
        )
      );
    });
    
    let distanceFilteredExactMatches: FuneralHome[] = [];
    if (exactMatches.length > 0) {
      const searchCoords = await geocodeLocation(searchLocation);
      if (searchCoords) {
        for (const home of exactMatches) {
          const homeRegions = Array.isArray(home.regions) ? home.regions : [];
          if (homeRegions.length === 0) continue;
          
          let isWithin50km = false;
          for (const region of homeRegions) {
            const regionCoords = await geocodeLocation(region);
            if (!regionCoords) continue;
            
            const distance = calculateDistance(
              searchCoords.lat,
              searchCoords.lng,
              regionCoords.lat,
              regionCoords.lng
            );
            
            console.log(`Distance from "${searchLocation}" to "${region}": ${distance.toFixed(2)}km`);
            
            if (distance <= 50) {
              isWithin50km = true;
              break;
            }
          }
          
          if (isWithin50km) {
            distanceFilteredExactMatches.push(home);
          }
        }
        
        return distanceFilteredExactMatches;
      }
    }
    
    const proximityMatches = await Promise.all(
      homes.map(async home => {
        const homeRegions = Array.isArray(home.regions) ? home.regions : [];
        
        if (homeRegions.length === 0) {
          return { home, withinDistance: false };
        }
        
        const withinDistance = await isWithinDistance(searchLocation, homeRegions, 50);
        
        return { home, withinDistance };
      })
    );
    
    return proximityMatches
      .filter(result => result.withinDistance)
      .map(result => result.home);
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
