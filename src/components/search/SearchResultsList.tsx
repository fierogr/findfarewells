
import React, { useMemo, useState } from "react";
import FuneralHomeCard from "./FuneralHomeCard";
import LoadingState from "./LoadingState";
import EmptyResults from "./EmptyResults";
import { FuneralHome, ServicePackage } from "@/types/funeralHome";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

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
  const [isSelecting, setIsSelecting] = useState<boolean>(false);
  const itemsPerPage = 10;
  const navigate = useNavigate();
  
  // Expand homes to include all packages - memoized for performance
  const expandedResults = useMemo(() => {
    if (loading || homes.length === 0) return [];
    
    const results: PackageWithHome[] = [];
    
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
  
  const handlePackageSelect = async (home: FuneralHome, selectedPackage: ServicePackage | null) => {
    setIsSelecting(true);
    try {
      const phoneNumber = sessionStorage.getItem('searchPhoneNumber');
      
      if (!phoneNumber) {
        toast({
          title: "Προσοχή",
          description: "Παρακαλώ επαναλάβετε την αναζήτηση για να καταχωρήσετε το πακέτο",
          variant: "destructive",
        });
        return;
      }
      
      // Use a type assertion to bypass TypeScript's type checking
      // This is a temporary solution until the Supabase types can be regenerated
      const { error } = await (supabase as any)
        .from('package_selections')
        .insert({
          location: searchLocation || null,
          prefecture: searchPrefecture || null,
          phone_number: phoneNumber,
          partner_id: home.id,
          partner_name: home.name,
          package_name: selectedPackage?.name || 'Βασικό πακέτο',
          package_price: selectedPackage?.price || home.basicPrice || 0,
          package_id: selectedPackage?.id || null
        });
      
      if (error) {
        console.error("Error saving package selection:", error);
        toast({
          title: "Σφάλμα",
          description: "Δεν ήταν δυνατή η αποθήκευση της επιλογής σας. Παρακαλώ δοκιμάστε ξανά.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Επιτυχία",
          description: "Η επιλογή του πακέτου καταχωρήθηκε επιτυχώς!",
        });
        
        // Navigate to funeral home details page
        navigate(`/funeral-home/${home.id}`);
      }
    } catch (error) {
      console.error("Error in package selection:", error);
      toast({
        title: "Σφάλμα",
        description: "Προέκυψε ένα σφάλμα κατά την επιλογή πακέτου. Παρακαλώ δοκιμάστε ξανά.",
        variant: "destructive",
      });
    } finally {
      setIsSelecting(false);
    }
  };
  
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
      <div className="grid grid-cols-1 gap-6 mb-6">
        {paginatedResults.map((item, index) => (
          <FuneralHomeCard 
            key={`${item.home.id}-${item.package?.id || 'basic'}-${index}`}
            home={item.home}
            packageToShow={item.package}
            selectedServices={selectedServices}
            onSelectPackage={handlePackageSelect}
            isSelecting={isSelecting}
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
            
            {Array.from({ length: totalPages }).map((_, index) => (
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
