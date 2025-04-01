
import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { FUNERAL_HOME_SERVICES } from "@/constants/services";

interface PackageFormData {
  name: string;
  description: string;
  price: string;
  includedServices: string[];
}

interface PackageFormEditorProps {
  formData: PackageFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleServiceToggle: (service: string) => void;
  handleAddPackage: () => void;
  resetForm: () => void;
  editIndex: number | null;
}

const PackageFormEditor = ({ 
  formData, 
  handleChange, 
  handleServiceToggle,
  handleAddPackage, 
  resetForm, 
  editIndex 
}: PackageFormEditorProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{editIndex !== null ? "Επεξεργασία" : "Νέο"} Πακέτο Υπηρεσιών</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">Όνομα Πακέτου</label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="π.χ. Βασικό Πακέτο"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="price" className="text-sm font-medium">Τιμή (€)</label>
            <Input
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">Περιγραφή</label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Περιγραφή του πακέτου υπηρεσιών..."
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Περιλαμβανόμενες Υπηρεσίες</label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {FUNERAL_HOME_SERVICES.map((service) => (
              <div key={service} className="flex items-center space-x-2">
                <Checkbox 
                  id={`service-${service}`}
                  checked={formData.includedServices.includes(service)}
                  onCheckedChange={() => handleServiceToggle(service)}
                />
                <label
                  htmlFor={`service-${service}`}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {service}
                </label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" type="button" onClick={resetForm}>
          <X className="h-4 w-4 mr-1" /> Ακύρωση
        </Button>
        <Button type="button" onClick={handleAddPackage}>
          <Check className="h-4 w-4 mr-1" /> {editIndex !== null ? "Ενημέρωση" : "Προσθήκη"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PackageFormEditor;
