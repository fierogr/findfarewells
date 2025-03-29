
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Search, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";

// Define geographical regions and their prefectures
const REGIONS_AND_PREFECTURES: Record<string, string[]> = {
  "Αττική": ["Νομός Αττικής"],
  "Κεντρική Ελλάδα": ["Νομός Βοιωτίας", "Νομός Ευβοίας", "Νομός Ευρυτανίας", "Νομός Φθιώτιδας", "Νομός Φωκίδας"],
  "Κεντρική Μακεδονία": ["Νομός Ημαθίας", "Νομός Θεσσαλονίκης", "Νομός Κιλκίς", "Νομός Πέλλας", "Νομός Πιερίας", "Νομός Σερρών", "Νομός Χαλκιδικής"],
  "Κρήτη": ["Νομός Ηρακλείου", "Νομός Λασιθίου", "Νομός Ρεθύμνου", "Νομός Χανίων"],
  "Ανατολική Μακεδονία και Θράκη": ["Νομός Δράμας", "Νομός Έβρου", "Νομός Καβάλας", "Νομός Ξάνθης", "Νομός Ροδόπης"],
  "Ήπειρος": ["Νομός Άρτας", "Νομός Ιωαννίνων", "Νομός Πρέβεζας", "Νομός Θεσπρωτίας"],
  "Ιόνια Νησιά": ["Νομός Ζακύνθου", "Νομός Κέρκυρας", "Νομός Κεφαλληνίας", "Νομός Λευκάδας"],
  "Βόρειο Αιγαίο": ["Νομός Λέσβου", "Νομός Σάμου", "Νομός Χίου"],
  "Πελοπόννησος": ["Νομός Αργολίδας", "Νομός Αρκαδίας", "Νομός Κορινθίας", "Νομός Λακωνίας", "Νομός Μεσσηνίας"],
  "Νότιο Αιγαίο": ["Νομός Κυκλάδων", "Νομός Δωδεκανήσου"],
  "Θεσσαλία": ["Νομός Καρδίτσας", "Νομός Λαρίσης", "Νομός Μαγνησίας", "Νομός Τρικάλων"],
  "Δυτική Μακεδονία": ["Νομός Γρεβενών", "Νομός Καστοριάς", "Νομός Κοζάνης", "Νομός Φλώρινας"],
  "Δυτική Ελλάδα": ["Νομός Αιτωλοακαρνανίας", "Νομός Αχαΐας", "Νομός Ηλείας"]
};

// Available services
const SERVICES = [
  "Βασικό πακέτο",
  "Αποτέφρωση",
  "Έκθεση σορού",
  "Μεταφορά",
  "Έξτρα στολισμός",
  "Φερετροθήκη",
  "Φαγητό",
  "Μουσική"
];

interface RegionSearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RegionSearchDialog: React.FC<RegionSearchDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedPrefecture, setSelectedPrefecture] = useState<string>("");
  const [availablePrefectures, setAvailablePrefectures] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const navigate = useNavigate();

  // Update available prefectures when region changes
  useEffect(() => {
    if (selectedRegion) {
      setAvailablePrefectures(REGIONS_AND_PREFECTURES[selectedRegion] || []);
      setSelectedPrefecture(""); // Reset prefecture when region changes
    } else {
      setAvailablePrefectures([]);
    }
  }, [selectedRegion]);

  const handleServiceToggle = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleSearch = () => {
    if (!selectedRegion || !selectedPrefecture) {
      toast({
        title: "Απαιτούνται πεδία",
        description: "Παρακαλώ επιλέξτε περιοχή και νομό για να συνεχίσετε.",
        variant: "destructive",
      });
      return;
    }

    const servicesParam = selectedServices.length > 0 
      ? `&services=${encodeURIComponent(selectedServices.join(','))}` 
      : '';
    
    console.log("Navigating to search with params:", {
      prefecture: selectedPrefecture,
      services: selectedServices
    });
    
    navigate(`/search?prefecture=${encodeURIComponent(selectedPrefecture)}${servicesParam}`);
    onOpenChange(false);
  };

  const handleReset = () => {
    setSelectedRegion("");
    setSelectedPrefecture("");
    setSelectedServices([]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Αναζήτηση Γραφείων Τελετών</DialogTitle>
          <DialogDescription>
            Επιλέξτε την περιοχή, τον νομό και τις υπηρεσίες που σας ενδιαφέρουν.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Geographical Region Selection */}
          <div className="space-y-2">
            <label htmlFor="region" className="text-sm font-medium leading-none">
              Γεωγραφική Περιοχή
            </label>
            <Select
              value={selectedRegion}
              onValueChange={setSelectedRegion}
            >
              <SelectTrigger id="region" className="w-full">
                <SelectValue placeholder="Επιλέξτε περιοχή" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(REGIONS_AND_PREFECTURES).map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Prefecture Selection */}
          <div className="space-y-2">
            <label htmlFor="prefecture" className="text-sm font-medium leading-none">
              Νομός
            </label>
            <Select
              value={selectedPrefecture}
              onValueChange={setSelectedPrefecture}
              disabled={!selectedRegion}
            >
              <SelectTrigger id="prefecture" className="w-full">
                <SelectValue placeholder={selectedRegion ? "Επιλέξτε νομό" : "Πρώτα επιλέξτε περιοχή"} />
              </SelectTrigger>
              <SelectContent>
                {availablePrefectures.map((prefecture) => (
                  <SelectItem key={prefecture} value={prefecture}>
                    {prefecture}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Services Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">
              Υπηρεσίες (προαιρετικά)
            </label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {SERVICES.map((service) => (
                <div key={service} className="flex items-center space-x-2">
                  <Checkbox
                    id={`service-${service}`}
                    checked={selectedServices.includes(service)}
                    onCheckedChange={() => handleServiceToggle(service)}
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
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={handleReset} type="button">
            Επαναφορά
          </Button>
          <Button onClick={handleSearch} type="button" className="gap-2">
            <Search className="h-4 w-4" />
            Αναζήτηση
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RegionSearchDialog;
