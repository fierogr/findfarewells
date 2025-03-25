
import { useQuery } from "@tanstack/react-query";
import { getFuneralHomes } from "@/services/funeralHomeService";

export const useFuneralHomes = () => {
  return useQuery({
    queryKey: ["funeralHomes"],
    queryFn: getFuneralHomes,
  });
};
