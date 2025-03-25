
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { FuneralHome } from "@/types/funeralHome";

interface RegionsTabProps {
  editedHome: FuneralHome;
  onRegionsChange: (regions: string[]) => void;
}

const RegionsTab = ({ editedHome, onRegionsChange }: RegionsTabProps) => {
  const greekRegions = [
    "Νομός Θεσσαλονίκης",
    "Νομός Σερρών",
    "Νομός Κιλκίς",
    "Νομός Πέλλας",
    "Νομός Ημαθίας",
    "Νομός Χαλκιδικής"
  ];

  const handleRegionToggle = (region: string) => {
    const currentRegions = editedHome.regions || [];
    const updatedRegions = currentRegions.includes(region)
      ? currentRegions.filter(r => r !== region)
      : [...currentRegions, region];
    
    onRegionsChange(updatedRegions);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Περιοχές Εξυπηρέτησης</CardTitle>
        <CardDescription>
          Διαχειριστείτε τις περιοχές στις οποίες δραστηριοποιείται το γραφείο τελετών.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground mb-4">
            Επιλέξτε τις περιοχές στις οποίες δραστηριοποιείται το γραφείο τελετών.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {greekRegions.map((region) => {
              const isChecked = (editedHome.regions || []).includes(region);
              return (
                <div key={region} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`region-${region}`}
                    checked={isChecked}
                    onCheckedChange={() => handleRegionToggle(region)}
                  />
                  <label
                    htmlFor={`region-${region}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {region}
                  </label>
                </div>
              );
            })}
          </div>

          {(editedHome.regions || []).length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Επιλεγμένες Περιοχές Εξυπηρέτησης:</h4>
              <div className="flex flex-wrap gap-2">
                {(editedHome.regions || []).map((region) => (
                  <Badge key={region} variant="secondary" className="px-3 py-1">
                    {region}
                    <Button
                      variant="ghost"
                      className="h-4 w-4 p-0 ml-1"
                      onClick={() => handleRegionToggle(region)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RegionsTab;
