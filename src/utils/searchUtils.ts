
import { toast } from "@/components/ui/use-toast";

// Greek prefectures
export const GREEK_PREFECTURES = [
  "Νομός Θεσσαλονίκης",
  "Νομός Σερρών",
  "Νομός Κιλκίς",
  "Νομός Πέλλας",
  "Νομός Ημαθίας",
  "Νομός Χαλκιδικής",
  "Νομός Πιερίας",
  "Νομός Αττικής",
  "Νομός Ευβοίας",
  "Νομός Βοιωτίας",
  "Νομός Φθιώτιδας"
];

// Map of cities/areas to their prefecture
const LOCATION_TO_PREFECTURE: Record<string, string> = {
  // Thessaloniki areas
  "θεσσαλονίκη": "Νομός Θεσσαλονίκης",
  "thessaloniki": "Νομός Θεσσαλονίκης",
  "θεσσαλονικη": "Νομός Θεσσαλονίκης",
  "περαία": "Νομός Θεσσαλονίκης",
  "peraia": "Νομός Θεσσαλονίκης",
  "περαια": "Νομός Θεσσαλονίκης",
  "καλαμαριά": "Νομός Θεσσαλονίκης",
  "kalamaria": "Νομός Θεσσαλονίκης",
  "καλαμαρια": "Νομός Θεσσαλονίκης",
  "πυλαία": "Νομός Θεσσαλονίκης",
  "pylaia": "Νομός Θεσσαλονίκης",
  "πυλαια": "Νομός Θεσσαλονίκης",
  "τούμπα": "Νομός Θεσσαλονίκης",
  "toumpa": "Νομός Θεσσαλονίκης",
  "τουμπα": "Νομός Θεσσαλονίκης",
  "ωραιόκαστρο": "Νομός Θεσσαλονίκης",
  "oreokastro": "Νομός Θεσσαλονίκης",
  "ωραιοκαστρο": "Νομός Θεσσαλονίκης",
  "συκιές": "Νομός Θεσσαλονίκης",
  "sykies": "Νομός Θεσσαλονίκης",
  "συκιες": "Νομός Θεσσαλονίκης",
  "εύοσμος": "Νομός Θεσσαλονίκης",
  "evosmos": "Νομός Θεσσαλονίκης",
  "ευοσμος": "Νομός Θεσσαλονίκης",
  "σταυρούπολη": "Νομός Θεσσαλονίκης",
  "stavroupoli": "Νομός Θεσσαλονίκης",
  "σταυρουπολη": "Νομός Θεσσαλονίκης",
  
  // Serres areas
  "σέρρες": "Νομός Σερρών",
  "serres": "Νομός Σερρών",
  "σερρες": "Νομός Σερρών",
  "νιγρίτα": "Νομός Σερρών",
  "nigrita": "Νομός Σερρών",
  "νιγριτα": "Νομός Σερρών",
  "σιδηρόκαστρο": "Νομός Σερρών",
  "sidirocastro": "Νομός Σερρών",
  "σιδηροκαστρο": "Νομός Σερρών",
  
  // Kilkis areas
  "κιλκίς": "Νομός Κιλκίς",
  "kilkis": "Νομός Κιλκίς",
  "κιλκις": "Νομός Κιλκίς",
  "πολύκαστρο": "Νομός Κιλκίς",
  "polykastro": "Νομός Κιλκίς",
  "πολυκαστρο": "Νομός Κιλκίς",
  
  // Pella areas
  "έδεσσα": "Νομός Πέλλας",
  "edessa": "Νομός Πέλλας",
  "εδεσσα": "Νομός Πέλλας",
  "γιαννιτσά": "Νομός Πέλλας",
  "giannitsa": "Νομός Πέλλας",
  "γιαννιτσα": "Νομός Πέλλας",
  "αριδαία": "Νομός Πέλλας",
  "aridaia": "Νομός Πέλλας",
  "αριδαια": "Νομός Πέλλας",
  
  // Imathia areas
  "βέροια": "Νομός Ημαθίας",
  "veroia": "Νομός Ημαθίας",
  "βεροια": "Νομός Ημαθίας",
  "νάουσα": "Νομός Ημαθίας",
  "naousa": "Νομός Ημαθίας",
  "ναουσα": "Νομός Ημαθίας",
  "αλεξάνδρεια": "Νομός Ημαθίας",
  "alexandria": "Νομός Ημαθίας",
  "αλεξανδρεια": "Νομός Ημαθίας",
  
  // Chalkidiki areas
  "χαλκιδική": "Νομός Χαλκιδικής",
  "chalkidiki": "Νομός Χαλκιδικής",
  "χαλκιδικη": "Νομός Χαλκιδικής",
  "πολύγυρος": "Νομός Χαλκιδικής",
  "polygyros": "Νομός Χαλκιδικής",
  "πολυγυρος": "Νομός Χαλκιδικής",
  "κασσάνδρα": "Νομός Χαλκιδικής",
  "kassandra": "Νομός Χαλκιδικής",
  "κασσανδρα": "Νομός Χαλκιδικής",
  "σιθωνία": "Νομός Χαλκιδικής",
  "sithonia": "Νομός Χαλκιδικής",
  "σιθωνια": "Νομός Χαλκιδικής",
  "άθως": "Νομός Χαλκιδικής",
  "athos": "Νομός Χαλκιδικής",
  "αθως": "Νομός Χαλκιδικής",
  "μουδανιά": "Νομός Χαλκιδικής",
  "moudania": "Νομός Χαλκιδικής",
  "μουδανια": "Νομός Χαλκιδικής",
};

/**
 * Determines the prefecture (νομός) for a given location
 * First checks local mapping, then would normally do an internet search
 * 
 * @param location The location to search for
 * @returns Promise that resolves to the prefecture name or null if not found
 */
export const findPrefectureForLocation = async (location: string): Promise<string | null> => {
  console.log(`Finding prefecture for location: ${location}`);
  
  if (!location) return null;
  
  // Normalize input - remove extra spaces, lowercase
  const normalizedLocation = location.toLowerCase().trim();
  
  // First check our local mapping
  for (const [key, value] of Object.entries(LOCATION_TO_PREFECTURE)) {
    if (normalizedLocation.includes(key)) {
      console.log(`Found prefecture ${value} for ${location} in local mapping`);
      return value;
    }
  }
  
  // In a real implementation, here we would make an API call to a geocoding service
  // or perform a web search to determine the prefecture
  // For now, we'll just return null for unknown locations
  console.log(`Could not determine prefecture for ${location}`);
  
  // Show a toast when prefecture couldn't be determined
  toast({
    title: "Άγνωστη περιοχή",
    description: `Δεν ήταν δυνατός ο προσδιορισμός του νομού για την περιοχή "${location}". Δοκιμάστε μια πιο γνωστή περιοχή.`,
    variant: "default"
  });
  
  return null;
};

/**
 * Filter homes by the prefecture they serve
 */
export const filterHomesByPrefecture = (homes: any[], prefecture: string | null): any[] => {
  if (!prefecture) {
    return homes;
  }
  
  return homes.filter(home => {
    // Check if the home has regions and if the prefecture is included
    return home.regions && 
           Array.isArray(home.regions) && 
           home.regions.includes(prefecture);
  });
};
