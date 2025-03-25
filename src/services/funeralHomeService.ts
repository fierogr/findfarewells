
import { FuneralHome } from '@/types/funeralHome';
import { mockFuneralHomes } from '@/data/mockFuneralHomes';
import { createDefaultFuneralHome } from './funeralHomeUtils';

// Function to simulate fetching funeral homes by location
export const getFuneralHomes = (location: string = ""): Promise<FuneralHome[]> => {
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      // In a real app, this would filter based on the location
      // Here we just return all mock data since it's a demo
      resolve(mockFuneralHomes);
    }, 1000);
  });
};

// Function to simulate fetching a single funeral home by ID
export const getFuneralHomeById = (id: string): Promise<FuneralHome | null> => {
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      const home = mockFuneralHomes.find(home => home.id === id) || null;
      resolve(home);
    }, 800);
  });
};

// Function to add a new funeral home to the list
export const addFuneralHome = (funeralHome: FuneralHome): Promise<FuneralHome> => {
  return new Promise((resolve) => {
    // In a real app, this would be an API call to create a new record
    // For our demo, we'll just add it to the mockFuneralHomes array
    
    // Create a complete funeral home object with default values for missing properties
    const completeHome = createDefaultFuneralHome(funeralHome);
    
    // Add the new funeral home to the array
    mockFuneralHomes.push(completeHome);
    
    // Simulate API call delay
    setTimeout(() => {
      resolve(completeHome);
    }, 500);
  });
};
