
import React from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import RegionSearchDialog from "@/components/search/RegionSearchDialog";

interface HeroSectionProps {
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  onSearch: (formData: { location: string; prefecture: string | null; services: string[] }) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  isSearchOpen, 
  setIsSearchOpen, 
  onSearch 
}) => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <iframe 
          className="w-full h-full absolute object-cover"
          src="https://www.youtube.com/embed/k7V4uPri-Tk?autoplay=1&mute=1&loop=1&playlist=k7V4uPri-Tk&controls=0&showinfo=0&rel=0&modestbranding=1&enablejsapi=1"
          title="Background Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ 
            width: '100%', 
            height: '150%', // Increased height to eliminate black bars
            objectFit: 'cover', 
            pointerEvents: 'none',
            position: 'absolute',
            top: '-25%', // Adjust vertical position to center the video
            left: 0
          }}
        ></iframe>
      </div>
      
      <div className="container relative z-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 animate-fadeIn text-white">
            Βρείτε Υπηρεσίες Κηδείας Κοντά Σας
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-10 animate-fadeIn delay-100">
            Συγκρίνετε γραφεία τελετών στην περιοχή σας και βρείτε τις καλύτερες επιλογές για τις ανάγκες και τον προϋπολογισμό σας.
          </p>
          
          <div className="flex justify-center animate-fadeIn delay-200">
            <Button 
              onClick={() => setIsSearchOpen(true)}
              size="lg" 
              className="px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-md"
            >
              <Search className="mr-2 h-5 w-5" />
              Αναζήτηση Γραφείων Τελετών
            </Button>
          </div>
          
          {/* Search Dialog */}
          <RegionSearchDialog 
            open={isSearchOpen} 
            onOpenChange={setIsSearchOpen}
            onSearch={onSearch}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
