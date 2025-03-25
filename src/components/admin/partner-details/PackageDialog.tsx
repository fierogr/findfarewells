
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { ServicePackage } from "@/types/funeralHome";
import { Plus, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const packageFormSchema = z.object({
  name: z.string().min(1, { message: "Το όνομα πακέτου είναι υποχρεωτικό" }),
  price: z.coerce.number().min(0, { message: "Η τιμή πρέπει να είναι θετικός αριθμός" }),
  description: z.string().min(1, { message: "Η περιγραφή είναι υποχρεωτική" }),
  includedServices: z.string().optional()
});

type PackageFormValues = z.infer<typeof packageFormSchema>;

interface PackageDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddPackage: (newPackage: ServicePackage) => void;
}

const PackageDialog = ({ isOpen, onOpenChange, onAddPackage }: PackageDialogProps) => {
  const [includedServiceInput, setIncludedServiceInput] = useState("");
  const [includedServices, setIncludedServices] = useState<string[]>([]);
  const { toast } = useToast();
  
  const packageForm = useForm<PackageFormValues>({
    resolver: zodResolver(packageFormSchema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      includedServices: ""
    }
  });

  const addIncludedService = () => {
    if (includedServiceInput.trim()) {
      setIncludedServices([...includedServices, includedServiceInput.trim()]);
      setIncludedServiceInput("");
    }
  };

  const removeIncludedService = (service: string) => {
    setIncludedServices(includedServices.filter(s => s !== service));
  };

  const resetPackageForm = () => {
    packageForm.reset();
    setIncludedServices([]);
    setIncludedServiceInput("");
  };

  const handleAddPackage = (data: PackageFormValues) => {
    const newPackage: ServicePackage = {
      id: `pkg-${Date.now()}`,
      name: data.name,
      price: data.price,
      description: data.description,
      includedServices: includedServices,
    };
    
    onAddPackage(newPackage);
    
    toast({
      title: "Νέο πακέτο",
      description: "Το πακέτο προστέθηκε επιτυχώς."
    });
    
    resetPackageForm();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) resetPackageForm();
      onOpenChange(open);
    }}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Προσθήκη Νέου Πακέτου</DialogTitle>
          <DialogDescription>
            Συμπληρώστε τα στοιχεία για το νέο πακέτο υπηρεσιών.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...packageForm}>
          <form onSubmit={packageForm.handleSubmit(handleAddPackage)} className="space-y-4">
            <FormField
              control={packageForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ονομασία Πακέτου</FormLabel>
                  <FormControl>
                    <Input placeholder="Εισαγωγή ονόματος" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={packageForm.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Τιμή (€)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={packageForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Περιγραφή</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Περιγραφή του πακέτου" 
                      className="h-20"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-2">
              <Label>Συμπεριλαμβανόμενες Υπηρεσίες</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Προσθήκη υπηρεσίας"
                  value={includedServiceInput}
                  onChange={(e) => setIncludedServiceInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addIncludedService();
                    }
                  }}
                />
                <Button type="button" onClick={addIncludedService}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-2">
                {includedServices.map((service, i) => (
                  <Badge key={i} variant="secondary" className="py-1.5 px-3">
                    {service}
                    <Button
                      type="button"
                      variant="ghost"
                      className="h-4 w-4 p-0 ml-1"
                      onClick={() => removeIncludedService(service)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
            
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Άκυρο</Button>
              </DialogClose>
              <Button type="submit">Προσθήκη</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PackageDialog;
