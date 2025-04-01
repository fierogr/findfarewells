import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FuneralHome, ServicePackage } from "@/types/funeralHome";
import { useIsMobile } from "@/hooks/use-mobile";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface FuneralHomeCardProps {
  home: FuneralHome;
  selectedServices: string[];
  packageToShow?: ServicePackage | null;
}

const FuneralHomeCard = ({
  home,
  selectedServices,
  packageToShow = null
}: FuneralHomeCardProps) => {
  const isMobile = useIsMobile();
  const [imageError, setImageError] = React.useState(false);
  
  const getDisplayPrice = () => {
    if (packageToShow) {
      return packageToShow.price;
    } else if (home.packages && home.packages.length > 0) {
      return home.packages[0].price;
    }
    return home.basicPrice;
  };
  
  // Get the package to display - either the provided one or the first one
  const mainPackage = packageToShow || (home.packages && home.packages.length > 0 ? home.packages[0] : null);
  
  // Create initials for Avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  // Default fallback image
  const fallbackImage = "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80";
  
  // Normalize image URL to handle edge cases
  const normalizeImageUrl = (url: string | undefined): string => {
    if (!url || url.trim() === '') {
      console.log("Missing image URL for", home.name);
      return fallbackImage;
    }
    
    // If the URL is already a full URL, return it
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    
    // If it's a relative URL, convert to absolute
    if (url.startsWith('/')) {
      return `${window.location.origin}${url}`;
    }
    
    console.log("Using fallback for invalid URL:", url);
    return fallbackImage;
  };
  
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-3 h-full">
          <div className="relative h-full">
            <AspectRatio ratio={16 / 9} className="md:h-full">
              {!imageError && home.imageUrl ? (
                <img 
                  src={normalizeImageUrl(home.imageUrl)} 
                  alt={home.name} 
                  className="w-full h-full object-cover" 
                  onError={(e) => {
                    console.log("Image load error for:", home.name, home.imageUrl);
                    setImageError(true);
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-secondary">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="text-xl">{getInitials(home.name)}</AvatarFallback>
                  </Avatar>
                </div>
              )}
              {home.featured && (
                <div className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">
                  Προτεινόμενο
                </div>
              )}
              {packageToShow && (
                <div className="absolute bottom-2 right-2 bg-secondary text-xs px-2 py-1 rounded">
                  {packageToShow.name}
                </div>
              )}
            </AspectRatio>
          </div>
          
          <div className="p-4 md:p-6 flex flex-col">
            <h3 className="text-xl font-semibold mb-2">{home.name}</h3>
            
            {/* Location */}
            <div className="flex items-start gap-2 mb-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>{home.address}, {home.city}</span>
            </div>
            
            {/* Service Areas */}
            {home.regions && home.regions.length > 0 && (
              <div className="flex items-start gap-2 mb-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Εξυπηρετεί:</strong>{' '}
                  {Array.isArray(home.regions) 
                    ? home.regions.slice(0, 3).join(', ') + 
                      (home.regions.length > 3 ? ` + ${home.regions.length - 3} ακόμη` : '')
                    : 'Δεν υπάρχουν περιοχές'}
                </div>
              </div>
            )}
            
            {/* Ratings */}
            <div className="flex items-center mb-3">
              <div className="text-yellow-400 flex mr-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-4 h-4 ${i < Math.floor(home.rating) ? 'fill-current' : 'text-gray-300'}`} viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                  </svg>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">({home.reviewCount} κριτικές)</span>
            </div>
            
            {/* Description */}
            <p className="line-clamp-2 text-sm text-muted-foreground mb-4">{home.description}</p>
          </div>
          
          <div className="p-4 md:p-6 bg-secondary flex flex-col">
            <div className="text-center mb-4">
              <p className="text-sm text-muted-foreground mb-1">
                {mainPackage ? mainPackage.name : "Βασική Υπηρεσία"} Από
              </p>
              <p className="text-3xl font-semibold text-primary">
                {getDisplayPrice().toLocaleString()}€
              </p>
              <p className="text-xs text-muted-foreground">Συν ΦΠΑ</p>
            </div>
            
            <div className="space-y-2 mb-4">
              {mainPackage && mainPackage.includedServices.slice(0, 4).map((service, i) => (
                <div key={i} className="flex items-center text-sm">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {service}
                </div>
              ))}
              {mainPackage && mainPackage.includedServices.length > 4 && (
                <p className="text-xs text-muted-foreground">+{mainPackage.includedServices.length - 4} επιπλέον υπηρεσίες</p>
              )}
              
              {!mainPackage && Array.isArray(home.services) && home.services.slice(0, 4).map((service, i) => (
                <div key={i} className="flex items-center text-sm">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {service}
                </div>
              ))}
              {!mainPackage && Array.isArray(home.services) && home.services.length > 4 && (
                <p className="text-xs text-muted-foreground">+{home.services.length - 4} επιπλέον υπηρεσίες</p>
              )}
            </div>
            
            <div className="mt-auto space-y-2">
              <Link to={`/funeral-home/${home.id}`}>
                <Button className="w-full">Προβολή Λεπτομερειών</Button>
              </Link>
              <Button variant="outline" className="w-full">Επικοινωνία</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FuneralHomeCard;
