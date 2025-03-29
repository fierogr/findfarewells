
import { FuneralHome } from "@/types/funeralHome";
import { calculateDistance } from "@/utils/distanceUtils";
import { filterHomesByRegion } from "@/utils/searchFilters";

// Max distance in kilometers for filtering homes
const MAX_DISTANCE_KM = 50;

// Re-export the filterHomesByRegion function for backward compatibility
export { filterHomesByRegion };
