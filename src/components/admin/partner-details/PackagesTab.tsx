
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FuneralHome, ServicePackage } from "@/types/funeralHome";
import PackageDialog from "./PackageDialog";

interface PackagesTabProps {
  editedHome: FuneralHome;
  onPackagesChange: (packages: ServicePackage[]) => void;
}

const PackagesTab = ({ editedHome, onPackagesChange }: PackagesTabProps) => {
  const [isPackageDialogOpen, setIsPackageDialogOpen] = useState(false);

  const handlePackageUpdate = (index: number, field: keyof ServicePackage, value: any) => {
    const updatedPackages = [...editedHome.packages];
    updatedPackages[index] = { ...updatedPackages[index], [field]: value };
    onPackagesChange(updatedPackages);
  };

  const addPackage = (newPackage: ServicePackage) => {
    const updatedPackages = [...editedHome.packages, newPackage];
    onPackagesChange(updatedPackages);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Πακέτα Υπηρεσιών</CardTitle>
        <CardDescription>
          Διαχείριση πακέτων υπηρεσιών και τιμών.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {editedHome.packages.map((pkg, index) => (
            <div key={pkg.id} className="border rounded-md p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor={`package-name-${index}`}>Ονομασία Πακέτου</Label>
                  <Input
                    id={`package-name-${index}`}
                    value={pkg.name}
                    onChange={(e) => handlePackageUpdate(index, "name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`package-price-${index}`}>Τιμή (€)</Label>
                  <Input
                    id={`package-price-${index}`}
                    type="number"
                    value={pkg.price}
                    onChange={(e) => handlePackageUpdate(index, "price", parseFloat(e.target.value))}
                  />
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <Label htmlFor={`package-desc-${index}`}>Περιγραφή</Label>
                <Textarea
                  id={`package-desc-${index}`}
                  value={pkg.description}
                  onChange={(e) => handlePackageUpdate(index, "description", e.target.value)}
                />
              </div>
              <Separator className="my-2" />
              <h4 className="font-medium mb-2">Συμπεριλαμβανόμενες Υπηρεσίες</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {pkg.includedServices.map((service, i) => (
                  <Badge key={i} variant="secondary" className="py-1.5 px-3">
                    {service}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
          <Button 
            className="w-full" 
            onClick={() => setIsPackageDialogOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" /> Προσθήκη Νέου Πακέτου
          </Button>
        </div>
        
        <PackageDialog 
          isOpen={isPackageDialogOpen} 
          onOpenChange={setIsPackageDialogOpen}
          onAddPackage={addPackage}
        />
      </CardContent>
    </Card>
  );
};

export default PackagesTab;
