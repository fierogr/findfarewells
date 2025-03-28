
import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FuneralHome } from "@/types/funeralHome";
import { useIsMobile } from "@/hooks/use-mobile";
interface FuneralHomeCardProps {
  home: FuneralHome;
  selectedServices: string[];
}
const FuneralHomeCard = ({
  home,
  selectedServices
}: FuneralHomeCardProps) => {
  const isMobile = useIsMobile();
  const getDisplayPrice = (home: FuneralHome) => {
    if (home.packages && home.packages.length > 0) {
      return home.packages[0].price;
    }
    return home.basicPrice;
  };
  return <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-3 h-full">
          <div className="relative aspect-video md:aspect-auto">
            <img src={home.imageUrl} alt={home.name} className="w-full h-full object-cover" />
            {home.featured && <div className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">
                Προτεινόμενο
              </div>}
          </div>
          
          <div className="p-4 md:p-6 flex flex-col">
            <h3 className="text-xl font-semibold mb-2">{home.name}</h3>
            <div className="flex items-start gap-2 mb-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>{home.address}, {home.city}</span>
            </div>
            
            {/* Service Areas */}
            {home.regions && home.regions.length > 0 && (
              <div className="flex items-start gap-2 mb-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Εξυπηρετεί: {home.regions.slice(0, 3).join(', ')}
                  {home.regions.length > 3 && ` + ${home.regions.length - 3} ακόμη`}
                </span>
              </div>
            )}
            
            <div className="flex items-center mb-2">
              <div className="text-yellow-400 flex mr-2">
                {[...Array(5)].map((_, i) => <svg key={i} className={`w-4 h-4 ${i < Math.floor(home.rating) ? 'fill-current' : 'text-gray-300'}`} viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                  </svg>)}
              </div>
              <span className="text-sm text-muted-foreground">({home.reviewCount} κριτικές)</span>
            </div>
            
            <p className="line-clamp-2 text-sm text-muted-foreground mb-4">{home.description}</p>
            
            {/* Services offered */}
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Παρεχόμενες Υπηρεσίες:</h4>
              <div className="flex flex-wrap gap-1">
                {home.services.slice(0, 3).map((service, idx) => <span key={idx} className={`text-xs px-2 py-1 rounded-full ${selectedServices.includes(service) ? 'bg-primary/20 text-primary' : 'bg-secondary text-secondary-foreground'}`}>
                    {service}
                  </span>)}
                {home.services.length > 3 && <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                    +{home.services.length - 3}
                  </span>}
              </div>
            </div>
          </div>
          
          <div className="p-4 md:p-6 bg-secondary flex flex-col">
            <div className="text-center mb-4">
              <p className="text-sm text-muted-foreground mb-1">
                {home.packages && home.packages.length > 0 ? home.packages[0].name : "Βασική Υπηρεσία"} Από
              </p>
              <p className="text-3xl font-semibold text-primary">
                ${getDisplayPrice(home).toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">Συν ΦΠΑ</p>
            </div>
            
            <div className="space-y-2 mb-4">
              {home.services.slice(0, 3).map((service, i) => <div key={i} className="flex items-center text-sm">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {service}
                </div>)}
              {home.services.length > 3 && <p className="text-xs text-muted-foreground">+{home.services.length - 3} επιπλέον υπηρεσίες</p>}
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
    </Card>;
};
export default FuneralHomeCard;
