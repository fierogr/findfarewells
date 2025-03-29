
import React from "react";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { PackageFormValues, availableServices } from "./types";

interface IncludedServicesFieldProps {
  form: UseFormReturn<PackageFormValues>;
}

const IncludedServicesField = ({ form }: IncludedServicesFieldProps) => {
  const includedServices = form.watch("includedServices") || [];

  const toggleService = (service: string) => {
    const updatedServices = includedServices.includes(service)
      ? includedServices.filter(s => s !== service)
      : [...includedServices, service];
      
    form.setValue("includedServices", updatedServices, { 
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
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
            <div className="grid grid-cols-2 gap-2">
              {availableServices.map((service) => (
                <div key={service} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`service-${service}`}
                    checked={includedServices.includes(service)}
                    onCheckedChange={() => toggleService(service)}
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
            
            {includedServices.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Επιλεγμένες υπηρεσίες:</p>
                <div className="flex flex-wrap gap-2">
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
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default IncludedServicesField;
