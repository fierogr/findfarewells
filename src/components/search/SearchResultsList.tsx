
import React from "react";
import FuneralHomeCard from "./FuneralHomeCard";
import LoadingState from "./LoadingState";
import EmptyResults from "./EmptyResults";
import { FuneralHome } from "@/types/funeralHome";

interface SearchResultsListProps {
  homes: FuneralHome[];
  loading: boolean;
  error: string | null;
  selectedServices: string[];
  onClearFilters: () => void;
  searchLocation: string;
  searchPrefecture: string | null;
}

const SearchResultsList = ({
  homes,
  loading,
  error,
  selectedServices,
  onClearFilters,
  searchLocation,
  searchPrefecture
}: SearchResultsListProps) => {
  if (loading) {
    return <LoadingState />;
  }
  
  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }
  
  if (homes.length === 0) {
    return (
      <EmptyResults 
        onClearFilters={onClearFilters}
        location={searchLocation || searchPrefecture || undefined}
      />
    );
  }
  
  return (
    <div className="grid grid-cols-1 gap-6">
      {homes.map((home) => (
        <FuneralHomeCard 
          key={home.id} 
          home={home}
          selectedServices={selectedServices}
        />
      ))}
    </div>
  );
};

export default SearchResultsList;
