
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FuneralHome, AdditionalService } from "@/types/funeralHome";

interface AdditionalServicesTabProps {
  editedHome: FuneralHome;
  onAdditionalServicesChange: (additionalServices: AdditionalService[]) => void;
}

const AdditionalServicesTab = ({ editedHome, onAdditionalServicesChange }: AdditionalServicesTabProps) => {
  const handleAdditionalServiceUpdate = (index: number, field: keyof AdditionalService, value: any) => {
    const updatedServices = [...editedHome.additionalServices];
    updatedServices[index] = { ...updatedServices[index], [field]: value };
    onAdditionalServicesChange(updatedServices);
  };

  const handleAddService = () => {
    const newService: AdditionalService = {
      id: `service-${Date.now()}`,
      name: "",
      price: 0,
      description: ""
    };
    onAdditionalServicesChange([...editedHome.additionalServices, newService]);
  };

  const handleRemoveService = (index: number) => {
    const updatedServices = [...editedHome.additionalServices];
    updatedServices.splice(index, 1);
    onAdditionalServicesChange(updatedServices);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Επιπλέον Υπηρεσίες</CardTitle>
        <CardDescription>
          Διαχείριση επιπλέον προσφερόμενων υπηρεσιών.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Υπηρεσία</TableHead>
              <TableHead>Τιμή (€)</TableHead>
              <TableHead>Περιγραφή</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {editedHome.additionalServices.map((service, index) => (
              <TableRow key={service.id}>
                <TableCell>
                  <Input
                    value={service.name}
                    onChange={(e) => handleAdditionalServiceUpdate(index, "name", e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={service.price}
                    onChange={(e) => handleAdditionalServiceUpdate(index, "price", parseFloat(e.target.value))}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={service.description || ""}
                    onChange={(e) => handleAdditionalServiceUpdate(index, "description", e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0"
                    onClick={() => handleRemoveService(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button className="mt-4" onClick={handleAddService}>
          <Plus className="mr-2 h-4 w-4" /> Προσθήκη Υπηρεσίας
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdditionalServicesTab;
