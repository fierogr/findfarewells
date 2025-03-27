import { FuneralHome } from '@/types/funeralHome';
import { getFuneralHomes, addFuneralHome } from './funeralHomeService';

const STORAGE_KEY = 'funeralHomes';

// Initialize the funeral home data from Supabase
export const initializeData = async (): Promise<FuneralHome[]> => {
  try {
    // Get data from Supabase
    const homes = await getFuneralHomes();
    console.log("Initialized with data from Supabase:", homes.length);
    return homes;
  } catch (error) {
    console.error("Error loading funeral homes from Supabase:", error);
    return [];
  }
};

// This function is now essentially a pass-through to keep backward compatibility
export const saveData = async (data: FuneralHome[]): Promise<void> => {
  console.log("Note: Data is now saved to Supabase directly, not localStorage");
  // This function is kept for backward compatibility
};
