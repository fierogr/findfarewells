
import { FuneralHome } from "@/types/funeralHome";
import { calculateDistance } from "@/services/funeralHomeService";
import { geocodeLocation } from "@/services/geocodingService";

// Filter homes by region and location
export const filterHomesByRegion = async (homes: FuneralHome[], searchLocation: string): Promise<FuneralHome[]> => {
  const normalizedLocation = searchLocation.toLowerCase().trim();
  console.log("Searching for location:", normalizedLocation);
  
  const regionKeywords: Record<string, string[]> = {
    'θεσσαλονικη': ['Νομός Θεσσαλονίκης', 'θεσσαλονίκη', 'θεσσαλονικη'],
    'σερρες': ['Νομός Σερρών', 'σέρρες', 'σερρες'],
    'κιλκις': ['Νομός Κιλκίς', 'κιλκίς', 'κιλκις'],
    'πελλα': ['Νομός Πέλλας', 'πέλλα', 'πελλα'],
    'ημαθια': ['Νομός Ημαθίας', 'ημαθία', 'ημαθια'],
    'χαλκιδικη': ['Νομός Χαλκιδικής', 'χαλκιδική', 'χαλκιδικη']
  };
  
  let matchedRegionVariants: string[] = [];
  
  for (const [keyword, variants] of Object.entries(regionKeywords)) {
    if (normalizedLocation.includes(keyword)) {
      matchedRegionVariants = variants;
      console.log("Matched region variants:", matchedRegionVariants);
      break;
    }
  }
  
  const exactMatches = homes.filter(home => {
    const homeRegions = Array.isArray(home.regions) ? home.regions : [];
    
    if (matchedRegionVariants.length > 0) {
      const regionMatch = homeRegions.some(region => 
        matchedRegionVariants.some(variant => 
          region.toLowerCase().includes(variant.toLowerCase())
        )
      );
      
      const stateMatch = matchedRegionVariants.some(variant => 
        home.state.toLowerCase().includes(variant.toLowerCase())
      );
      
      return regionMatch || stateMatch;
    }
    
    return (
      home.city.toLowerCase().includes(normalizedLocation) || 
      home.state.toLowerCase().includes(normalizedLocation) || 
      home.address.toLowerCase().includes(normalizedLocation) ||
      homeRegions.some(region => 
        region.toLowerCase().includes(normalizedLocation)
      )
    );
  });
  
  let distanceFilteredExactMatches: FuneralHome[] = [];
  if (exactMatches.length > 0) {
    const searchCoords = await geocodeLocation(searchLocation);
    if (searchCoords) {
      for (const home of exactMatches) {
        const homeRegions = Array.isArray(home.regions) ? home.regions : [];
        if (homeRegions.length === 0) continue;
        
        let isWithin50km = false;
        for (const region of homeRegions) {
          const regionCoords = await geocodeLocation(region);
          if (!regionCoords) continue;
          
          const distance = calculateDistance(
            searchCoords.lat,
            searchCoords.lng,
            regionCoords.lat,
            regionCoords.lng
          );
          
          console.log(`Distance from "${searchLocation}" to "${region}": ${distance.toFixed(2)}km`);
          
          if (distance <= 50) {
            isWithin50km = true;
            break;
          }
        }
        
        if (isWithin50km) {
          distanceFilteredExactMatches.push(home);
        }
      }
      
      return distanceFilteredExactMatches;
    }
  }
  
  const proximityMatches = await Promise.all(
    homes.map(async home => {
      const homeRegions = Array.isArray(home.regions) ? home.regions : [];
      
      if (homeRegions.length === 0) {
        return { home, withinDistance: false };
      }
      
      const withinDistance = await isWithinDistance(searchLocation, homeRegions, 50);
      
      return { home, withinDistance };
    })
  );
  
  return proximityMatches
    .filter(result => result.withinDistance)
    .map(result => result.home);
};

// Check if a location is within a distance threshold of any regions
export const isWithinDistance = async (
  searchLocation: string,
  regions: string[],
  maxDistanceKm: number = 50
): Promise<boolean> => {
  const searchCoords = await geocodeLocation(searchLocation);
  if (!searchCoords) {
    return false;
  }
  
  for (const region of regions) {
    const regionCoords = await geocodeLocation(region);
    if (!regionCoords) continue;
    
    const distance = calculateDistance(
      searchCoords.lat, 
      searchCoords.lng, 
      regionCoords.lat, 
      regionCoords.lng
    );
    
    if (distance <= maxDistanceKm) {
      return true;
    }
  }
  
  return false;
};
