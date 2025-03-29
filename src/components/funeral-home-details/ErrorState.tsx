
import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const ErrorState = () => {
  return (
    <div className="container py-8">
      <div className="flex items-center mb-8">
        <Link to="/search">
          <Button variant="outline" size="sm" className="gap-1">
            <ChevronLeft className="h-4 w-4" />
            <span>Πίσω στα αποτελέσματα</span>
          </Button>
        </Link>
      </div>
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">Δεν βρέθηκαν στοιχεία</h2>
            <p className="text-muted-foreground">
              Λυπούμαστε, δεν μπορέσαμε να βρούμε το γραφείο τελετών που αναζητάτε.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorState;
