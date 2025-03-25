
import { FuneralHome } from '@/types/funeralHome';
import { mockFuneralHomes } from '@/data/mockFuneralHomes';
import { createDefaultFuneralHome } from './funeralHomeUtils';

// Initialize the funeral home data from localStorage if available
const initializeFuneralHomes = (): FuneralHome[] => {
  try {
    const storedHomes = localStorage.getItem('funeralHomes');
    if (storedHomes) {
      return JSON.parse(storedHomes);
    }
  } catch (error) {
    console.error("Error loading funeral homes from localStorage:", error);
  }
  
  // If no data in localStorage or error, use mock data and save it
  localStorage.setItem('funeralHomes', JSON.stringify(mockFuneralHomes));
  return [...mockFuneralHomes];
};

// Create a reference to our funeral homes that persists between renders
const persistentFuneralHomes = initializeFuneralHomes();

// Helper function to save funeral homes to localStorage
const saveFuneralHomes = () => {
  try {
    localStorage.setItem('funeralHomes', JSON.stringify(persistentFuneralHomes));
  } catch (error) {
    console.error("Error saving funeral homes to localStorage:", error);
  }
};

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
    saveFuneralHomes();
    
    // Simulate API call delay
    setTimeout(() => {
      resolve(completeHome);
    }, 500);
  });
};

// Function to calculate distance between two points using Haversine formula
export const calculateDistance = (
  lat1: number, 
  lon1: number, 
  lat2: number, 
  lon2: number
): number => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const distance = R * c; // Distance in km
  return distance;
};

function deg2rad(deg: number): number {
  return deg * (Math.PI/180);
}
