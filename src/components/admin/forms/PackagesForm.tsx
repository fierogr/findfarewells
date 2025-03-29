import React, { useState } from "react";
import { ServicePackage } from "@/types/funeralHome";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Check, X } from "lucide-react";
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
import PackageFormEditor from "./packages/PackageFormEditor";

interface PackagesFormProps {
  packages: ServicePackage[];
  setPackages: React.Dispatch<React.SetStateAction<ServicePackage[]>>;
}

interface PackageFormData {
  name: string;
  description: string;
  price: string;
  includedServices: string[];
}

const PackagesForm = ({ packages, setPackages }: PackagesFormProps) => {
  const [isAddingPackage, setIsAddingPackage] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<PackageFormData>({
    name: "",
    description: "",
    price: "",
    includedServices: [],
  });

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      includedServices: [],
    });
    setIsAddingPackage(false);
    setEditIndex(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => {
      const updatedServices = prev.includedServices.includes(service)
        ? prev.includedServices.filter(s => s !== service)
        : [...prev.includedServices, service];
      
      return { ...prev, includedServices: updatedServices };
    });
  };

  const handleAddPackage = () => {
    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      alert("Παρακαλώ εισάγετε μια έγκυρη τιμή");
      return;
    }

    if (!formData.name) {
      alert("Παρακαλώ εισάγετε ένα όνομα για το πακέτο");
      return;
    }

    const newPackage: ServicePackage = {
      id: crypto.randomUUID(),
      name: formData.name,
      price: price,
      description: formData.description,
      includedServices: formData.includedServices,
    };

    if (editIndex !== null) {
      // Update existing package
      const updatedPackages = [...packages];
      updatedPackages[editIndex] = { ...newPackage, id: packages[editIndex].id };
      setPackages(updatedPackages);
    } else {
      // Add new package
      setPackages(prev => [...prev, newPackage]);
    }

    resetForm();
  };

  const handleEditPackage = (index: number) => {
    const pkg = packages[index];
    setFormData({
      name: pkg.name,
      description: pkg.description || "",
      price: pkg.price.toString(),
      includedServices: pkg.includedServices || [],
    });
    setEditIndex(index);
    setIsAddingPackage(true);
  };

  const handleDeletePackage = (index: number) => {
    setPackages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Πακέτα Υπηρεσιών</h3>
        {!isAddingPackage && (
          <Button 
            type="button" 
            onClick={() => setIsAddingPackage(true)}
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" /> Προσθήκη Πακέτου
          </Button>
        )}
      </div>

      {isAddingPackage ? (
        <PackageFormEditor
          formData={formData}
          handleChange={handleChange}
          handleServiceToggle={handleServiceToggle}
          handleAddPackage={handleAddPackage}
          resetForm={resetForm}
          editIndex={editIndex}
        />
      ) : packages.length === 0 ? (
        <div className="text-center py-8 border border-dashed rounded-md">
          <p className="text-muted-foreground mb-4">Δεν έχετε προσθέσει κανένα πακέτο υπηρεσιών ακόμα.</p>
          <Button variant="outline" onClick={() => setIsAddingPackage(true)}>
            <Plus className="h-4 w-4 mr-1" /> Προσθήκη Πρώτου Πακέτου
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {packages.map((pkg, index) => (
            <Card key={pkg.id} className={index === 0 ? "border-primary" : ""}>
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
                  onClick={() => handleEditPackage(index)}
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
                        onClick={() => handleDeletePackage(index)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Διαγραφή
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PackagesForm;
