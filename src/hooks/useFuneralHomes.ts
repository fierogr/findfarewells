
import { useQuery } from "@tanstack/react-query";
import { getFuneralHomes } from "@/services/funeralHome";

export const useFuneralHomes = () => {
  return useQuery({
    queryKey: ["funeralHomes"],
    queryFn: () => getFuneralHomes(),
  });
};
