
import React, { useMemo, useState } from "react";
import { FuneralHome } from "@/types/funeralHome";
import LoadingState from "./LoadingState";
import EmptyResults from "./EmptyResults";
import { useNavigate } from "react-router-dom";
import ResultsPagination from "./results/ResultsPagination";
import ResultsList from "./results/ResultsList";
import { usePackageSelection } from "@/hooks/search/usePackageSelection";

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
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;
  const { isSelecting, handlePackageSelect } = usePackageSelection(searchLocation, searchPrefecture);
  
  // Expand homes to include all packages - memoized for performance
  const expandedResults = useMemo(() => {
    if (loading || homes.length === 0) return [];
    
    const results = [];
    
    homes.forEach(home => {
      if (Array.isArray(home.packages) && home.packages.length > 0) {
        // For each home, add its lowest-priced package first to maintain sorting order
        const sortedPackages = [...home.packages].sort((a, b) => a.price - b.price);
        
        // Only add the first (lowest price) package to avoid duplication
        results.push({ home, package: sortedPackages[0] });
      } else {
        // If no packages, add the home once with null package
        results.push({ home, package: null });
      }
    });
    
    return results;
  }, [homes, loading]);
  
  // Paginate results - memoized for performance
  const paginatedResults = useMemo(() => {
    if (expandedResults.length === 0) return [];
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return expandedResults.slice(startIndex, endIndex);
  }, [expandedResults, currentPage]);
  
  const totalPages = Math.max(1, Math.ceil(expandedResults.length / itemsPerPage));
  
  // Reset page when results change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [homes.length]);
  
  // If still loading, show loading state
  if (loading) {
    return <LoadingState />;
  }
  
  // If there was an error, show error state
  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }
  
  // If no results found, show empty state
  if (homes.length === 0) {
    return (
      <EmptyResults 
        onClearFilters={onClearFilters}
        location={searchLocation || searchPrefecture || undefined}
      />
    );
  }
  
  return (
    <div className="mb-10">
      <ResultsList 
        paginatedResults={paginatedResults}
        selectedServices={selectedServices}
        onSelectPackage={handlePackageSelect}
        isSelecting={isSelecting}
      />
      
      <ResultsPagination 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default SearchResultsList;
