
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
import { Loader2 } from "lucide-react";
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
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            Υποβολή
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
