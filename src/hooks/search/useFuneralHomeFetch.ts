
import { useState, useCallback } from "react";
import { toast } from "@/components/ui/use-toast";
import { getFuneralHomes } from "@/services/funeralHome";
import { FuneralHome } from "@/types/funeralHome";
import { filterHomesByRegion } from "./useLocationFilter";
import { filterHomesByPrefecture } from "@/utils/searchUtils";

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
    
    let retries = 0;
    const maxRetries = 2;

    const attempt = async () => {
      try {
        console.log(`Fetching funeral homes with: 
          location: "${searchLocation}", 
          prefecture: "${prefecture}",
          services: [${services.join(', ')}]`);
          
        const homes = await getFuneralHomes();
        
        if (!homes || homes.length === 0) {
          console.log("No funeral homes returned from service");
          setFuneralHomes([]);
          setLoading(false);
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
          
          // If no prefecture results, try filtering by location as a fallback
          if (filteredHomes.length === 0 && searchLocation) {
            filteredHomes = await filterHomesByRegion(homesWithValidRegions, searchLocation);
            console.log(`Fallback filtering by location: ${filteredHomes.length} homes match location "${searchLocation}"`);
          }
        } 
        // 2. Otherwise filter by location if provided
        else if (searchLocation) {
          filteredHomes = await filterHomesByRegion(homesWithValidRegions, searchLocation);
          console.log(`Filtered by location: ${filteredHomes.length} homes match location "${searchLocation}"`);
        }
        
        // 3. Filter by services if any are selected
        if (services.length > 0) {
          filteredHomes = filteredHomes.filter(home => {
            return services.every(service => 
              home.services && home.services.some(homeService => 
                homeService.toLowerCase().includes(service.toLowerCase())
              )
            );
          });
          console.log(`Filtered by services: ${filteredHomes.length} homes match selected services`);
        }
        
        setFuneralHomes(filteredHomes);
        setLoading(false);
        
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
        
        if (retries < maxRetries) {
          retries++;
          console.log(`Retrying fetch attempt ${retries}...`);
          setTimeout(attempt, 1000);
        } else {
          setLoading(false);
          setFuneralHomes([]);
          setError("Αποτυχία φόρτωσης γραφείων τελετών");
          toast({
            title: "Σφάλμα",
            description: "Αποτυχία φόρτωσης γραφείων τελετών. Παρακαλώ δοκιμάστε ξανά.",
            variant: "destructive",
          });
        }
      }
    };

    attempt();
  }, []);

  return {
    funeralHomes,
    loading,
    error,
    fetchFuneralHomes
  };
};
