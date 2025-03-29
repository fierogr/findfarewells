
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "@/components/home/HeroSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";

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
      <HeroSection 
        isSearchOpen={isSearchOpen} 
        setIsSearchOpen={setIsSearchOpen} 
        onSearch={handleSearch} 
      />
      <HowItWorksSection />
      <BenefitsSection />
      <TestimonialsSection />
    </div>
  );
};

export default Index;
