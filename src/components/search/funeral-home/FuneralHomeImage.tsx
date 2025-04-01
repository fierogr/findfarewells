
import React, { useState } from "react";
import { FuneralHome, ServicePackage } from "@/types/funeralHome";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface FuneralHomeImageProps {
  home: FuneralHome;
  packageToShow: ServicePackage | null;
}

const FuneralHomeImage = ({ home, packageToShow }: FuneralHomeImageProps) => {
  const [imageError, setImageError] = useState(false);
  
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
  );
};

export default FuneralHomeImage;
