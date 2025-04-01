
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FuneralHome } from "@/types/funeralHome";
import BasicInfoTab from "./BasicInfoTab";
import PackagesTab from "./PackagesTab";
import AdditionalServicesTab from "./AdditionalServicesTab";
import RegionsTab from "./RegionsTab";
import PhotosTab from "./PhotosTab";

interface PartnerDetailsTabsProps {
  editedHome: FuneralHome;
  onInputChange: (field: keyof FuneralHome, value: string | number | boolean) => void;
  onServicesChange: (services: string[]) => void;
  onPackagesChange: (packages: FuneralHome['packages']) => void;
  onAdditionalServicesChange: (additionalServices: FuneralHome['additionalServices']) => void;
  onRegionsChange: (regions: string[]) => void;
  onPhotoChange: (field: keyof FuneralHome, value: string | string[]) => void;
}

const PartnerDetailsTabs = ({ 
  editedHome, 
  onInputChange,
  onServicesChange,
  onPackagesChange,
  onAdditionalServicesChange,
  onRegionsChange,
  onPhotoChange
}: PartnerDetailsTabsProps) => {
  return (
    <Tabs defaultValue="basic" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="basic">Βασικά Στοιχεία</TabsTrigger>
        <TabsTrigger value="packages">Πακέτα</TabsTrigger>
        <TabsTrigger value="additional">Επιπλέον Υπηρεσίες</TabsTrigger>
        <TabsTrigger value="regions">Περιοχές Εξυπηρέτησης</TabsTrigger>
        <TabsTrigger value="photos">Φωτογραφίες</TabsTrigger>
      </TabsList>

      <TabsContent value="basic">
        <BasicInfoTab 
          editedHome={editedHome} 
          onInputChange={onInputChange}
        />
      </TabsContent>

      <TabsContent value="packages">
        <PackagesTab 
          editedHome={editedHome} 
          onPackagesChange={onPackagesChange}
        />
      </TabsContent>

      <TabsContent value="additional">
        <AdditionalServicesTab 
          editedHome={editedHome} 
          onAdditionalServicesChange={onAdditionalServicesChange}
        />
      </TabsContent>

      <TabsContent value="regions">
        <RegionsTab 
          editedHome={editedHome} 
          onRegionsChange={onRegionsChange}
        />
      </TabsContent>

      <TabsContent value="photos">
        <PhotosTab 
          editedHome={editedHome} 
          onPhotoChange={onPhotoChange}
        />
      </TabsContent>
    </Tabs>
  );
};

export default PartnerDetailsTabs;
