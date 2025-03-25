
import { FuneralHome } from "@/types/funeralHome";
import { 
  getFuneralHomeById, 
  updateFuneralHome as updateHome, 
  deleteFuneralHome as deleteHome 
} from "./funeralHomeService";

// Export the functions from funeralHomeService with admin-specific names for clarity
export const getFuneralHomeForAdmin = getFuneralHomeById;
export const updateFuneralHome = updateHome;
export const deleteFuneralHome = deleteHome;

export const uploadPartnerImage = async (file: File): Promise<string> => {
  // In a real app, this would upload the file to a storage service
  // For this demo, we'll simulate it with a delay and return a placeholder URL
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80");
    }, 1000);
  });
};
