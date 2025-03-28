
import { useState, useCallback } from "react";
import { toast } from "@/components/ui/use-toast";
import { getFuneralHomes } from "@/services/funeralHomeService";
import { FuneralHome } from "@/types/funeralHome";
import { filterHomesByRegion } from "./useLocationFilter";

export const useFuneralHomeFetch = () => {
  const [funeralHomes, setFuneralHomes] = useState<FuneralHome[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFuneralHomes = useCallback(async (searchLocation: string) => {
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
        console.log(`Fetching funeral homes for location: "${searchLocation}"`);
        const homes = await getFuneralHomes();
        
        if (!homes || homes.length === 0) {
          console.log("No funeral homes returned from service");
          setFuneralHomes([]);
          setLoading(false);
          return;
        }
        
        console.log(`Retrieved ${homes.length} homes from database`);
        
        const filteredByRegion = await filterHomesByRegion(homes, searchLocation);
        console.log(`Filtered results: ${filteredByRegion.length} homes match location "${searchLocation}"`);
        
        setFuneralHomes(filteredByRegion);
        setLoading(false);
        
        if (filteredByRegion.length === 0) {
          toast({
            title: "Κανένα αποτέλεσμα",
            description: `Δεν βρέθηκαν γραφεία τελετών στην περιοχή: ${searchLocation}`,
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
