
import React, { useEffect } from "react";
import { useFuneralHome } from "@/hooks/useFuneralHome";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FuneralHome } from "@/types/funeralHome";
import BasicInfoTab from "./BasicInfoTab";
import ServicesTab from "./ServicesTab";
import PackagesTab from "./PackagesTab";
import AdditionalServicesTab from "./AdditionalServicesTab";
import RegionsTab from "./RegionsTab";
import PhotosTab from "./PhotosTab";
import ActionButtons from "./ActionButtons";
import DeletePartnerDialog from "./DeletePartnerDialog";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { updateFuneralHome } from "@/services/adminFuneralHomeService";

interface PartnerDetailsProps {
  partnerId: string;
  onBack: () => void;
}

const PartnerDetails = ({ partnerId, onBack }: PartnerDetailsProps) => {
  const { data: funeralHome, isLoading, error } = useFuneralHome(partnerId);
  const [editedHome, setEditedHome] = React.useState<FuneralHome | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (funeralHome) {
      console.log("Loaded funeral home with regions:", funeralHome.regions);
      
      // Βεβαιωνόμαστε ότι το regions είναι πάντα ένας πίνακας
      const safeRegions = funeralHome.regions || [];
      
      setEditedHome({
        ...funeralHome,
        regions: safeRegions
      });
    }
  }, [funeralHome]);

  const handleSave = async () => {
    if (editedHome) {
      try {
        console.log("Saving partner with regions:", editedHome.regions);
        const updatedHome = await updateFuneralHome(editedHome.id, editedHome);
        if (updatedHome) {
          queryClient.invalidateQueries({ queryKey: ["funeralHomes"] });
          queryClient.invalidateQueries({ queryKey: ["funeralHome", partnerId] });
          
          toast({
            title: "Αποθήκευση επιτυχής",
            description: "Οι αλλαγές αποθηκεύτηκαν με επιτυχία.",
          });
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

  if (isLoading) {
    return <div className="text-center py-4">Φόρτωση στοιχείων συνεργάτη...</div>;
  }

  if (error || !editedHome) {
    return (
      <div className="text-center py-4 text-red-500">
        Σφάλμα κατά τη φόρτωση των στοιχείων του συνεργάτη.
        <Button variant="outline" className="mt-2" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Επιστροφή
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Επιστροφή στη λίστα
        </Button>
        <ActionButtons 
          onDelete={() => setIsDeleteDialogOpen(true)} 
          onSave={handleSave} 
        />
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="basic">Βασικά Στοιχεία</TabsTrigger>
          <TabsTrigger value="services">Υπηρεσίες</TabsTrigger>
          <TabsTrigger value="packages">Πακέτα</TabsTrigger>
          <TabsTrigger value="additional">Επιπλέον Υπηρεσίες</TabsTrigger>
          <TabsTrigger value="regions">Περιοχές Εξυπηρέτησης</TabsTrigger>
          <TabsTrigger value="photos">Φωτογραφίες</TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <BasicInfoTab 
            editedHome={editedHome} 
            onInputChange={(field, value) => {
              if (editedHome) {
                setEditedHome({ ...editedHome, [field]: value });
              }
            }}
          />
        </TabsContent>

        <TabsContent value="services">
          <ServicesTab 
            editedHome={editedHome} 
            onServicesChange={(services) => {
              if (editedHome) {
                setEditedHome({ ...editedHome, services });
              }
            }}
          />
        </TabsContent>

        <TabsContent value="packages">
          <PackagesTab 
            editedHome={editedHome} 
            onPackagesChange={(packages) => {
              if (editedHome) {
                setEditedHome({ ...editedHome, packages });
              }
            }}
          />
        </TabsContent>

        <TabsContent value="additional">
          <AdditionalServicesTab 
            editedHome={editedHome} 
            onAdditionalServicesChange={(additionalServices) => {
              if (editedHome) {
                setEditedHome({ ...editedHome, additionalServices });
              }
            }}
          />
        </TabsContent>

        <TabsContent value="regions">
          <RegionsTab 
            editedHome={editedHome} 
            onRegionsChange={(regions) => {
              if (editedHome) {
                console.log("Updating regions in PartnerDetails:", regions);
                setEditedHome({ ...editedHome, regions });
              }
            }}
          />
        </TabsContent>

        <TabsContent value="photos">
          <PhotosTab 
            editedHome={editedHome} 
            onPhotoChange={(field, value) => {
              if (editedHome) {
                setEditedHome({ ...editedHome, [field]: value });
              }
            }}
          />
        </TabsContent>
      </Tabs>
      
      <DeletePartnerDialog 
        isOpen={isDeleteDialogOpen} 
        onOpenChange={setIsDeleteDialogOpen}
        partnerId={partnerId}
        onBack={onBack}
      />
    </div>
  );
};

export default PartnerDetails;
