
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FuneralHome } from "@/types/funeralHome";

interface AdditionalServicesListProps {
  funeralHome: FuneralHome;
}

const AdditionalServicesList = ({ funeralHome }: AdditionalServicesListProps) => {
  if (!funeralHome.additionalServices || funeralHome.additionalServices.length === 0) {
    return null;
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Πρόσθετες Υπηρεσίες</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {funeralHome.additionalServices.map((service) => (
            <div key={service.id} className="flex justify-between items-center">
              <div>
                <div className="font-medium">{service.name}</div>
                {service.description && (
                  <div className="text-sm text-muted-foreground">
                    {service.description}
                  </div>
                )}
              </div>
              <div className="font-semibold">{service.price}€</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdditionalServicesList;
