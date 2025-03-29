
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface ServicesCheckboxesProps {
  services: string[];
  selectedServices: string[];
  onServiceToggle: (service: string) => void;
  disabled?: boolean; // Add optional disabled property
}

const ServicesCheckboxes: React.FC<ServicesCheckboxesProps> = ({
  services,
  selectedServices,
  onServiceToggle,
  disabled,
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none">
        Υπηρεσίες (προαιρετικά)
      </label>
      <div className="grid grid-cols-2 gap-2 mt-2">
        {services.map((service) => (
          <div key={service} className="flex items-center space-x-2">
            <Checkbox
              id={`service-${service}`}
              checked={selectedServices.includes(service)}
              onCheckedChange={() => onServiceToggle(service)}
              disabled={disabled}
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
  );
};

export default ServicesCheckboxes;
