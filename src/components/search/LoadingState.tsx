
import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface LoadingStateProps {
  initialProgress?: number;
  progressInterval?: number;
  maxProgress?: number;
}

const LoadingState = ({
  initialProgress = 10,
  progressInterval = 800,
  maxProgress = 90
}: LoadingStateProps) => {
  const [progress, setProgress] = useState(initialProgress);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        // Cap at maxProgress to show that we're still waiting for the final result
        return prev >= maxProgress ? maxProgress : prev + 10;
      });
    }, progressInterval);
    
    return () => clearInterval(interval);
  }, [maxProgress, progressInterval]);
  
  return (
    <div className="flex flex-col justify-center items-center h-64 space-y-4">
      <div className="flex items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <span className="text-lg">Φόρτωση γραφείων τελετών...</span>
      </div>
      
      <div className="w-full max-w-md">
        <Progress value={progress} className="h-2" />
        <p className="text-sm text-muted-foreground mt-2 text-center">
          Αναζήτηση σε όλες τις περιοχές εντός 50χλμ
        </p>
      </div>
    </div>
  );
};

export default LoadingState;
