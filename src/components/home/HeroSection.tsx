
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
    <section className="relative py-20 md:py-32">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517164850305-99a3e65bb47e')] bg-cover bg-center opacity-10 z-0"></div>
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 animate-fadeIn">
            Βρείτε Υπηρεσίες Κηδείας Κοντά Σας
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 animate-fadeIn delay-100">
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
