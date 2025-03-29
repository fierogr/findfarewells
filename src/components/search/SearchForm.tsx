
import React, { useState } from "react";
import { MapPin, Phone, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchFormProps {
  location: string;
  phoneNumber: string;
  onLocationChange: (value: string) => void;
  onPhoneNumberChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
}

const SearchForm = ({ 
  location, 
  phoneNumber,
  onLocationChange, 
  onPhoneNumberChange,
  onSubmit,
  isLoading = false
}: SearchFormProps) => {
  const [isTouched, setIsTouched] = useState(false);

  const handleInputChange = (setter: (value: string) => void, value: string) => {
    setter(value);
    setIsTouched(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    
    // Only submit if at least one field has been filled out
    if (location.trim() || phoneNumber.trim()) {
      onSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mb-8 animate-fadeIn delay-100">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <MapPin className="h-5 w-5 text-muted-foreground" />
        </div>
        <Input
          type="text"
          value={location || ""}
          onChange={(e) => handleInputChange(onLocationChange, e.target.value)}
          className="pl-10"
          placeholder="Αναζήτηση ανά περιοχή εξυπηρέτησης"
          disabled={isLoading}
        />
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Phone className="h-5 w-5 text-muted-foreground" />
        </div>
        <Input
          type="tel"
          value={phoneNumber || ""}
          onChange={(e) => handleInputChange(onPhoneNumberChange, e.target.value)}
          className="pl-10"
          placeholder="Τηλέφωνο επικοινωνίας"
          disabled={isLoading}
        />
      </div>
      <Button 
        type="submit" 
        className="w-full"
        disabled={isLoading || (!isTouched && !location && !phoneNumber)}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Αναζήτηση...
          </>
        ) : (
          "Αναζήτηση"
        )}
      </Button>
    </form>
  );
};

export default SearchForm;
