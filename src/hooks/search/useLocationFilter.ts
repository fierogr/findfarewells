
import { FuneralHome } from "@/types/funeralHome";
import { calculateDistance } from "@/utils/distanceUtils";

// Max distance in kilometers for filtering homes
const MAX_DISTANCE_KM = 50;

// Function to filter homes based on region/location
export const filterHomesByRegion = async (
  homes: FuneralHome[],
  location: string
): Promise<FuneralHome[]> => {
  console.log("Filtering homes for location:", location);
  
  if (!location || location.trim() === '') {
    console.log("No location provided, returning all homes");
    return homes;
  }
  
  const normalizedLocation = location.toLowerCase().trim();
  
  return homes.filter(home => {
    // Direct match check for city, state, or address
    const cityMatch = home.city?.toLowerCase().includes(normalizedLocation);
    const stateMatch = home.state?.toLowerCase().includes(normalizedLocation);
    const addressMatch = home.address?.toLowerCase().includes(normalizedLocation);
    
    // Check regions array
    let regionMatch = false;
    if (home.regions && Array.isArray(home.regions)) {
      regionMatch = home.regions.some(region => 
        region.toLowerCase().includes(normalizedLocation)
      );
    }
    
    const isMatch = cityMatch || stateMatch || addressMatch || regionMatch;
    if (isMatch) {
      console.log(`Match found for "${location}" in home: ${home.name}`);
    }
    
    return isMatch;
  });
};
