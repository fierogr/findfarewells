
import { FuneralHome, ServicePackage } from '@/types/funeralHome';

// Helper function to transform a Supabase partner record to a FuneralHome object
export const transformPartnerToFuneralHome = (partner: any): FuneralHome => {
  return {
    id: partner.id.toString(), // Convert numeric ID to string
    name: partner.name || '',
    address: partner.address || '',
    city: partner.city || '',
    state: partner.state || '',
    zip: partner.zip || '',
    phone: partner.phone || partner.telephone || '',
    email: partner.email || '',
    website: partner.website || '',
    hours: "Mon-Fri: 9am-5pm, Sat: 10am-2pm, Sun: Closed", // Default value
    description: partner.description || '',
    about: partner.description || '',
    imageUrl: partner.image_url || "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80",
    coverImageUrl: "https://images.unsplash.com/photo-1468779065891-103dac4a7c48",
    rating: 0, // Default value instead of using partner.rating
    reviewCount: 0, // Default value instead of using partner.review_count
    services: Array.isArray(partner.services) ? partner.services : [],
    amenities: [],
    basicPrice: partner.packages && partner.packages.length > 0 ? 
      partner.packages[0].price : 0, // Derive from packages instead of database field
    featured: partner.featured || false,
    packages: Array.isArray(partner.packages) ? partner.packages : [],
    additionalServices: [],
    reviews: [],
    regions: Array.isArray(partner.regions) ? partner.regions : []
  };
};

// Helper function to transform a FuneralHome object to a Supabase partner record
export const transformFuneralHomeToPartner = (home: FuneralHome): any => {
  // Don't try to convert the ID to number here, handle it separately in each function
  return {
    id: home.id, // This will be handled in add/update functions
    name: home.name,
    address: home.address,
    city: home.city,
    state: home.state,
    zip: home.zip,
    phone: home.phone,
    email: home.email,
    website: home.website,
    description: home.description,
    services: home.services,
    image_url: home.imageUrl,
    // Removed rating and review_count as they don't exist in the database
    featured: home.featured,
    regions: home.regions,
    packages: home.packages
    // Removed basic_price field as it doesn't exist in the database
  };
};
