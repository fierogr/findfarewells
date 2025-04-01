
import React from "react";

interface ServicesListProps {
  services: string[];
  limit?: number;
}

const ServicesList = ({ services, limit = 4 }: ServicesListProps) => {
  if (!services || services.length === 0) {
    return null;
  }

  const displayServices = services.slice(0, limit);
  const remainingCount = services.length - limit;

  return (
    <div className="space-y-2">
      {displayServices.map((service, i) => (
        <div key={i} className="flex items-center text-sm">
          <svg className="w-4 h-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {service}
        </div>
      ))}
      
      {remainingCount > 0 && (
        <p className="text-xs text-muted-foreground">+{remainingCount} επιπλέον υπηρεσίες</p>
      )}
    </div>
  );
};

export default ServicesList;
