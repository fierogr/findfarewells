
import { FuneralHome } from "@/types/funeralHome";
import { calculateDistance } from "@/utils/distanceUtils";

// Max distance in kilometers for filtering homes
const MAX_DISTANCE_KM = 50;

// Function to filter homes based on region/location
export const filterHomesByRegion = async (
  homes: FuneralHome[],
  location: string
): Promise<FuneralHome[]> => {
  console.log("Filtering homes for region:", location);
  
  // For the demo, we'll use a simple filtering approach based on city or region match
  return homes.filter(home => {
    // Check for direct match in city or state
    if (
      home.city.toLowerCase().includes(location.toLowerCase()) ||
      home.state.toLowerCase().includes(location.toLowerCase())
    ) {
      return true;
    }
    
    // Check if the home has regions list and the location is in one of them
    if (home.regions && Array.isArray(home.regions)) {
      return home.regions.some(region => 
        region.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    return false;
  });
};

