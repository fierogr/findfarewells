
import { useState, useEffect } from "react";
import { useFuneralHome } from "@/hooks/useFuneralHome";
import { FuneralHome } from "@/types/funeralHome";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { updateFuneralHome } from "@/services/adminFuneralHomeService";

export const usePartnerDetails = (partnerId: string) => {
  const { data: funeralHome, isLoading, error } = useFuneralHome(partnerId);
  const [editedHome, setEditedHome] = useState<FuneralHome | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (funeralHome) {
      console.log("PartnerDetails: Loaded funeral home:", funeralHome.id);
      console.log("PartnerDetails: Loaded regions data:", funeralHome.regions);
      
      // Create a completely new object to avoid reference issues
      const homeWithCheckedRegions = {
        ...funeralHome,
        // Make sure regions is always a new array instance
        regions: Array.isArray(funeralHome.regions) ? [...funeralHome.regions] : []
      };
      
      console.log("PartnerDetails: Setting edited home with regions:", homeWithCheckedRegions.regions);
      setEditedHome(homeWithCheckedRegions);
    }
  }, [funeralHome]);

  const handleSave = async () => {
    if (editedHome) {
      try {
        console.log("PartnerDetails: Saving partner with regions:", editedHome.regions);
        
        // Make sure we send a complete copy of the edited home
        const homeToUpdate = { ...editedHome };
        
        const updatedHome = await updateFuneralHome(homeToUpdate.id, homeToUpdate);
        if (updatedHome) {
          // Invalidate all related queries to ensure fresh data
          queryClient.invalidateQueries({ queryKey: ["funeralHomes"] });
          queryClient.invalidateQueries({ queryKey: ["funeralHome", partnerId] });
          
          // Show success message
          toast({
            title: "Αποθήκευση επιτυχής",
            description: "Οι αλλαγές αποθηκεύτηκαν με επιτυχία.",
          });
          
          // Update local state with the response data
          setEditedHome(updatedHome);
        }
      } catch (err) {
        toast({
          title: "Σφάλμα",
          description: "Υπήρξε πρόβλημα κατά την αποθήκευση των αλλαγών.",
          variant: "destructive",
        });
        console.error("Error saving partner:", err);
      }
    }
  };

  return {
    editedHome,
    setEditedHome,
    isLoading,
    error,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    handleSave
  };
};
