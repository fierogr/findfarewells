
import React from "react";
import BenefitItem from "./BenefitItem";

const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      title: "Διαφάνεια Τιμών",
      description: "Δείτε ξεκάθαρες πληροφορίες τιμολόγησης από κάθε γραφείο τελετών στην περιοχή σας.",
      delay: 100
    },
    {
      title: "Εξοικονόμηση Χρόνου & Άγχους",
      description: "Συγκρίνετε εύκολα επιλογές χωρίς να κάνετε πολλαπλά τηλεφωνήματα σε μια δύσκολη στιγμή.",
      delay: 200
    },
    {
      title: "Επαληθευμένες Κριτικές",
      description: "Διαβάστε ειλικρινείς κριτικές από οικογένειες που έχουν χρησιμοποιήσει αυτές τις υπηρεσίες.",
      delay: 300
    },
    {
      title: "Ολοκληρωμένες Πληροφορίες",
      description: "Λάβετε λεπτομερείς πληροφορίες σχετικά με τις διαθέσιμες υπηρεσίες και εγκαταστάσεις.",
      delay: 400
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 animate-slideUp">Γιατί να Επιλέξετε την Riprice</h2>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <BenefitItem 
                  key={index}
                  title={benefit.title}
                  description={benefit.description}
                  delay={benefit.delay}
                />
              ))}
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
  );
};

export default BenefitsSection;
