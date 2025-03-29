
import React, { useState } from "react";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { PackageFormValues } from "./types";

interface IncludedServicesFieldProps {
  form: UseFormReturn<PackageFormValues>;
}

const IncludedServicesField = ({ form }: IncludedServicesFieldProps) => {
  const [serviceInput, setServiceInput] = useState("");
  const includedServices = form.watch("includedServices") || [];

  const addService = () => {
    if (serviceInput.trim()) {
      const updatedServices = [...includedServices, serviceInput.trim()];
      form.setValue("includedServices", updatedServices, { 
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      });
      setServiceInput("");
    }
  };

  const removeService = (serviceToRemove: string) => {
    const updatedServices = includedServices.filter(service => service !== serviceToRemove);
    form.setValue("includedServices", updatedServices, { 
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
  };

  return (
    <FormField
      control={form.control}
      name="includedServices"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Συμπεριλαμβανόμενες Υπηρεσίες</FormLabel>
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                placeholder="Προσθήκη υπηρεσίας"
                value={serviceInput}
                onChange={(e) => setServiceInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addService();
                  }
                }}
              />
              <Button type="button" onClick={addService}>
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
                    onClick={() => removeService(service)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default IncludedServicesField;
