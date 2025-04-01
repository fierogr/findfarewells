
import React from "react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface ResultsPaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}

const ResultsPagination = ({
  currentPage,
  setCurrentPage,
  totalPages
}: ResultsPaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }
  
  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
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
            onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
            className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default ResultsPagination;
