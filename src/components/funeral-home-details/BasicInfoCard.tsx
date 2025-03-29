
import React from "react";
import { MapPin, Phone, Mail, Globe, Clock, Star } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FuneralHome } from "@/types/funeralHome";
import { RegionsDisplay } from "@/components/funeral-homes/RegionsDisplay";

interface BasicInfoCardProps {
  funeralHome: FuneralHome;
  getStarRating: (rating: number) => JSX.Element[];
}

const BasicInfoCard = ({ funeralHome, getStarRating }: BasicInfoCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-2xl mb-1">{funeralHome.name}</CardTitle>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>
                {funeralHome.address}, {funeralHome.city}, {funeralHome.state}
              </span>
            </div>
            <div className="flex items-center gap-1 mt-2">
              {getStarRating(funeralHome.rating)}
              <span className="text-sm text-muted-foreground ml-1">
                ({funeralHome.reviewCount} κριτικές)
              </span>
            </div>
          </div>
          {funeralHome.featured && (
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
              Προτεινόμενο
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{funeralHome.description}</p>

        <RegionsDisplay regions={funeralHome.regions} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <span>{funeralHome.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <span>{funeralHome.email}</span>
            </div>
          </div>
          <div className="space-y-2">
            {funeralHome.website && (
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <a
                  href={funeralHome.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Ιστοσελίδα
                </a>
              </div>
            )}
            {funeralHome.hours && (
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span>{funeralHome.hours}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicInfoCard;
