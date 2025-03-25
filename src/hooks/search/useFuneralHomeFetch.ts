
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { getFuneralHomes } from "@/services/funeralHomeService";
import { FuneralHome } from "@/types/funeralHome";
import { filterHomesByRegion } from "./useLocationFilter";

export const useFuneralHomeFetch = () => {
  const [funeralHomes, setFuneralHomes] = useState<FuneralHome[]>([]);
  const [loading, setLoading] = useState(true);

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

  return {
    funeralHomes,
    loading,
    fetchFuneralHomes
  };
};
