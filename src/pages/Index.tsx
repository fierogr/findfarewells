
import React, { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import RegionSearchDialog from "@/components/search/RegionSearchDialog";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (formData: { location: string; prefecture: string | null; services: string[] }) => {
    console.log("Search initiated with data:", formData);
    
    // Construct URL parameters
    const params = new URLSearchParams();
    
    if (formData.location) {
      params.set("location", formData.location);
    }
    
    if (formData.prefecture) {
      params.set("prefecture", formData.prefecture);
    }
    
    if (formData.services.length > 0) {
      params.set("services", formData.services.join(','));
    }
    
    // Navigate to search results with parameters
    const searchUrl = `/search?${params.toString()}`;
    console.log("Navigating to:", searchUrl);
    navigate(searchUrl);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
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
              onSearch={handleSearch}
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">Πώς Λειτουργεί</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background rounded-xl p-6 shadow-sm text-center animate-fadeIn delay-100">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-3">Επιλέξτε την Περιοχή σας</h3>
              <p className="text-muted-foreground">Επιλέξτε την γεωγραφική περιοχή και τον νομό σας για να ��ρείτε γραφεία τελετών που εξυπηρετούν την περιοχή σας.</p>
            </div>
            
            <div className="bg-background rounded-xl p-6 shadow-sm text-center animate-fadeIn delay-200">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-3">Συγκρίνετε Επιλογές</h3>
              <p className="text-muted-foreground">Δείτε υπηρεσίες και τιμές από διαφορετικά γραφεία τελετών, ταξινομημένα κατά τιμή.</p>
            </div>
            
            <div className="bg-background rounded-xl p-6 shadow-sm text-center animate-fadeIn delay-300">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-3">Κάντε την Επιλογή σας</h3>
              <p className="text-muted-foreground">Επιλέξτε το γραφείο τελετών που ανταποκρίνεται καλύτερα στις ανάγκες και τον προϋπολογισμό σας.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold mb-6 animate-slideUp">Γιατί να Επιλέξετε την Riprice</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 animate-slideLeft delay-100">
                  <div className="mt-1 bg-primary/10 rounded-full p-1">
                    <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Διαφάνεια Τιμών</h3>
                    <p className="text-muted-foreground">Δείτε ξεκάθαρες πληροφορίες τιμολόγησης από κάθε γραφείο τελετών στην περιοχή σας.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 animate-slideLeft delay-200">
                  <div className="mt-1 bg-primary/10 rounded-full p-1">
                    <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Εξοικονόμηση Χρόνου & Άγχους</h3>
                    <p className="text-muted-foreground">Συγκρίνετε εύκολα επιλογές χωρίς να κάνετε πολλαπλά τηλεφωνήματα σε μια δύσκολη στιγμή.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 animate-slideLeft delay-300">
                  <div className="mt-1 bg-primary/10 rounded-full p-1">
                    <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Επαληθευμένες Κριτικές</h3>
                    <p className="text-muted-foreground">Διαβάστε ειλικρινείς κριτικές από οικογένειες που έχουν χρησιμοποιήσει αυτές τις υπηρεσίες.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 animate-slideLeft delay-400">
                  <div className="mt-1 bg-primary/10 rounded-full p-1">
                    <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Ολοκληρωμένες Πληροφορίες</h3>
                    <p className="text-muted-foreground">Λάβετε λεπτομερείς πληροφορίες σχετικά με τις διαθέσιμες υπηρεσίες και εγκαταστάσεις.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-secondary rounded-2xl rotate-3 z-0"></div>
              <img 
                src="https://images.unsplash.com/photo-1517760444937-f6397edcbbcd" 
                alt="Οικογενειακή Υποστήριξη" 
                className="relative z-10 rounded-xl shadow-lg w-full animate-fadeIn"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">Τι Λένε οι Οικογένειες</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-background rounded-xl p-6 shadow-sm animate-fadeIn">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                "Η Riprice έκανε μια δύσκολη στιγμή πολύ πιο εύκολη για την οικογένειά μας. Μπορέσαμε να συγκρίνουμε επιλογές χωρίς την πίεση των επισκέψεων αυτοπροσώπως."
              </p>
              <div className="font-medium">Μαρία Κ.</div>
            </div>
            
            <div className="bg-background rounded-xl p-6 shadow-sm animate-fadeIn delay-100">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                "Η διαφάνεια των τιμών μας βοήθησε να βρούμε μια υπηρεσία που τίμησε τη μητέρα μας παραμένοντας εντός του προϋπολογισμού μας. Ευχαριστούμε για αυτό το εργαλείο."
              </p>
              <div className="font-medium">Μιχάλης Τ.</div>
            </div>
            
            <div className="bg-background rounded-xl p-6 shadow-sm animate-fadeIn delay-200">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                "Εκτίμησα τη δυνατότητα να ερευνήσω επιλογές από το σπίτι. Οι κριτικές και οι λεπτομερείς πληροφορίες μας βοήθησαν να πάρουμε μια ενημερωμένη απόφαση."
              </p>
              <div className="font-medium">Ελένη Λ.</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
