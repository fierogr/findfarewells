
import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const LoadingState = () => {
  const [progress, setProgress] = useState(10);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        // Cap at 90% to show that we're still waiting for the final result
        return prev >= 90 ? 90 : prev + 10;
      });
    }, 800);
    
    return () => clearInterval(interval);
  }, []);
  
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
