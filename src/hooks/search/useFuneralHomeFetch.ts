
import { useState, useCallback } from "react";
import { toast } from "@/components/ui/use-toast";
import { getFuneralHomes } from "@/services/funeralHome";
import { FuneralHome } from "@/types/funeralHome";
import { filterHomesByPrefecture } from "@/utils/searchFilters";

export const useFuneralHomeFetch = () => {
  const [funeralHomes, setFuneralHomes] = useState<FuneralHome[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFuneralHomes = useCallback(async (
    searchLocation: string = "", 
    prefecture: string | null = null,
    services: string[] = []
  ) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log(`Fetching funeral homes with: 
        location: "${searchLocation}", 
        prefecture: "${prefecture}",
        services: [${services.join(', ')}]`);
        
      const homes = await getFuneralHomes();
      
      if (!homes || homes.length === 0) {
        console.log("No funeral homes returned from service");
        setFuneralHomes([]);
        return;
      }
      
      console.log(`Retrieved ${homes.length} homes from database`);
      
      // Make sure any home with a null regions field gets an empty array
      const homesWithValidRegions = homes.map(home => ({
        ...home,
        regions: home.regions || [],
        services: home.services || []
      }));
      
      let filteredHomes: FuneralHome[] = homesWithValidRegions;
      
      // 1. Filter by prefecture if provided
      if (prefecture) {
        filteredHomes = filterHomesByPrefecture(filteredHomes, prefecture);
        console.log(`Filtered by prefecture ${prefecture}: ${filteredHomes.length} homes match`);
      }
      
      // 2. If no results with prefecture filtering and we have a location, try location filtering
      if (filteredHomes.length === 0 && searchLocation) {
        console.log(`No results for prefecture ${prefecture}, trying location search with "${searchLocation}"`);
        // For now, just return all homes since we'll implement proper location filtering later
        filteredHomes = homesWithValidRegions;
      }
      
      // 3. Filter by services if any are selected
      if (services.length > 0) {
        filteredHomes = filteredHomes.filter(home => {
          // Handle nullish services array
          const homeServices = home.services || [];
          
          // At least one selected service matches
          return services.some(service => 
            homeServices.some(homeService => 
              homeService.toLowerCase().includes(service.toLowerCase())
            )
          );
        });
        console.log(`Filtered by services: ${filteredHomes.length} homes match selected services`);
      }
      
      setFuneralHomes(filteredHomes);
      
      if (filteredHomes.length === 0) {
        const message = prefecture 
          ? `Δεν βρέθηκαν γραφεία τελετών στον ${prefecture}`
          : (searchLocation ? `Δεν βρέθηκαν γραφεία τελετών στην περιοχή: ${searchLocation}` : 
            "Δεν βρέθηκαν γραφεία τελετών με τα επιλεγμένα κριτήρια");
          
        toast({
          title: "Κανένα αποτέλεσμα",
          description: message,
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Error fetching funeral homes:", error);
      setError("Αποτυχία φόρτωσης γραφείων τελετών");
      toast({
        title: "Σφάλμα",
        description: "Αποτυχία φόρτωσης γραφείων τελετών. Παρακαλώ δοκιμάστε ξανά.",
        variant: "destructive",
      });
    } finally {
      // Always ensure loading state is finished, even on error
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, []);

  return {
    funeralHomes,
    loading,
    error,
    fetchFuneralHomes
  };
};
