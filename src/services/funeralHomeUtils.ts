
import { FuneralHome } from '@/types/funeralHome';

// Utility function to create default values for a new funeral home
export const createDefaultFuneralHome = (partialHome: Partial<FuneralHome>): FuneralHome => {
  return {
    id: partialHome.id || crypto.randomUUID(),
    name: partialHome.name || "",
    address: partialHome.address || "",
    city: partialHome.city || "",
    state: partialHome.state || "",
    zip: partialHome.zip || "",
    phone: partialHome.phone || "",
    email: partialHome.email || "",
    website: partialHome.website || "",
    hours: partialHome.hours || "Mon-Fri: 9am-5pm, Sat: 10am-2pm, Sun: Closed",
    description: partialHome.description || "",
    about: partialHome.about || "",
    imageUrl: partialHome.imageUrl || "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80",
    coverImageUrl: partialHome.coverImageUrl || "https://images.unsplash.com/photo-1468779065891-103dac4a7c48",
    rating: partialHome.rating || 0,
    reviewCount: partialHome.reviewCount || 0,
    services: partialHome.services || [],
    amenities: partialHome.amenities || [],
    basicPrice: partialHome.basicPrice || 0,
    featured: partialHome.featured || false,
    packages: partialHome.packages || [],
    additionalServices: partialHome.additionalServices || [],
    reviews: partialHome.reviews || []
  };
};
