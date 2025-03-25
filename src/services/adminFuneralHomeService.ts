
import { FuneralHome } from '@/types/funeralHome';
import { getFuneralHomes } from './funeralHomeService';

// Helper function to save funeral homes to localStorage
const saveFuneralHomes = (homes: FuneralHome[]) => {
  try {
    localStorage.setItem('funeralHomes', JSON.stringify(homes));
  } catch (error) {
    console.error("Error saving funeral homes to localStorage:", error);
  }
};

// Function to update an existing funeral home
export const updateFuneralHome = (id: string, updates: Partial<FuneralHome>): Promise<FuneralHome | null> => {
  return new Promise(async (resolve) => {
    // Get the current list of funeral homes
    const homes = await getFuneralHomes();
    
    // Find the index of the funeral home to update
    const index = homes.findIndex(home => home.id === id);
    
    if (index === -1) {
      // Funeral home not found
      console.error("Funeral home not found with ID:", id);
      resolve(null);
      return;
    }
    
    console.log("Updating funeral home with ID:", id);
    console.log("Updates to be applied:", updates);
    
    // Critical fix: Ensure regions is properly handled during updates
    // We want to replace the regions array completely with what was passed
    const updatedHome = {
      ...homes[index],
      ...updates,
      // Make sure regions is always an array
      regions: Array.isArray(updates.regions) ? [...updates.regions] : (homes[index].regions || [])
    };
    
    // Replace the old funeral home with the updated one
    homes[index] = updatedHome;
    
    // Save the updated list to localStorage
    saveFuneralHomes(homes);
    
    console.log("Updated funeral home with regions:", updatedHome.regions);
    
    // Simulate API call delay
    setTimeout(() => {
      resolve(updatedHome);
    }, 500);
  });
};

// Function to delete a funeral home
export const deleteFuneralHome = (id: string): Promise<boolean> => {
  return new Promise(async (resolve) => {
    // Get the current list of funeral homes
    const homes = await getFuneralHomes();
    
    // Find the index of the funeral home to delete
    const index = homes.findIndex(home => home.id === id);
    
    if (index === -1) {
      // Funeral home not found
      resolve(false);
      return;
    }
    
    // Remove the funeral home from the array
    homes.splice(index, 1);
    
    // Save the updated list to localStorage
    saveFuneralHomes(homes);
    
    // Simulate API call delay
    setTimeout(() => {
      resolve(true);
    }, 500);
  });
};

// Function to toggle featured status
export const toggleFeaturedStatus = (id: string): Promise<FuneralHome | null> => {
  return new Promise(async (resolve) => {
    // Get the current list of funeral homes
    const homes = await getFuneralHomes();
    
    // Find the index of the funeral home to update
    const index = homes.findIndex(home => home.id === id);
    
    if (index === -1) {
      // Funeral home not found
      resolve(null);
      return;
    }
    
    // Toggle the featured status
    homes[index].featured = !homes[index].featured;
    
    // Save the updated list to localStorage
    saveFuneralHomes(homes);
    
    // Simulate API call delay
    setTimeout(() => {
      resolve(homes[index]);
    }, 300);
  });
};

// Function to get featured funeral homes
export const getFeaturedFuneralHomes = (): Promise<FuneralHome[]> => {
  return new Promise(async (resolve) => {
    // Get the current list of funeral homes
    const homes = await getFuneralHomes();
    
    // Filter for featured funeral homes
    const featuredHomes = homes.filter(home => home.featured);
    
    // Simulate API call delay
    setTimeout(() => {
      resolve(featuredHomes);
    }, 500);
  });
};
