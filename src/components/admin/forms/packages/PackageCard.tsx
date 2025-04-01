
import React from "react";
import { ServicePackage } from "@/types/funeralHome";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Trash2 } from "lucide-react";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface PackageCardProps {
  pkg: ServicePackage;
  index: number;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

const PackageCard = ({ pkg, index, onEdit, onDelete }: PackageCardProps) => {
  return (
    <Card className={index === 0 ? "border-primary" : ""}>
      {index === 0 && (
        <div className="absolute top-0 right-0 bg-primary text-white text-xs px-2 py-1 rounded-bl">
          Κύριο Πακέτο
        </div>
      )}
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{pkg.name}</span>
          <span className="text-primary font-bold">{pkg.price.toLocaleString()}€</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {pkg.description && <p className="text-sm text-muted-foreground">{pkg.description}</p>}
        
        {pkg.includedServices.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-1">Περιλαμβάνει:</p>
            <ul className="text-sm space-y-1">
              {pkg.includedServices.map((service, i) => (
                <li key={i} className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-1 mt-0.5" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onEdit(index)}
        >
          Επεξεργασία
        </Button>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="sm" className="text-destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Είστε σίγουροι;</AlertDialogTitle>
              <AlertDialogDescription>
                Αυτή η ενέργεια θα διαγράψει το πακέτο "{pkg.name}" και δεν μπορεί να αναιρεθεί.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Άκυρο</AlertDialogCancel>
              <AlertDialogAction 
                onClick={() => onDelete(index)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Διαγραφή
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default PackageCard;
