
import React from "react";
import { MapPin } from "lucide-react";

const HowItWorksSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">Πώς Λειτουργεί</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-background rounded-xl p-6 shadow-sm text-center animate-fadeIn delay-100">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-3">Επιλέξτε την Περιοχή σας</h3>
            <p className="text-muted-foreground">Επιλέξτε την γεωγραφική περιοχή και τον νομό σας για να βρείτε γραφεία τελετών που εξυπηρετούν την περιοχή σας.</p>
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
  );
};

export default HowItWorksSection;
