
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Plus, MapPin } from "lucide-react";
import { FuneralHome } from "@/types/funeralHome";
import { REGIONS_AND_PREFECTURES } from "@/constants/geographicData";
import { Checkbox } from "@/components/ui/checkbox";

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

  const toggleRegion = (region: string) => {
    const updatedRegions = selectedRegions.includes(region)
      ? selectedRegions.filter(r => r !== region)
      : [...selectedRegions, region];
    
    setSelectedRegions(updatedRegions);
    onRegionsChange(updatedRegions);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            Περιοχές Εξυπηρέτησης
          </CardTitle>
          <CardDescription>
            Διαχείριση των περιοχών που εξυπηρετεί το γραφείο τελετών.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
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
          </div>
          
          {selectedRegions.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-2">Επιλεγμένες Περιοχές</h4>
              <div className="flex flex-wrap gap-2">
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
            </div>
          )}
          
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Επιλέξτε από την λίστα</h4>
            {Object.entries(REGIONS_AND_PREFECTURES).map(([region, prefectures]) => (
              <div key={region} className="space-y-2">
                <h5 className="font-medium text-sm">{region}</h5>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {prefectures.map((prefecture) => (
                    <div key={prefecture} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`region-${prefecture}`}
                        checked={selectedRegions.includes(prefecture)}
                        onCheckedChange={() => toggleRegion(prefecture)}
                      />
                      <label
                        htmlFor={`region-${prefecture}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {prefecture}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegionsTab;
