
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { FuneralHome } from "@/types/funeralHome";

interface ServicesTabProps {
  editedHome: FuneralHome;
  onServicesChange: (services: string[]) => void;
}

const ServicesTab = ({ editedHome, onServicesChange }: ServicesTabProps) => {
  const [newService, setNewService] = useState("");

  const handleServiceAdd = () => {
    if (newService.trim()) {
      const updatedServices = [...editedHome.services, newService.trim()];
      onServicesChange(updatedServices);
      setNewService("");
    }
  };

  const handleServiceRemove = (serviceToRemove: string) => {
    const updatedServices = editedHome.services.filter(service => service !== serviceToRemove);
    onServicesChange(updatedServices);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Υπηρεσίες</CardTitle>
        <CardDescription>
          Διαχείριση των υπηρεσιών που προσφέρει το γραφείο τελετών.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Προσθήκη νέας υπηρεσίας"
            value={newService}
            onChange={(e) => setNewService(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleServiceAdd();
              }
            }}
          />
          <Button onClick={handleServiceAdd}>
            <Plus className="h-4 w-4 mr-1" /> Προσθήκη
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {editedHome.services.map((service, index) => (
            <Badge key={index} variant="secondary" className="py-2 px-3 text-sm">
              {service}
              <Button
                variant="ghost"
                className="h-4 w-4 p-0 ml-2"
                onClick={() => handleServiceRemove(service)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServicesTab;
