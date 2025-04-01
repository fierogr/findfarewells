
import React from "react";
import FuneralHomeCard from "./FuneralHomeCard";
import LoadingState from "./LoadingState";
import EmptyResults from "./EmptyResults";
import { FuneralHome, ServicePackage } from "@/types/funeralHome";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface SearchResultsListProps {
  homes: FuneralHome[];
  loading: boolean;
  error: string | null;
  selectedServices: string[];
  onClearFilters: () => void;
  searchLocation: string;
  searchPrefecture: string | null;
}

interface PackageWithHome {
  home: FuneralHome;
  package: ServicePackage | null;
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
  
  // Expand homes to include all packages
  const expandedResults = React.useMemo(() => {
    const results: PackageWithHome[] = [];
    
    homes.forEach(home => {
      if (home.packages && home.packages.length > 0) {
        // For each home, add its lowest-priced package first to maintain sorting order
        const sortedPackages = [...home.packages].sort((a, b) => a.price - b.price);
        sortedPackages.forEach(pkg => {
          results.push({ home, package: pkg });
        });
      } else {
        // If no packages, add the home once with null package
        results.push({ home, package: null });
      }
    });
    
    return results;
  }, [homes]);
  
  // Paginate results
  const paginatedResults = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return expandedResults.slice(startIndex, endIndex);
  }, [expandedResults, currentPage]);
  
  const totalPages = Math.ceil(expandedResults.length / itemsPerPage);
  
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
    <div>
      <div className="grid grid-cols-1 gap-6 mb-6">
        {paginatedResults.map((item, index) => (
          <FuneralHomeCard 
            key={`${item.home.id}-${item.package?.id || 'basic'}-${index}`}
            home={item.home}
            packageToShow={item.package}
            selectedServices={selectedServices}
          />
        ))}
      </div>
      
      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => setCurrentPage(index + 1)}
                  isActive={currentPage === index + 1}
                  className="cursor-pointer"
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default SearchResultsList;
