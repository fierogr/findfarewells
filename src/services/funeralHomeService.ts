
import { FuneralHome } from '@/types/funeralHome';
import { createDefaultFuneralHome } from './funeralHomeUtils';
import { initializeData, saveData } from './storageService';

// Create a reference to our funeral homes that persists between renders
let persistentFuneralHomes = initializeData();

// Function to simulate fetching funeral homes by location
export const getFuneralHomes = (location?: string): Promise<FuneralHome[]> => {
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      // In a real app, this would filter based on the location from the backend
      // Here we return all data since filtering will be done in the useSearchResults hook
      resolve(persistentFuneralHomes);
    }, 1000);
  });
};

// Function to simulate fetching a single funeral home by ID
export const getFuneralHomeById = (id: string): Promise<FuneralHome | null> => {
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      const home = persistentFuneralHomes.find(home => home.id === id) || null;
      resolve(home);
    }, 800);
  });
};

// Function to add a new funeral home to the list
export const addFuneralHome = (funeralHome: FuneralHome): Promise<FuneralHome> => {
  return new Promise((resolve) => {
    // Create a complete funeral home object with default values for missing properties
    const completeHome = createDefaultFuneralHome(funeralHome);
    
    // Add the new funeral home to the array
    persistentFuneralHomes.push(completeHome);
    
    // Save to localStorage
    saveData(persistentFuneralHomes);
    
    // Simulate API call delay
    setTimeout(() => {
      resolve(completeHome);
    }, 500);
  });
};

// Function to update an existing funeral home
export const updateFuneralHome = (id: string, updatedFuneralHome: FuneralHome): Promise<FuneralHome> => {
  return new Promise((resolve, reject) => {
    // Find the index of the funeral home to update
    const index = persistentFuneralHomes.findIndex(home => home.id === id);
    
    if (index === -1) {
      reject(new Error(`Funeral home with ID ${id} not found`));
      return;
    }
    
    // Update the funeral home
    persistentFuneralHomes[index] = updatedFuneralHome;
    
    // Save to localStorage
    saveData(persistentFuneralHomes);
    
    // Simulate API call delay
    setTimeout(() => {
      resolve(updatedFuneralHome);
    }, 500);
  });
};

// Function to delete a funeral home
export const deleteFuneralHome = (id: string): Promise<boolean> => {
  return new Promise((resolve) => {
    // Filter out the funeral home to delete
    persistentFuneralHomes = persistentFuneralHomes.filter(home => home.id !== id);
    
    // Save to localStorage
    saveData(persistentFuneralHomes);
    
    // Simulate API call delay
    setTimeout(() => {
      resolve(true);
    }, 500);
  });
};

// Export distance calculation for backward compatibility
export { calculateDistance } from '@/utils/distanceUtils';
