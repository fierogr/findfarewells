
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FuneralHome } from "@/types/funeralHome";

interface BasicInfoTabProps {
  editedHome: FuneralHome;
  onInputChange: (field: keyof FuneralHome, value: string | number | boolean) => void;
}

const BasicInfoTab = ({ editedHome, onInputChange }: BasicInfoTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Βασικά Στοιχεία</CardTitle>
        <CardDescription>
          Βασικές πληροφορίες για το γραφείο τελετών.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Επωνυμία</Label>
            <Input
              id="name"
              value={editedHome.name}
              onChange={(e) => onInputChange("name", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={editedHome.email}
              onChange={(e) => onInputChange("email", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Τηλέφωνο</Label>
            <Input
              id="phone"
              value={editedHome.phone}
              onChange={(e) => onInputChange("phone", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Ιστοσελίδα</Label>
            <Input
              id="website"
              value={editedHome.website}
              onChange={(e) => onInputChange("website", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Διεύθυνση</Label>
            <Input
              id="address"
              value={editedHome.address}
              onChange={(e) => onInputChange("address", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-2">
              <Label htmlFor="city">Πόλη</Label>
              <Input
                id="city"
                value={editedHome.city}
                onChange={(e) => onInputChange("city", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">Περιοχή</Label>
              <Input
                id="state"
                value={editedHome.state}
                onChange={(e) => onInputChange("state", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip">Τ.Κ.</Label>
              <Input
                id="zip"
                value={editedHome.zip}
                onChange={(e) => onInputChange("zip", e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Σύντομη Περιγραφή</Label>
          <Textarea
            id="description"
            value={editedHome.description}
            onChange={(e) => onInputChange("description", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="about">Αναλυτική Περιγραφή</Label>
          <Textarea
            id="about"
            className="min-h-[150px]"
            value={editedHome.about}
            onChange={(e) => onInputChange("about", e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicInfoTab;
