
// This file re-exports all search utility functions from their respective modules
// to maintain backward compatibility

export { GREEK_PREFECTURES } from './prefectureData';
export { LOCATION_TO_PREFECTURE, findPrefectureForLocation } from './locationMapping';
export { filterHomesByPrefecture, filterHomesByRegion } from './searchFilters';
