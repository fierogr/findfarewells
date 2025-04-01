
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Form, 
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { FuneralHome, ServicePackage } from "@/types/funeralHome";
import { partnerFormSchema, PartnerFormValues } from "./forms/combinedFormSchema";
import BasicInfoForm from "./forms/BasicInfoForm";
import DetailsForm from "./forms/DetailsForm";
import PackagesForm from "./forms/PackagesForm";
import RegionsForm from "./forms/RegionsForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PartnerFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: FuneralHome) => Promise<void>;
  initialData?: FuneralHome;
}

const PartnerForm = ({ open, onClose, onSave, initialData }: PartnerFormProps) => {
  const [imageUrl, setImageUrl] = useState<string>(initialData?.imageUrl || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [packages, setPackages] = useState<ServicePackage[]>(initialData?.packages || []);
  const [selectedRegions, setSelectedRegions] = useState<string[]>(initialData?.regions || []);

  const form = useForm<PartnerFormValues>({
    resolver: zodResolver(partnerFormSchema),
    defaultValues: initialData ? {
      name: initialData.name,
      address: initialData.address,
      city: initialData.city,
      state: initialData.state,
      zip: initialData.zip,
      phone: initialData.phone,
      email: initialData.email,
      description: initialData.description,
      services: initialData.services.join(", "),
      website: initialData.website || "",
      featured: initialData.featured
    } : {
      name: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
      email: "",
      description: "",
      services: "",
      website: "",
      featured: false
    }
  });

  const onSubmit = async (data: PartnerFormValues) => {
    try {
      setIsSubmitting(true);
      
      const partnerData: FuneralHome = {
        id: initialData?.id || crypto.randomUUID(),
        name: data.name,
        address: data.address,
        city: data.city,
        state: data.state,
        zip: data.zip,
        phone: data.phone,
        email: data.email,
        description: data.description,
        services: data.services ? data.services.split(',').map(s => s.trim()) : [],
        imageUrl: imageUrl || "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80",
        website: data.website || "",
        hours: initialData?.hours || "",
        about: initialData?.about || "",
        rating: initialData?.rating || 0,
        reviewCount: initialData?.reviewCount || 0,
        basicPrice: packages.length > 0 ? packages[0].price : (initialData?.basicPrice || 0),
        featured: data.featured,
        amenities: initialData?.amenities || [],
        packages: packages,
        additionalServices: initialData?.additionalServices || [],
        reviews: initialData?.reviews || [],
        regions: selectedRegions
      };
      
      console.log("Saving partner with regions:", selectedRegions);
      await onSave(partnerData);
      toast.success(initialData ? "Ο συνεργάτης ενημερώθηκε με επιτυχία!" : "Ο συνεργάτης προστέθηκε με επιτυχία!");
      onClose();
    } catch (error) {
      console.error("Error saving partner:", error);
      toast.error("Υπήρξε ένα σφάλμα κατά την αποθήκευση των στοιχείων");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialData ? "Επεξεργασία Συνεργάτη" : "Προσθήκη Νέου Συνεργάτη"}</DialogTitle>
          <DialogDescription>
            {initialData 
              ? "Τροποποιήστε τα στοιχεία του συνεργάτη παρακάτω." 
              : "Συμπληρώστε τα στοιχεία του νέου συνεργάτη."}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="basic">Βασικά Στοιχεία</TabsTrigger>
                <TabsTrigger value="details">Λεπτομέρειες</TabsTrigger>
                <TabsTrigger value="regions">Περιοχές</TabsTrigger>
                <TabsTrigger value="packages">Πακέτα</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic">
                <BasicInfoForm form={form} />
              </TabsContent>
              
              <TabsContent value="details">
                <DetailsForm form={form} imageUrl={imageUrl} setImageUrl={setImageUrl} />
              </TabsContent>
              
              <TabsContent value="regions">
                <RegionsForm 
                  form={form} 
                  selectedRegions={selectedRegions} 
                  setSelectedRegions={setSelectedRegions} 
                />
              </TabsContent>
              
              <TabsContent value="packages">
                <PackagesForm packages={packages} setPackages={setPackages} />
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                disabled={isSubmitting}
              >
                Ακύρωση
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Αποθήκευση..." : initialData ? "Ενημέρωση" : "Προσθήκη"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PartnerForm;
