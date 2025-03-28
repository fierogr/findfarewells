
import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { MapPin, Clock, ArrowRight, Star, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FuneralHome } from "@/types/funeralHome";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface FuneralHomeCardProps {
  home: FuneralHome;
  selectedServices: string[];
}

const FuneralHomeCard = ({ home, selectedServices }: FuneralHomeCardProps) => {
  const [searchParams] = useSearchParams();
  const searchLocation = searchParams.get("location");
  
  console.log("Rendering FuneralHomeCard for:", home.name);
  console.log("Regions:", home.regions);
  console.log("Services:", home.services);

  // Get base price either from first package or basic price
  const basePrice = home.packages && home.packages.length > 0 
    ? home.packages[0].price 
    : home.basicPrice;

  // Set up the state to pass in the Link
  const linkState = { location: searchLocation };
  const searchQuery = searchLocation ? `?from=${encodeURIComponent(searchLocation)}` : "";

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {home.imageUrl && (
          <div className="md:col-span-3">
            <AspectRatio ratio={4/3}>
              <img 
                src={home.imageUrl} 
                alt={home.name} 
                className="object-cover w-full h-full"
              />
            </AspectRatio>
          </div>
        )}
        
        <div className={`p-4 md:p-6 ${home.imageUrl ? 'md:col-span-6' : 'md:col-span-9'}`}>
          <div className="mb-2 flex items-start justify-between">
            <h3 className="text-xl font-semibold">{home.name}</h3>
            {home.featured && (
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Προτεινόμενο</Badge>
            )}
          </div>
          
          <div className="mb-4 flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{home.address}, {home.city}</span>
          </div>
          
          {home.regions && home.regions.length > 0 ? (
            <div className="mb-3">
              <p className="text-sm font-medium mb-1">Περιοχές Εξυπηρέτησης:</p>
              <div className="flex flex-wrap gap-1">
                {home.regions.slice(0, 3).map((region, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {region}
                  </Badge>
                ))}
                {home.regions.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{home.regions.length - 3} ακόμα
                  </Badge>
                )}
              </div>
            </div>
          ) : (
            <div className="mb-3">
              <p className="text-sm text-muted-foreground">Δεν έχουν οριστεί περιοχές εξυπηρέτησης</p>
            </div>
          )}
          
          {home.hours && (
            <div className="mb-3 flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              <span>{home.hours}</span>
            </div>
          )}
          
          <p className="text-sm line-clamp-2 text-muted-foreground mb-3">{home.description}</p>
          
          {/* Reviews section - moved from right column to middle column */}
          <div className="mb-3">
            <div className="flex items-center space-x-1 mb-1">
              {Array(5).fill(0).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < home.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              {home.reviewCount > 0 
                ? `${home.reviewCount} κριτικές` 
                : "Δεν υπάρχουν κριτικές ακόμα"}
            </p>
          </div>
          
          {home.services && home.services.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium mb-1">Παρεχόμενες Υπηρεσίες:</p>
              <div className="flex flex-wrap gap-1">
                {home.services.slice(0, 3).map((service, index) => (
                  <Badge 
                    key={index}
                    variant={selectedServices.includes(service) ? "default" : "outline"}
                    className="text-xs"
                  >
                    {service}
                  </Badge>
                ))}
                {home.services.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{home.services.length - 3} ακόμα
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="md:col-span-3 p-4 md:p-6 bg-gray-50 flex flex-col justify-between">
          <div>
            {/* Price section - moved back to right column */}
            {basePrice > 0 && (
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">Από</p>
                <p className="text-2xl font-bold">{basePrice}€</p>
                <p className="text-xs text-muted-foreground">Βασικό πακέτο</p>
              </div>
            )}
          </div>
          
          <div className="flex flex-col space-y-2 mt-2">
            <Button variant="outline" className="w-full">
              <Phone className="h-4 w-4 mr-2" />
              <span>Επικοινωνία</span>
            </Button>
            
            <Link 
              to={`/funeral-home/${home.id}${searchQuery}`} 
              state={linkState}
              className="w-full"
            >
              <Button className="w-full">
                <span>Περισσότερα</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FuneralHomeCard;
