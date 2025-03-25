import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { MapPin, Phone, Clock, ChevronDown, ChevronUp, Loader2, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { getFuneralHomes } from "@/services/funeralHomeService";
import { FuneralHome } from "@/types/funeralHome";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

// Greek services for filtering
const commonServices = [
  "Βασικό πακέτο",
  "Αποτέφρωση",
  "Έξτρα στολισμός", 
  "Φαγητό",
  "Μουσική"
];

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = searchParams.get("location") || "";
  const [newLocation, setNewLocation] = useState(location);
  const [funeralHomes, setFuneralHomes] = useState<FuneralHome[]>([]);
  const [filteredHomes, setFilteredHomes] = useState<FuneralHome[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
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

  useEffect(() => {
    if (selectedServices.length === 0) {
      setFilteredHomes(funeralHomes);
    } else {
      const filtered = funeralHomes.filter(home => 
        selectedServices.every(service => 
          home.services.some(homeService => 
            homeService.toLowerCase().includes(service.toLowerCase())
          )
        )
      );
      setFilteredHomes(filtered);
    }
  }, [selectedServices, funeralHomes]);

  const fetchFuneralHomes = async (searchLocation: string) => {
    setLoading(true);
    try {
      const homes = await getFuneralHomes(searchLocation);
      setFuneralHomes(homes);
      setFilteredHomes(homes);
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

  const toggleServiceSelection = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const clearFilters = () => {
    setSelectedServices([]);
  };

  const getDisplayPrice = (home: FuneralHome) => {
    if (home.packages && home.packages.length > 0) {
      return home.packages[0].price;
    }
    return home.basicPrice;
  };

  const sortedFuneralHomes = [...filteredHomes].sort((a, b) => {
    const priceA = getDisplayPrice(a);
    const priceB = getDisplayPrice(b);
    return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
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
          <div className="flex items-center gap-2">
            <p className="text-muted-foreground">
              {loading 
                ? "Αναζήτηση..." 
                : `${filteredHomes.length} από ${funeralHomes.length} γραφεία τελετών`}
            </p>
            {selectedServices.length > 0 && (
              <div className="flex items-center">
                <Separator orientation="vertical" className="h-4 mx-2" />
                <p className="text-sm text-primary">
                  {selectedServices.length} φίλτρα ενεργά
                </p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters} 
                  className="text-xs ml-1 h-auto py-1"
                >
                  Καθαρισμός
                </Button>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Φίλτρα
                  {selectedServices.length > 0 && (
                    <span className="ml-1 text-xs bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center">
                      {selectedServices.length}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[300px] sm:w-[450px]">
                <SheetHeader>
                  <SheetTitle>Φίλτρα Υπηρεσιών</SheetTitle>
                  <SheetDescription>
                    Επιλέξτε τις υπηρεσίες που σας ενδιαφέρουν
                  </SheetDescription>
                </SheetHeader>
                <Separator className="my-4" />
                <div className="grid grid-cols-1 gap-4 my-4">
                  <div className="space-y-4">
                    <h3 className="font-medium">Υπηρεσίες</h3>
                    {commonServices.map((service) => (
                      <div key={service} className="flex items-start space-x-2">
                        <Checkbox 
                          id={`service-${service}`}
                          checked={selectedServices.includes(service)}
                          onCheckedChange={() => toggleServiceSelection(service)}
                        />
                        <label
                          htmlFor={`service-${service}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {service}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={clearFilters}>
                    Καθαρισμός
                  </Button>
                  <Button onClick={() => setIsFilterOpen(false)}>
                    Εφαρμογή
                  </Button>
                </div>
              </SheetContent>
            </Sheet>

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
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-lg">Φόρτωση γραφείων τελετών...</span>
        </div>
      ) : filteredHomes.length === 0 ? (
        <div className="text-center py-12 bg-secondary rounded-lg animate-fadeIn">
          <p className="text-xl mb-4">Δεν βρέθηκαν γραφεία τελετών με τις επιλεγμένες υπηρεσίες.</p>
          <p className="text-muted-foreground mb-6">Δοκιμάστε να αλλάξετε τα φίλτρα ή να αναζητήσετε σε διαφορετική τοποθεσία.</p>
          <Button onClick={clearFilters}>Καθαρισμός Φίλτρων</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 animate-fadeIn delay-300">
          {sortedFuneralHomes.map((home) => (
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
                    
                    {/* Service tags */}
                    <div className="mt-auto mb-4">
                      <div className="flex flex-wrap gap-1">
                        {home.services.slice(0, 3).map((service, idx) => (
                          <span 
                            key={idx}
                            className={`text-xs px-2 py-1 rounded-full ${
                              selectedServices.includes(service) 
                                ? 'bg-primary/20 text-primary' 
                                : 'bg-secondary text-secondary-foreground'
                            }`}
                          >
                            {service}
                          </span>
                        ))}
                        {home.services.length > 3 && (
                          <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                            +{home.services.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                    
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
                      <p className="text-sm text-muted-foreground mb-1">
                        {home.packages && home.packages.length > 0 ? home.packages[0].name : "Βασική Υπηρεσία"} Από
                      </p>
                      <p className="text-3xl font-semibold text-primary">
                        ${getDisplayPrice(home).toLocaleString()}
                      </p>
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

