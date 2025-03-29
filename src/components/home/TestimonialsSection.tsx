
import React from "react";
import TestimonialCard from "./TestimonialCard";

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      text: "Η Riprice έκανε μια δύσκολη στιγμή πολύ πιο εύκολη για την οικογένειά μας. Μπορέσαμε να συγκρίνουμε επιλογές χωρίς την πίεση των επισκέψεων αυτοπροσώπως.",
      author: "Μαρία Κ.",
      delay: 100
    },
    {
      text: "Η διαφάνεια των τιμών μας βοήθησε να βρούμε μια υπηρεσία που τίμησε τη μητέρα μας παραμένοντας εντός του προϋπολογισμού μας. Ευχαριστούμε για αυτό το εργαλείο.",
      author: "Μιχάλης Τ.",
      delay: 200
    },
    {
      text: "Εκτίμησα τη δυνατότητα να ερευνήσω επιλογές από το σπίτι. Οι κριτικές και οι λεπτομερείς πληροφορίες μας βοήθησαν να πάρουμε μια ενημερωμένη απόφαση.",
      author: "Ελένη Λ.",
      delay: 300
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">Τι Λένε οι Οικογένειες</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              text={testimonial.text}
              author={testimonial.author}
              delay={testimonial.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
