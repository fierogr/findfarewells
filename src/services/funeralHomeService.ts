
import { FuneralHome } from '@/types/funeralHome';
import { createDefaultFuneralHome } from './funeralHomeUtils';
import { supabase } from '@/integrations/supabase/client';

// Function to simulate fetching funeral homes by location
export const getFuneralHomes = async (location?: string): Promise<FuneralHome[]> => {
  try {
    const { data, error } = await supabase
      .from('partners')
      .select('*');
    
    if (error) {
      console.error('Error fetching funeral homes:', error);
      throw error;
    }
    
    // Transform database records to FuneralHome objects
    const homes = data.map(transformPartnerToFuneralHome);
    console.log(`Fetched ${homes.length} funeral homes from Supabase`);
    return homes;
  } catch (error) {
    console.error('Error in getFuneralHomes:', error);
    return [];
  }
};

// Function to fetch a single funeral home by ID
export const getFuneralHomeById = async (id: string): Promise<FuneralHome | null> => {
  try {
    // Convert string ID to number if the ID is numeric
    const numericId = parseInt(id, 10);
    
    if (isNaN(numericId)) {
      console.error('Invalid ID format:', id);
      return null;
    }
    
    const { data, error } = await supabase
      .from('partners')
      .select('*')
      .eq('id', numericId)
      .single();
    
    if (error) {
      console.error('Error fetching funeral home by ID:', error);
      return null;
    }
    
    return transformPartnerToFuneralHome(data);
  } catch (error) {
    console.error('Error in getFuneralHomeById:', error);
    return null;
  }
};

// Function to add a new funeral home
export const addFuneralHome = async (funeralHome: FuneralHome): Promise<FuneralHome> => {
  try {
    // Create a complete funeral home object with default values for missing properties
    const completeHome = createDefaultFuneralHome(funeralHome);
    
    // Transform to partner DB structure, but without the id field
    // Let Supabase generate a numeric ID
    const partnerData = transformFuneralHomeToPartner(completeHome);
    delete partnerData.id; // Remove string ID to let Supabase generate a numeric ID
    
    const { data, error } = await supabase
      .from('partners')
      .insert(partnerData)
      .select()
      .single();
    
    if (error) {
      console.error('Error adding funeral home:', error);
      throw error;
    }
    
    console.log('Successfully added funeral home to Supabase:', data.id);
    return transformPartnerToFuneralHome(data);
  } catch (error) {
    console.error('Error in addFuneralHome:', error);
    throw error;
  }
};

// Function to update an existing funeral home
export const updateFuneralHome = async (id: string, updatedFuneralHome: FuneralHome): Promise<FuneralHome> => {
  try {
    // Convert string ID to number
    const numericId = parseInt(id, 10);
    
    if (isNaN(numericId)) {
      throw new Error(`Invalid ID format: ${id}`);
    }
    
    const partnerData = transformFuneralHomeToPartner(updatedFuneralHome);
    delete partnerData.id; // Remove ID from update data
    
    const { data, error } = await supabase
      .from('partners')
      .update(partnerData)
      .eq('id', numericId)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating funeral home:', error);
      throw error;
    }
    
    console.log('Successfully updated funeral home in Supabase:', data.id);
    return transformPartnerToFuneralHome(data);
  } catch (error) {
    console.error('Error in updateFuneralHome:', error);
    throw error;
  }
};

// Function to delete a funeral home
export const deleteFuneralHome = async (id: string): Promise<boolean> => {
  try {
    // Convert string ID to number
    const numericId = parseInt(id, 10);
    
    if (isNaN(numericId)) {
      throw new Error(`Invalid ID format: ${id}`);
    }
    
    const { error } = await supabase
      .from('partners')
      .delete()
      .eq('id', numericId);
    
    if (error) {
      console.error('Error deleting funeral home:', error);
      throw error;
    }
    
    console.log('Successfully deleted funeral home from Supabase:', id);
    return true;
  } catch (error) {
    console.error('Error in deleteFuneralHome:', error);
    return false;
  }
};

// Helper function to transform a Supabase partner record to a FuneralHome object
const transformPartnerToFuneralHome = (partner: any): FuneralHome => {
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
    rating: 0,
    reviewCount: 0,
    services: Array.isArray(partner.services) ? partner.services : [],
    amenities: [],
    basicPrice: 0,
    featured: partner.featured || false,
    packages: Array.isArray(partner.packages) ? partner.packages : [],
    additionalServices: [],
    reviews: [],
    regions: Array.isArray(partner.regions) ? partner.regions : []
  };
};

// Helper function to transform a FuneralHome object to a Supabase partner record
const transformFuneralHomeToPartner = (home: FuneralHome): any => {
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
    featured: home.featured,
    regions: home.regions,
    packages: home.packages
  };
};

// Export distance calculation for backward compatibility
export { calculateDistance } from '@/utils/distanceUtils';
