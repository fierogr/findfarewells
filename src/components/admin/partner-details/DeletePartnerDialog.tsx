
import React from "react";
import { useDeleteFuneralHome } from "@/hooks/useDeleteFuneralHome";
import { useToast } from "@/hooks/use-toast";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";

interface DeletePartnerDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  partnerId: string;
  onBack: () => void;
}

const DeletePartnerDialog = ({ 
  isOpen, 
  onOpenChange, 
  partnerId, 
  onBack 
}: DeletePartnerDialogProps) => {
  const deleteFuneralHomeMutation = useDeleteFuneralHome();
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      await deleteFuneralHomeMutation.mutateAsync(partnerId);
      toast({
        title: "Διαγραφή επιτυχής",
        description: "Ο συνεργάτης διαγράφηκε με επιτυχία.",
      });
      onBack();
    } catch (err) {
      toast({
        title: "Σφάλμα",
        description: "Υπήρξε πρόβλημα κατά τη διαγραφή του συνεργάτη.",
        variant: "destructive",
      });
      console.error("Error deleting partner:", err);
    } finally {
      onOpenChange(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Διαγραφή Συνεργάτη</AlertDialogTitle>
          <AlertDialogDescription>
            Είστε βέβαιοι ότι θέλετε να διαγράψετε αυτόν τον συνεργάτη; Η ενέργεια αυτή δεν μπορεί να αναιρεθεί.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Άκυρο</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={deleteFuneralHomeMutation.isPending}
          >
            {deleteFuneralHomeMutation.isPending ? 'Διαγραφή...' : 'Διαγραφή'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePartnerDialog;
