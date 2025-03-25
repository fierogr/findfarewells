
import React from "react";
import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchFormProps {
  location: string;
  onLocationChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const SearchForm = ({ location, onLocationChange, onSubmit }: SearchFormProps) => {
  return (
    <form onSubmit={onSubmit} className="flex gap-2 mb-8 animate-fadeIn delay-100">
      <div className="relative flex-grow">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <MapPin className="h-5 w-5 text-muted-foreground" />
        </div>
        <Input
          type="text"
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          className="pl-10"
          placeholder="Αλλαγή τοποθεσίας"
          required
        />
      </div>
      <Button type="submit">Αναζήτηση</Button>
    </form>
  );
};

export default SearchForm;
