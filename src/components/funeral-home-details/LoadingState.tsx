
import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingState = () => {
  return (
    <div className="container py-8 space-y-8">
      <div className="flex items-center">
        <Link to="/search">
          <Button variant="outline" size="sm" className="gap-1">
            <ChevronLeft className="h-4 w-4" />
            <span>Πίσω στα αποτελέσματα</span>
          </Button>
        </Link>
      </div>
      <div className="h-64 w-full rounded-lg bg-gray-200 animate-pulse" />
      <div className="space-y-4">
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-40 w-full" />
      </div>
    </div>
  );
};

export default LoadingState;
