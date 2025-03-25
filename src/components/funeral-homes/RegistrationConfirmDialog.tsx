
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { RegistrationFormValues } from "@/schemas/registrationFormSchema";

interface RegistrationConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  formData: RegistrationFormValues;
  isLoading: boolean;
}

export function RegistrationConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  formData,
  isLoading,
}: RegistrationConfirmDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Επιβεβαίωση Υποβολής</AlertDialogTitle>
          <AlertDialogDescription>
            Είστε σίγουροι ότι θέλετε να υποβάλετε την αίτηση εγγραφής για το γραφείο{" "}
            <strong>{formData.businessName}</strong>;
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-2 py-3">
          <p className="text-sm text-muted-foreground">
            Τα στοιχεία σας θα αποσταλούν στην ομάδα διαχείρισης και θα επικοινωνήσουμε μαζί σας σύντομα.
          </p>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Ακύρωση</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm} 
            disabled={isLoading}
            className="gap-2"
          >
            {isLoading && (
              <svg className="animate-spin -ml-1 mr-1 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            Υποβολή
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
