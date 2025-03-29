
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Phone } from "lucide-react";

interface PhoneNumberFieldProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const PhoneNumberField: React.FC<PhoneNumberFieldProps> = ({ 
  value = "", 
  onChange, 
  disabled = false
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="phone-number">Τηλέφωνο Επικοινωνίας</Label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Phone className="h-5 w-5 text-muted-foreground" />
        </div>
        <Input
          id="phone-number"
          type="tel"
          placeholder="Εισάγετε το τηλέφωνό σας"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10"
          required
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default PhoneNumberField;
