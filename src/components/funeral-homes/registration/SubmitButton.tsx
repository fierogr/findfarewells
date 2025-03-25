
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps {
  isSubmitting: boolean;
  isValid: boolean;
}

export function SubmitButton({ isSubmitting, isValid }: SubmitButtonProps) {
  return (
    <Button 
      type="submit" 
      className="w-full gap-2" 
      disabled={isSubmitting || !isValid}
    >
      {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
      Υποβολή Εγγραφής
    </Button>
  );
}
