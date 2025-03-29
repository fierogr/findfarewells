
import React from "react";
import { MapPin, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchFormProps {
  location: string;
  phoneNumber: string;
  onLocationChange: (value: string) => void;
  onPhoneNumberChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const SearchForm = ({ 
  location, 
  phoneNumber,
  onLocationChange, 
  onPhoneNumberChange,
  onSubmit 
}: SearchFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-3 mb-8 animate-fadeIn delay-100">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <MapPin className="h-5 w-5 text-muted-foreground" />
        </div>
        <Input
          type="text"
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          className="pl-10"
          placeholder="Αναζήτηση ανά περιοχή εξυπηρέτησης"
          required
        />
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Phone className="h-5 w-5 text-muted-foreground" />
        </div>
        <Input
          type="tel"
          value={phoneNumber}
          onChange={(e) => onPhoneNumberChange(e.target.value)}
          className="pl-10"
          placeholder="Τηλέφωνο επικοινωνίας"
          required
        />
      </div>
      <Button type="submit" className="w-full">Αναζήτηση</Button>
    </form>
  );
};

export default SearchForm;
