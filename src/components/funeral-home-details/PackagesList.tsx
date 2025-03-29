
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FuneralHome } from "@/types/funeralHome";

interface PackagesListProps {
  funeralHome: FuneralHome;
}

const PackagesList = ({ funeralHome }: PackagesListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Πακέτα Υπηρεσιών</CardTitle>
      </CardHeader>
      <CardContent>
        {funeralHome.packages && funeralHome.packages.length > 0 ? (
          <div className="space-y-4">
            {funeralHome.packages.map((pkg) => (
              <div key={pkg.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">{pkg.name}</h3>
                  <div className="text-lg font-semibold">{pkg.price}€</div>
                </div>
                <p className="text-sm text-muted-foreground mt-1 mb-3">
                  {pkg.description}
                </p>
                <div>
                  <h4 className="text-xs uppercase text-muted-foreground mb-1">
                    Περιλαμβάνει:
                  </h4>
                  <ul className="text-sm space-y-1">
                    {pkg.includedServices.map((service, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center py-4 text-muted-foreground">
            Δεν έχουν οριστεί πακέτα υπηρεσιών.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default PackagesList;
