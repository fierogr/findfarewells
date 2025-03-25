
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { FuneralHome } from "@/types/funeralHome";

interface RegionsTabProps {
  editedHome: FuneralHome;
  onRegionsChange: (regions: string[]) => void;
}

const RegionsTab = ({ editedHome, onRegionsChange }: RegionsTabProps) => {
  const [newRegion, setNewRegion] = useState("");
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  
  useEffect(() => {
    if (editedHome) {
      // Ensure we have an array, even if regions is undefined or null
      const regions = Array.isArray(editedHome.regions) ? [...editedHome.regions] : [];
      console.log("RegionsTab: Initializing with regions:", regions);
      setSelectedRegions(regions);
    }
  }, [editedHome]);

  const handleRegionAdd = () => {
    if (newRegion.trim()) {
      const updatedRegions = [...selectedRegions, newRegion.trim()];
      setSelectedRegions(updatedRegions);
      onRegionsChange(updatedRegions);
      setNewRegion("");
    }
  };

  const handleRegionRemove = (regionToRemove: string) => {
    const updatedRegions = selectedRegions.filter(region => region !== regionToRemove);
    setSelectedRegions(updatedRegions);
    onRegionsChange(updatedRegions);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Περιοχές Εξυπηρέτησης</CardTitle>
        <CardDescription>
          Διαχείριση των περιοχών που εξυπηρετεί το γραφείο τελετών.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Προσθήκη νέας περιοχής"
            value={newRegion}
            onChange={(e) => setNewRegion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleRegionAdd();
              }
            }}
          />
          <Button onClick={handleRegionAdd}>
            <Plus className="h-4 w-4 mr-1" /> Προσθήκη
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {selectedRegions.map((region, index) => (
            <Badge key={index} variant="secondary" className="py-2 px-3 text-sm">
              {region}
              <Button
                variant="ghost"
                className="h-4 w-4 p-0 ml-2"
                onClick={() => handleRegionRemove(region)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RegionsTab;
