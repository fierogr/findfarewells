
import { useState, useCallback } from "react";
import { toast } from "@/components/ui/use-toast";
import { getFuneralHomes } from "@/services/funeralHomeService";
import { FuneralHome } from "@/types/funeralHome";
import { filterHomesByRegion } from "./useLocationFilter";
import { filterHomesByPrefecture } from "@/utils/searchUtils";

export const useFuneralHomeFetch = () => {
  const [funeralHomes, setFuneralHomes] = useState<FuneralHome[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFuneralHomes = useCallback(async (searchLocation: string, prefecture: string | null = null) => {
    if (!searchLocation || searchLocation.trim() === '') {
      setLoading(false);
      setFuneralHomes([]);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    let retries = 0;
    const maxRetries = 2;

    const attempt = async () => {
      try {
        console.log(`Fetching funeral homes for location: "${searchLocation}", prefecture: "${prefecture}"`);
        const homes = await getFuneralHomes();
        
        if (!homes || homes.length === 0) {
          console.log("No funeral homes returned from service");
          setFuneralHomes([]);
          setLoading(false);
          return;
        }
        
        console.log(`Retrieved ${homes.length} homes from database`);
        
        let filteredHomes: FuneralHome[];
        
        // Make sure any home with a null regions field gets an empty array
        const homesWithValidRegions = homes.map(home => ({
          ...home,
          regions: home.regions || []
        }));
        
        if (prefecture) {
          // If prefecture is provided, filter by prefecture directly
          filteredHomes = filterHomesByPrefecture(homesWithValidRegions, prefecture);
          console.log(`Filtered by prefecture ${prefecture}: ${filteredHomes.length} homes match`);
          
          if (filteredHomes.length === 0) {
            // If no homes with the prefecture, try location filtering as fallback
            filteredHomes = await filterHomesByRegion(homesWithValidRegions, searchLocation);
            console.log(`Fallback filtering by location: ${filteredHomes.length} homes match location "${searchLocation}"`);
          }
        } else {
          // If no prefecture, filter by location as before
          filteredHomes = await filterHomesByRegion(homesWithValidRegions, searchLocation);
          console.log(`Filtered by location: ${filteredHomes.length} homes match location "${searchLocation}"`);
        }
        
        setFuneralHomes(filteredHomes);
        setLoading(false);
        
        if (filteredHomes.length === 0) {
          const message = prefecture 
            ? `Δεν βρέθηκαν γραφεία τελετών στον ${prefecture}`
            : `Δεν βρέθηκαν γραφεία τελετών στην περιοχή: ${searchLocation}`;
            
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
