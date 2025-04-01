
import { FuneralHome } from "@/types/funeralHome";

/**
 * Filter homes by the prefecture they serve
 */
export const filterHomesByPrefecture = (homes: any[], prefecture: string | null): any[] => {
  if (!prefecture) {
    return homes;
  }
  
  console.log(`Filtering by prefecture ${prefecture}, homes before filter:`, homes.length);
  
  const filtered = homes.filter(home => {
    // If home.regions is null, convert it to an empty array
    const regions = home.regions || [];
    
    // Check if the home has regions and if the prefecture is included
    const included = Array.isArray(regions) && regions.some(region => {
      // Case-insensitive comparison
      if (typeof region === 'string') {
        return region.toLowerCase() === prefecture.toLowerCase() || 
               region.toLowerCase().includes(prefecture.toLowerCase()) ||
               prefecture.toLowerCase().includes(region.toLowerCase());
      }
      return false;
    });
    
    if (included) {
      console.log(`Home ${home.name} matches prefecture ${prefecture} with regions:`, regions);
    }
    
    return included;
  });
  
  console.log(`Filtered by prefecture ${prefecture}: ${filtered.length} homes match`);
  return filtered;
};

/**
 * Filter homes based on region/location
 */
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
  const filteredHomes: FuneralHome[] = [];
  
  // Check each home for a match
  for (const home of homes) {
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
    
    // Also check if the location appears in the name
    const nameMatch = home.name.toLowerCase().includes(normalizedLocation);
    
    const isMatch = cityMatch || stateMatch || addressMatch || regionMatch || nameMatch;
    
    if (isMatch) {
      console.log(`Match found for "${location}" in home: ${home.name}, regions:`, home.regions);
      filteredHomes.push(home);
    }
  }
  
  console.log(`Found ${filteredHomes.length} matching homes for location: "${location}"`);
  return filteredHomes;
};
