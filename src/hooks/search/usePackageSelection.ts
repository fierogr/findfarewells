
import { useState } from "react";
import { FuneralHome, ServicePackage } from "@/types/funeralHome";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export const usePackageSelection = (searchLocation: string, searchPrefecture: string | null) => {
  const [isSelecting, setIsSelecting] = useState<boolean>(false);
  const navigate = useNavigate();
  
  const handlePackageSelect = async (home: FuneralHome, selectedPackage: ServicePackage | null) => {
    setIsSelecting(true);
    try {
      const phoneNumber = sessionStorage.getItem('searchPhoneNumber');
      
      if (!phoneNumber) {
        // Make the error message more helpful
        toast({
          title: "Τηλέφωνο απαιτείται",
          description: "Παρακαλώ επιλέξτε 'Νέα Αναζήτηση' και συμπληρώστε το τηλέφωνό σας για να συνεχίσετε.",
          variant: "destructive",
        });
        return;
      }
      
      // Use a type assertion to bypass TypeScript's type checking
      // This is a temporary solution until the Supabase types can be regenerated
      const { error } = await (supabase as any)
        .from('package_selections')
        .insert({
          location: searchLocation || null,
          prefecture: searchPrefecture || null,
          phone_number: phoneNumber,
          partner_id: home.id,
          partner_name: home.name,
          package_name: selectedPackage?.name || 'Βασικό πακέτο',
          package_price: selectedPackage?.price || home.basicPrice || 0,
          package_id: selectedPackage?.id || null
        });
      
      if (error) {
        console.error("Error saving package selection:", error);
        toast({
          title: "Σφάλμα",
          description: "Δεν ήταν δυνατή η αποθήκευση της επιλογής σας. Παρακαλώ δοκιμάστε ξανά.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Επιτυχία",
          description: "Η επιλογή του πακέτου καταχωρήθηκε επιτυχώς!",
        });
        
        // Navigate to funeral home details page
        navigate(`/funeral-home/${home.id}`);
      }
    } catch (error) {
      console.error("Error in package selection:", error);
      toast({
        title: "Σφάλμα",
        description: "Προέκυψε ένα σφάλμα κατά την επιλογή πακέτου. Παρακαλώ δοκιμάστε ξανά.",
        variant: "destructive",
      });
    } finally {
      setIsSelecting(false);
    }
  };
  
  return {
    isSelecting,
    handlePackageSelect
  };
};
