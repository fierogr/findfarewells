
import { useQuery } from "@tanstack/react-query";
import { getFuneralHomeById } from "@/services/funeralHomeService";

export const useFuneralHome = (id: string) => {
  return useQuery({
    queryKey: ["funeralHome", id],
    queryFn: async () => {
      const home = await getFuneralHomeById(id);
      // Ensure regions is always an array
      if (home && !home.regions) {
        home.regions = [];
      }
      console.log("Fetched funeral home:", home);
      return home;
    },
    enabled: !!id,
  });
};
