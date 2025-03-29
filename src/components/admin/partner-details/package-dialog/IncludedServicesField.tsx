
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";

interface IncludedServicesFieldProps {
  includedServices: string[];
  onChange: (services: string[]) => void;
}

const IncludedServicesField = ({ includedServices, onChange }: IncludedServicesFieldProps) => {
  const [includedServiceInput, setIncludedServiceInput] = useState("");

  const addIncludedService = () => {
    if (includedServiceInput.trim()) {
      onChange([...includedServices, includedServiceInput.trim()]);
      setIncludedServiceInput("");
    }
  };

  const removeIncludedService = (service: string) => {
    onChange(includedServices.filter(s => s !== service));
  };

  return (
    <div className="space-y-2">
      <Label>Συμπεριλαμβανόμενες Υπηρεσίες</Label>
      <div className="flex gap-2">
        <Input
          placeholder="Προσθήκη υπηρεσίας"
          value={includedServiceInput}
          onChange={(e) => setIncludedServiceInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addIncludedService();
            }
          }}
        />
        <Button type="button" onClick={addIncludedService}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-2 mt-2">
        {includedServices.map((service, i) => (
          <Badge key={i} variant="secondary" className="py-1.5 px-3">
            {service}
            <Button
              type="button"
              variant="ghost"
              className="h-4 w-4 p-0 ml-1"
              onClick={() => removeIncludedService(service)}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default IncludedServicesField;
