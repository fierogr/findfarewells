
import { FuneralHome } from '@/types/funeralHome';

// Transform a database partner record to a FuneralHome object
export const transformPartnerToFuneralHome = (partnerRecord: any): FuneralHome => {
  console.log("Transforming partner record with regions:", partnerRecord.regions);
  
  // Ensure image URL is handled properly
  let imageUrl = partnerRecord.image_url || '';
  
  // Make sure we have a valid URL or use a default
  if (!imageUrl || imageUrl.trim() === '') {
    imageUrl = 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80';
  }
  
  return {
    id: partnerRecord.id.toString(),
    name: partnerRecord.name || partnerRecord.business_name || '',
    address: partnerRecord.address || '',
    city: partnerRecord.city || '',
    state: partnerRecord.state || '',
    zip: partnerRecord.zip || '',
    phone: partnerRecord.phone || partnerRecord.telephone || '',
    email: partnerRecord.email || '',
    description: partnerRecord.description || '',
    services: Array.isArray(partnerRecord.services) ? partnerRecord.services : [],
    website: partnerRecord.website || '',
    hours: '',
    about: '',
    rating: 0,
    reviewCount: 0,
    imageUrl: imageUrl,
    basicPrice: 0,
    featured: partnerRecord.featured || false,
    amenities: [],
    packages: Array.isArray(partnerRecord.packages) ? partnerRecord.packages : [],
    additionalServices: [],
    reviews: [],
    regions: Array.isArray(partnerRecord.regions) ? partnerRecord.regions : [],
  };
};

// Transform a FuneralHome object to a database partner record
export const transformFuneralHomeToPartner = (funeralHome: FuneralHome): any => {
  console.log("Transforming FuneralHome to partner with regions:", funeralHome.regions);
  
  return {
    id: parseInt(funeralHome.id, 10),
    name: funeralHome.name,
    business_name: funeralHome.name,
    address: funeralHome.address,
    city: funeralHome.city,
    state: funeralHome.state,
    zip: funeralHome.zip,
    phone: funeralHome.phone,
    telephone: funeralHome.phone,
    email: funeralHome.email,
    website: funeralHome.website,
    description: funeralHome.description,
    services: funeralHome.services,
    image_url: funeralHome.imageUrl,
    featured: funeralHome.featured,
    packages: funeralHome.packages,
    regions: Array.isArray(funeralHome.regions) ? funeralHome.regions : [],
  };
};
