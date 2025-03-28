
import { useQuery } from "@tanstack/react-query";
import { getFuneralHomeById } from "@/services/funeralHome";

export const useFuneralHome = (id: string) => {
  return useQuery({
    queryKey: ["funeralHome", id],
    queryFn: async () => {
      const home = await getFuneralHomeById(id);
      
      // Ensure regions is always an array with proper initialization
      if (home) {
        // Make a deep copy of regions to avoid reference issues
        home.regions = Array.isArray(home.regions) ? [...home.regions] : [];
        console.log("Fetched funeral home:", home);
        console.log("Regions from API:", home.regions);
      }
      
      return home;
    },
    enabled: !!id,
  });
};
