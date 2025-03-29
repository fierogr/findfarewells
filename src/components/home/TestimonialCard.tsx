
import React from "react";

interface TestimonialCardProps {
  text: string;
  author: string;
  delay?: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  text, 
  author, 
  delay = 0 
}) => {
  return (
    <div className={`bg-background rounded-xl p-6 shadow-sm animate-fadeIn${delay ? ` delay-${delay}` : ''}`}>
      <div className="flex items-center mb-4">
        <div className="text-yellow-400 flex">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
            </svg>
          ))}
        </div>
      </div>
      <p className="text-muted-foreground mb-4">"{text}"</p>
      <div className="font-medium">{author}</div>
    </div>
  );
};

export default TestimonialCard;
