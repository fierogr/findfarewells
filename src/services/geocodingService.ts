
interface GeocodingResult {
  lat: number;
  lng: number;
  formatted_address: string;
}

// In-memory cache to avoid repeated API calls
const geocodeCache: Record<string, GeocodingResult> = {};

// Geocode a location string to coordinates
export const geocodeLocation = async (location: string): Promise<GeocodingResult | null> => {
  // Check cache first
  if (geocodeCache[location]) {
    console.log(`Using cached geocoding result for "${location}"`);
    return geocodeCache[location];
  }

  console.log(`Geocoding location: "${location}"`);
  
  // This is a mock implementation until we integrate with the real Google Maps API
  // In a real application, we would make an API call to Google Maps Geocoding API

  // Mock geocoding data for Greek regions
  const mockGeocodingData: Record<string, GeocodingResult> = {
    'θεσσαλονίκη': { lat: 40.6401, lng: 22.9444, formatted_address: 'Thessaloniki, Greece' },
    'θεσσαλονικη': { lat: 40.6401, lng: 22.9444, formatted_address: 'Thessaloniki, Greece' },
    'σέρρες': { lat: 41.0920, lng: 23.5470, formatted_address: 'Serres, Greece' },
    'σερρες': { lat: 41.0920, lng: 23.5470, formatted_address: 'Serres, Greece' },
    'κιλκίς': { lat: 40.9937, lng: 22.8754, formatted_address: 'Kilkis, Greece' },
    'κιλκις': { lat: 40.9937, lng: 22.8754, formatted_address: 'Kilkis, Greece' },
    'πέλλα': { lat: 40.9557, lng: 22.4587, formatted_address: 'Pella, Greece' },
    'πελλα': { lat: 40.9557, lng: 22.4587, formatted_address: 'Pella, Greece' },
    'ημαθία': { lat: 40.6036, lng: 22.0886, formatted_address: 'Imathia, Greece' },
    'ημαθια': { lat: 40.6036, lng: 22.0886, formatted_address: 'Imathia, Greece' },
    'χαλκιδική': { lat: 40.2444, lng: 23.4989, formatted_address: 'Chalkidiki, Greece' },
    'χαλκιδικη': { lat: 40.2444, lng: 23.4989, formatted_address: 'Chalkidiki, Greece' },
    'βέροια': { lat: 40.5242, lng: 22.2028, formatted_address: 'Veria, Greece' },
    'βεροια': { lat: 40.5242, lng: 22.2028, formatted_address: 'Veria, Greece' },
    'έδεσσα': { lat: 40.8097, lng: 22.0472, formatted_address: 'Edessa, Greece' },
    'εδεσσα': { lat: 40.8097, lng: 22.0472, formatted_address: 'Edessa, Greece' },
    'γιαννιτσά': { lat: 40.7894, lng: 22.4139, formatted_address: 'Giannitsa, Greece' },
    'γιαννιτσα': { lat: 40.7894, lng: 22.4139, formatted_address: 'Giannitsa, Greece' },
    'νάουσα': { lat: 40.6288, lng: 22.0694, formatted_address: 'Naousa, Greece' },
    'ναουσα': { lat: 40.6288, lng: 22.0694, formatted_address: 'Naousa, Greece' },
    'κατερίνη': { lat: 40.2719, lng: 22.5022, formatted_address: 'Katerini, Greece' },
    'κατερινη': { lat: 40.2719, lng: 22.5022, formatted_address: 'Katerini, Greece' },
    'λιτόχωρο': { lat: 40.1028, lng: 22.5028, formatted_address: 'Litochoro, Greece' },
    'λιτοχωρο': { lat: 40.1028, lng: 22.5028, formatted_address: 'Litochoro, Greece' },
    'πολύγυρος': { lat: 40.3811, lng: 23.4428, formatted_address: 'Polygyros, Greece' },
    'πολυγυρος': { lat: 40.3811, lng: 23.4428, formatted_address: 'Polygyros, Greece' },
  };

  // Normalize the location name (remove accents, lowercase)
  const normalizedLocation = location.toLowerCase().trim();
  
  // Find the closest match in our mock data
  let result = null;
  for (const [key, value] of Object.entries(mockGeocodingData)) {
    if (normalizedLocation.includes(key)) {
      result = value;
      break;
    }
  }

  // Add to cache
  if (result) {
    geocodeCache[location] = result;
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return result;
};

// Check if a location is within a distance threshold of any regions
export const isWithinDistance = async (
  searchLocation: string,
  regions: string[],
  maxDistanceKm: number = 50
): Promise<boolean> => {
  console.log(`Checking if "${searchLocation}" is within ${maxDistanceKm}km of regions:`, regions);
  
  // Geocode the search location
  const searchCoords = await geocodeLocation(searchLocation);
  if (!searchCoords) {
    console.log(`Could not geocode search location: "${searchLocation}"`);
    return false;
  }
  
  // Check each region
  for (const region of regions) {
    const regionCoords = await geocodeLocation(region);
    if (!regionCoords) {
      console.log(`Could not geocode region: "${region}"`);
      continue;
    }
    
    // Calculate distance using Haversine formula
    const distance = calculateDistance(
      searchCoords.lat, 
      searchCoords.lng, 
      regionCoords.lat, 
      regionCoords.lng
    );
    
    console.log(`Distance from "${searchLocation}" to "${region}": ${distance.toFixed(2)}km`);
    
    if (distance <= maxDistanceKm) {
      console.log(`"${region}" is within ${maxDistanceKm}km of "${searchLocation}"`);
      return true;
    }
  }
  
  console.log(`No regions within ${maxDistanceKm}km of "${searchLocation}"`);
  return false;
};

// Helper function to calculate distance between two coordinates using Haversine formula
const calculateDistance = (
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
