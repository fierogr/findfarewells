
import React from "react";
import { MapPin } from "lucide-react";
import { FuneralHome } from "@/types/funeralHome";

interface FuneralHomeInfoProps {
  home: FuneralHome;
}

const FuneralHomeInfo = ({ home }: FuneralHomeInfoProps) => {
  return (
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
  );
};

export default FuneralHomeInfo;
