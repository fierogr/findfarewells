
import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { MapPin, Phone, Clock, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { getFuneralHomes } from "@/services/funeralHomeService";
import { FuneralHome } from "@/types/funeralHome";

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = searchParams.get("location") || "";
  const [newLocation, setNewLocation] = useState(location);
  const [funeralHomes, setFuneralHomes] = useState<FuneralHome[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const isMobile = useIsMobile();

  useEffect(() => {
    if (location) {
      fetchFuneralHomes(location);
    } else {
      setLoading(false);
      toast({
        title: "Απαιτείται Τοποθεσία",
        description: "Παρακαλώ εισάγετε μια τοποθεσία για αναζήτηση γραφείων τελετών.",
        variant: "destructive",
      });
    }
  }, [location]);

  const fetchFuneralHomes = async (searchLocation: string) => {
    setLoading(true);
    try {
      const homes = await getFuneralHomes(searchLocation);
      setFuneralHomes(homes);
    } catch (error) {
      console.error("Error fetching funeral homes:", error);
      toast({
        title: "Σφάλμα",
        description: "Αποτυχία φόρτωσης γραφείων τελετών. Παρακαλώ δοκιμάστε ξανά.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (newLocation.trim()) {
      setSearchParams({ location: newLocation });
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const sortedFuneralHomes = [...funeralHomes].sort((a, b) => {
    return sortOrder === "asc" 
      ? a.basicPrice - b.basicPrice 
      : b.basicPrice - a.basicPrice;
  });

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold mb-6 animate-fadeIn">
          Γραφεία Τελετών στην περιοχή {location}
        </h1>
        
        <form onSubmit={handleSearch} className="flex gap-2 mb-8 animate-fadeIn delay-100">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MapPin className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input
              type="text"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              className="pl-10"
              placeholder="Αλλαγή τοποθεσίας"
              required
            />
          </div>
          <Button type="submit">Αναζήτηση</Button>
        </form>
        
        <div className="flex justify-between items-center mb-4 animate-fadeIn delay-200">
          <p className="text-muted-foreground">
            {loading ? "Αναζήτηση..." : `${funeralHomes.length} γραφεία τελετών βρέθηκαν`}
          </p>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={toggleSortOrder}
          >
            Τιμή {sortOrder === "asc" ? "Χαμηλή προς Υψηλή" : "Υψηλή προς Χαμηλή"}
            {sortOrder === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-lg">Φόρτωση γραφείων τελετών...</span>
        </div>
      ) : funeralHomes.length === 0 ? (
        <div className="text-center py-12 bg-secondary rounded-lg animate-fadeIn">
          <p className="text-xl mb-4">Δεν βρέθηκαν γραφεία τελετών σε αυτήν την περιοχή.</p>
          <p className="text-muted-foreground mb-6">Δοκιμάστε να αναζητήσετε σε διαφορετική τοποθεσία ή διευρύνετε την περιοχή αναζήτησής σας.</p>
          <Button onClick={() => history.back()}>Επιστροφή</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 animate-fadeIn delay-300">
          {sortedFuneralHomes.map((home, index) => (
            <Card key={home.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-3 h-full">
                  <div className="relative aspect-video md:aspect-auto">
                    <img 
                      src={home.imageUrl} 
                      alt={home.name} 
                      className="w-full h-full object-cover"
                    />
                    {home.featured && (
                      <div className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">
                        Προτεινόμενο
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 md:p-6 flex flex-col">
                    <h3 className="text-xl font-semibold mb-2">{home.name}</h3>
                    <div className="flex items-start gap-2 mb-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>{home.address}</span>
                    </div>
                    <div className="flex items-start gap-2 mb-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>{home.phone}</span>
                    </div>
                    <div className="flex items-start gap-2 mb-4 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>{home.hours}</span>
                    </div>
                    
                    <div className="flex items-center mb-2">
                      <div className="text-yellow-400 flex mr-2">
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
                      <span className="text-sm text-muted-foreground">({home.reviewCount} κριτικές)</span>
                    </div>
                    
                    <p className="line-clamp-2 text-sm text-muted-foreground mb-4">{home.description}</p>
                    
                    {!isMobile && (
                      <div className="mt-auto">
                        <Link to={`/funeral-home/${home.id}`}>
                          <Button variant="outline" className="w-full">Προβολή Λεπτομερειών</Button>
                        </Link>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 md:p-6 bg-secondary flex flex-col">
                    <div className="text-center mb-4">
                      <p className="text-sm text-muted-foreground mb-1">Βασική Υπηρεσία Από</p>
                      <p className="text-3xl font-semibold text-primary">${home.basicPrice.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Συν ΦΠΑ</p>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      {home.services.slice(0, 3).map((service, i) => (
                        <div key={i} className="flex items-center text-sm">
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {service}
                        </div>
                      ))}
                      {home.services.length > 3 && (
                        <p className="text-xs text-muted-foreground">+{home.services.length - 3} επιπλέον υπηρεσίες</p>
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
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
