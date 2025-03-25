
import { FuneralHome } from '@/types/funeralHome';
import { mockFuneralHomes } from '@/data/mockFuneralHomes';

const STORAGE_KEY = 'funeralHomes';

// Initialize the funeral home data from localStorage if available
export const initializeData = (): FuneralHome[] => {
  try {
    const storedHomes = localStorage.getItem(STORAGE_KEY);
    if (storedHomes) {
      console.log("Found stored funeral homes in localStorage:", JSON.parse(storedHomes).length);
      return JSON.parse(storedHomes);
    }
  } catch (error) {
    console.error("Error loading funeral homes from localStorage:", error);
  }
  
  // If no data in localStorage or error, use mock data and save it
  console.log("No stored homes found, initializing with mock data");
  const initialData = [...mockFuneralHomes];
  saveData(initialData);
  return initialData;
};

// Helper function to save funeral homes to localStorage
export const saveData = (data: FuneralHome[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    console.log("Saved funeral homes to localStorage:", data.length);
  } catch (error) {
    console.error("Error saving funeral homes to localStorage:", error);
  }
};
