
import { useQuery } from "@tanstack/react-query";
import { getFuneralHomeById } from "@/services/funeralHomeService";

export const useFuneralHome = (id: string) => {
  return useQuery({
    queryKey: ["funeralHome", id],
    queryFn: () => getFuneralHomeById(id),
    enabled: !!id,
  });
};
