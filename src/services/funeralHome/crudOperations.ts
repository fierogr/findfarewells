
import { FuneralHome } from '@/types/funeralHome';
import { supabase } from '@/integrations/supabase/client';
import { transformPartnerToFuneralHome, transformFuneralHomeToPartner } from './transformUtils';
import { createDefaultFuneralHome } from '../funeralHomeUtils';

// Function to fetch funeral homes
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
