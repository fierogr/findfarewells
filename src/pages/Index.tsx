
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Index = () => {
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      navigate(`/search?location=${encodeURIComponent(location)}`);
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517164850305-99a3e65bb47e')] bg-cover bg-center opacity-10 z-0"></div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 animate-fadeIn">
              Find Funeral Services Near You
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 animate-fadeIn delay-100">
              Compare funeral homes in your area and find the best options for your needs and budget.
            </p>
            
            <form onSubmit={handleSearch} className="max-w-md mx-auto animate-fadeIn delay-200">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                </div>
                <Input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10 pr-20 py-6 text-lg rounded-full border-2 focus:border-primary"
                  placeholder="Enter city or postal code"
                  required
                />
                <Button 
                  type="submit" 
                  className="absolute right-1 top-1 bottom-1 px-4 rounded-full transition-all duration-300 hover:scale-105"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background rounded-xl p-6 shadow-sm text-center animate-fadeIn delay-100">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-3">Enter Your Location</h3>
              <p className="text-muted-foreground">Enter your city or postal code to find funeral homes in your area.</p>
            </div>
            
            <div className="bg-background rounded-xl p-6 shadow-sm text-center animate-fadeIn delay-200">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-3">Compare Options</h3>
              <p className="text-muted-foreground">View services and pricing from different funeral homes, sorted by price.</p>
            </div>
            
            <div className="bg-background rounded-xl p-6 shadow-sm text-center animate-fadeIn delay-300">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-3">Make Your Choice</h3>
              <p className="text-muted-foreground">Select the funeral home that best meets your needs and budget.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold mb-6 animate-slideUp">Why Choose FindFarewells</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 animate-slideLeft delay-100">
                  <div className="mt-1 bg-primary/10 rounded-full p-1">
                    <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Transparent Pricing</h3>
                    <p className="text-muted-foreground">See clear pricing information from each funeral home in your area.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 animate-slideLeft delay-200">
                  <div className="mt-1 bg-primary/10 rounded-full p-1">
                    <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Save Time & Stress</h3>
                    <p className="text-muted-foreground">Easily compare options without making multiple phone calls during a difficult time.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 animate-slideLeft delay-300">
                  <div className="mt-1 bg-primary/10 rounded-full p-1">
                    <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Verified Reviews</h3>
                    <p className="text-muted-foreground">Read honest reviews from families who have used these services.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 animate-slideLeft delay-400">
                  <div className="mt-1 bg-primary/10 rounded-full p-1">
                    <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Comprehensive Information</h3>
                    <p className="text-muted-foreground">Get detailed information about available services and facilities.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-secondary rounded-2xl rotate-3 z-0"></div>
              <img 
                src="https://images.unsplash.com/photo-1517760444937-f6397edcbbcd" 
                alt="Family Support" 
                className="relative z-10 rounded-xl shadow-lg w-full animate-fadeIn"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">What Families Say</h2>
          
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
                "FindFarewells made a difficult time much easier for our family. We were able to compare options without the pressure of in-person visits."
              </p>
              <div className="font-medium">Sarah K.</div>
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
                "The transparent pricing helped us find a service that honored our mother while staying within our budget. Thank you for this resource."
              </p>
              <div className="font-medium">Michael T.</div>
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
                "I appreciated being able to research options from home. The reviews and detailed information helped us make an informed decision."
              </p>
              <div className="font-medium">Jennifer L.</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
