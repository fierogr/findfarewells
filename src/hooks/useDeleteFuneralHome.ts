
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFuneralHome } from "@/services/funeralHomeService";

export const useDeleteFuneralHome = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => deleteFuneralHome(id),
    onSuccess: () => {
      // Invalidate and refetch funeral homes list
      queryClient.invalidateQueries({ queryKey: ["funeralHomes"] });
    }
  });
};
