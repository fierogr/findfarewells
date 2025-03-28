
import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Clock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FuneralHome } from "@/types/funeralHome";
import { useIsMobile } from "@/hooks/use-mobile";

interface FuneralHomeCardProps {
  home: FuneralHome;
  selectedServices: string[];
}

const FuneralHomeCard = ({ home, selectedServices }: FuneralHomeCardProps) => {
  const isMobile = useIsMobile();

  const getDisplayPrice = (home: FuneralHome) => {
    if (home.packages && home.packages.length > 0) {
      return home.packages[0].price;
    }
    return home.basicPrice;
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md rounded-lg border bg-white">
      <CardContent className="p-0">
        <div className="grid grid-cols-12 h-full">
          {/* Provider Logo Section */}
          <div className="col-span-12 md:col-span-3 p-6 flex flex-col justify-center items-center border-r">
            <div className="flex items-center justify-center bg-white p-4 rounded-lg">
              <img 
                src={home.imageUrl || "public/lovable-uploads/7bbe3c02-760b-4f68-a437-53a9926df622.png"} 
                alt={home.name} 
                className="max-h-20 object-contain"
              />
            </div>
            <div className="mt-3 text-center">
              <div className="flex items-center justify-center">
                <div className="text-yellow-400 flex mr-1">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(home.rating) ? 'fill-current' : 'text-gray-300'}`} 
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{home.rating}</span>
              </div>
              <p className="text-xs text-muted-foreground">({home.reviewCount} κριτικές)</p>
            </div>
          </div>
          
          {/* Package Details Section */}
          <div className="col-span-12 md:col-span-9">
            <div className="grid grid-cols-12 h-full">
              {/* Package Column */}
              <div className="col-span-12 md:col-span-8 p-6">
                <h3 className="text-xl font-semibold mb-4 font-roboto">Βασικό πακέτο</h3>
                
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 text-center">
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">ΟΔΙΚΗ ΒΟΗΘΕΙΑ</h4>
                      <div className="flex justify-center">
                        <Check className="check-circle h-6 w-6" />
                      </div>
                      <p className="text-xs mt-2 text-muted-foreground">Περιλαμβάνεται</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 text-center">
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">ΘΡΑΥΣΗ ΚΡΥΣΤΑΛΛΩΝ</h4>
                      <div className="flex justify-center">
                        <Check className="check-circle h-6 w-6" />
                      </div>
                      <p className="text-xs mt-2 text-muted-foreground">Περιλαμβάνεται</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 text-center">
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">ΝΟΜΙΚΗ ΠΡΟΣΤΑΣΙΑ</h4>
                      <div className="flex justify-center">
                        <div className="rounded-full bg-gray-100 p-1">
                          <div className="h-4 w-4 flex items-center justify-center text-gray-400">+</div>
                        </div>
                      </div>
                      <p className="text-xs mt-2 text-muted-foreground">Προσθέστε το από 0.37€ / μήνα</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 text-center">
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">ΠΡΟΣΩΠΙΚΟ ΑΤΥΧΗΜΑ</h4>
                      <div className="flex justify-center">
                        <Check className="check-circle h-6 w-6" />
                      </div>
                      <p className="text-xs mt-2 text-muted-foreground">Περιλαμβάνεται</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Price Column */}
              <div className="col-span-12 md:col-span-4 bg-secondary p-6 flex flex-col items-center justify-center">
                <div className="price-tag text-4xl mb-2">
                  {getDisplayPrice(home).toLocaleString()} €
                </div>
                <p className="text-xs text-muted-foreground mb-6">Συν ΦΠΑ</p>
                
                <div className="space-y-2 w-full">
                  <Button className="w-full bg-[#FF7425] hover:bg-[#e56821] text-white font-medium">
                    Προβολή Λεπτομερειών
                  </Button>
                  
                  <Button variant="outline" className="w-full border-[#FF7425] text-[#FF7425] hover:bg-[#FF7425]/10">
                    Επικοινωνία
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FuneralHomeCard;
