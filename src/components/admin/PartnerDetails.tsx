
import React, { useState } from "react";
import { useFuneralHome } from "@/hooks/useFuneralHome";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Trash2, Upload, Plus, X, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FuneralHome, ServicePackage, AdditionalService } from "@/types/funeralHome";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { useDeleteFuneralHome } from "@/hooks/useDeleteFuneralHome";
import { updateFuneralHome } from "@/services/adminFuneralHomeService";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";

interface PartnerDetailsProps {
  partnerId: string;
  onBack: () => void;
}

const packageFormSchema = z.object({
  name: z.string().min(1, { message: "Το όνομα πακέτου είναι υποχρεωτικό" }),
  price: z.coerce.number().min(0, { message: "Η τιμή πρέπει να είναι θετικός αριθμός" }),
  description: z.string().min(1, { message: "Η περιγραφή είναι υποχρεωτική" }),
  includedServices: z.string().optional()
});

type PackageFormValues = z.infer<typeof packageFormSchema>;

const PartnerDetails = ({ partnerId, onBack }: PartnerDetailsProps) => {
  const { data: funeralHome, isLoading, error } = useFuneralHome(partnerId);
  const [editedHome, setEditedHome] = useState<FuneralHome | null>(null);
  const [newService, setNewService] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPackageDialogOpen, setIsPackageDialogOpen] = useState(false);
  const [includedServiceInput, setIncludedServiceInput] = useState("");
  const [includedServices, setIncludedServices] = useState<string[]>([]);
  const deleteFuneralHomeMutation = useDeleteFuneralHome();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const packageForm = useForm<PackageFormValues>({
    resolver: zodResolver(packageFormSchema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      includedServices: ""
    }
  });

  React.useEffect(() => {
    if (funeralHome) {
      setEditedHome(funeralHome);
    }
  }, [funeralHome]);

  const handleSave = async () => {
    if (editedHome) {
      try {
        const updatedHome = await updateFuneralHome(editedHome.id, editedHome);
        if (updatedHome) {
          queryClient.invalidateQueries({ queryKey: ["funeralHomes"] });
          queryClient.invalidateQueries({ queryKey: ["funeralHome", partnerId] });
          
          toast({
            title: "Αποθήκευση επιτυχής",
            description: "Οι αλλαγές αποθηκεύτηκαν με επιτυχία.",
          });
        }
      } catch (err) {
        toast({
          title: "Σφάλμα",
          description: "Υπήρξε πρόβλημα κατά την αποθήκευση των αλλαγών.",
          variant: "destructive",
        });
        console.error("Error saving partner:", err);
      }
    }
  };

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
      setIsDeleteDialogOpen(false);
    }
  };

  const handleInputChange = (field: keyof FuneralHome, value: string | number | boolean) => {
    if (editedHome) {
      setEditedHome({ ...editedHome, [field]: value });
    }
  };

  const handleServiceAdd = () => {
    if (editedHome && newService.trim()) {
      const updatedServices = [...editedHome.services, newService.trim()];
      setEditedHome({ ...editedHome, services: updatedServices });
      setNewService("");
    }
  };

  const handleServiceRemove = (serviceToRemove: string) => {
    if (editedHome) {
      const updatedServices = editedHome.services.filter(service => service !== serviceToRemove);
      setEditedHome({ ...editedHome, services: updatedServices });
    }
  };

  const handlePackageUpdate = (index: number, field: keyof ServicePackage, value: any) => {
    if (editedHome) {
      const updatedPackages = [...editedHome.packages];
      updatedPackages[index] = { ...updatedPackages[index], [field]: value };
      setEditedHome({ ...editedHome, packages: updatedPackages });
    }
  };

  const handleAdditionalServiceUpdate = (index: number, field: keyof AdditionalService, value: any) => {
    if (editedHome) {
      const updatedServices = [...editedHome.additionalServices];
      updatedServices[index] = { ...updatedServices[index], [field]: value };
      setEditedHome({ ...editedHome, additionalServices: updatedServices });
    }
  };

  const addIncludedService = () => {
    if (includedServiceInput.trim()) {
      setIncludedServices([...includedServices, includedServiceInput.trim()]);
      setIncludedServiceInput("");
    }
  };

  const removeIncludedService = (service: string) => {
    setIncludedServices(includedServices.filter(s => s !== service));
  };

  const handleAddPackage = (data: PackageFormValues) => {
    if (editedHome) {
      const newPackage: ServicePackage = {
        id: `pkg-${Date.now()}`,
        name: data.name,
        price: data.price,
        description: data.description,
        includedServices: includedServices,
      };
      
      const updatedPackages = [...editedHome.packages, newPackage];
      setEditedHome({ ...editedHome, packages: updatedPackages });
      
      toast({
        title: "Νέο πακέτο",
        description: "Το πακέτο προστέθηκε επιτυχώς."
      });
      
      packageForm.reset();
      setIncludedServices([]);
      setIsPackageDialogOpen(false);
    }
  };

  const resetPackageForm = () => {
    packageForm.reset();
    setIncludedServices([]);
    setIncludedServiceInput("");
  };

  const greekRegions = [
    "Νομός Θεσσαλονίκης",
    "Νομός Σερρών",
    "Νομός Κιλκίς",
    "Νομός Πέλλας",
    "Νομός Ημαθίας",
    "Νομός Χαλκιδικής"
  ];

  const handleRegionToggle = (region: string) => {
    if (editedHome) {
      const currentRegions = editedHome.regions || [];
      const updatedRegions = currentRegions.includes(region)
        ? currentRegions.filter(r => r !== region)
        : [...currentRegions, region];
      
      setEditedHome({ ...editedHome, regions: updatedRegions });
    }
  };

  if (isLoading) {
    return <div className="text-center py-4">Φόρτωση στοιχείων συνεργάτη...</div>;
  }

  if (error || !editedHome) {
    return (
      <div className="text-center py-4 text-red-500">
        Σφάλμα κατά τη φόρτωση των στοιχείων του συνεργάτη.
        <Button variant="outline" className="mt-2" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Επιστροφή
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Επιστροφή στη λίστα
        </Button>
        <div className="flex space-x-2">
          <Button 
            variant="destructive" 
            onClick={() => setIsDeleteDialogOpen(true)}
            disabled={deleteFuneralHomeMutation.isPending}
          >
            <Trash2 className="mr-2 h-4 w-4" /> Διαγραφή
          </Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" /> Αποθήκευση
          </Button>
        </div>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="basic">Βασικά Στοιχεία</TabsTrigger>
          <TabsTrigger value="services">Υπηρεσίες</TabsTrigger>
          <TabsTrigger value="packages">Πακέτα</TabsTrigger>
          <TabsTrigger value="additional">Επιπλέον Υπηρεσίες</TabsTrigger>
          <TabsTrigger value="regions">Περιοχές Εξυπηρέτησης</TabsTrigger>
          <TabsTrigger value="photos">Φωτογραφίες</TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <Card>
            <CardHeader>
              <CardTitle>Βασικά Στοιχεία</CardTitle>
              <CardDescription>
                Βασικές πληροφορίες για το γραφείο τελετών.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Επωνυμία</Label>
                  <Input
                    id="name"
                    value={editedHome.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={editedHome.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Τηλέφωνο</Label>
                  <Input
                    id="phone"
                    value={editedHome.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Ιστοσελίδα</Label>
                  <Input
                    id="website"
                    value={editedHome.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Διεύθυνση</Label>
                  <Input
                    id="address"
                    value={editedHome.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="city">Πόλη</Label>
                    <Input
                      id="city"
                      value={editedHome.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">Περιοχή</Label>
                    <Input
                      id="state"
                      value={editedHome.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">Τ.Κ.</Label>
                    <Input
                      id="zip"
                      value={editedHome.zip}
                      onChange={(e) => handleInputChange("zip", e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Σύντομη Περιγραφή</Label>
                <Textarea
                  id="description"
                  value={editedHome.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="about">Αναλυτική Περιγραφή</Label>
                <Textarea
                  id="about"
                  className="min-h-[150px]"
                  value={editedHome.about}
                  onChange={(e) => handleInputChange("about", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>Υπηρεσίες</CardTitle>
              <CardDescription>
                Διαχείριση των υπηρεσιών που προσφέρει το γραφείο τελετών.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Προσθήκη νέας υπηρεσίας"
                  value={newService}
                  onChange={(e) => setNewService(e.target.value)}
                />
                <Button onClick={handleServiceAdd}>
                  <Plus className="h-4 w-4 mr-1" /> Προσθήκη
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {editedHome.services.map((service, index) => (
                  <Badge key={index} variant="secondary" className="py-2 px-3 text-sm">
                    {service}
                    <Button
                      variant="ghost"
                      className="h-4 w-4 p-0 ml-2"
                      onClick={() => handleServiceRemove(service)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="packages">
          <Card>
            <CardHeader>
              <CardTitle>Πακέτα Υπηρεσιών</CardTitle>
              <CardDescription>
                Διαχείριση πακέτων υπηρεσιών και τιμών.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {editedHome.packages.map((pkg, index) => (
                  <div key={pkg.id} className="border rounded-md p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label htmlFor={`package-name-${index}`}>Ονομασία Πακέτου</Label>
                        <Input
                          id={`package-name-${index}`}
                          value={pkg.name}
                          onChange={(e) => handlePackageUpdate(index, "name", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`package-price-${index}`}>Τιμή (€)</Label>
                        <Input
                          id={`package-price-${index}`}
                          type="number"
                          value={pkg.price}
                          onChange={(e) => handlePackageUpdate(index, "price", parseFloat(e.target.value))}
                        />
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <Label htmlFor={`package-desc-${index}`}>Περιγραφή</Label>
                      <Textarea
                        id={`package-desc-${index}`}
                        value={pkg.description}
                        onChange={(e) => handlePackageUpdate(index, "description", e.target.value)}
                      />
                    </div>
                    <Separator className="my-2" />
                    <h4 className="font-medium mb-2">Συμπεριλαμβανόμενες Υπηρεσίες</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {pkg.includedServices.map((service, i) => (
                        <Badge key={i} variant="secondary" className="py-1.5 px-3">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
                <Button 
                  className="w-full" 
                  onClick={() => {
                    resetPackageForm();
                    setIsPackageDialogOpen(true);
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" /> Προσθήκη Νέου Πακέτου
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="additional">
          <Card>
            <CardHeader>
              <CardTitle>Επιπλέον Υπηρεσίες</CardTitle>
              <CardDescription>
                Διαχείριση επιπλέον προσφερόμενων υπηρεσιών.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Υπηρεσία</TableHead>
                    <TableHead>Τιμή (€)</TableHead>
                    <TableHead>Περιγραφή</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {editedHome.additionalServices.map((service, index) => (
                    <TableRow key={service.id}>
                      <TableCell>
                        <Input
                          value={service.name}
                          onChange={(e) => handleAdditionalServiceUpdate(index, "name", e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={service.price}
                          onChange={(e) => handleAdditionalServiceUpdate(index, "price", parseFloat(e.target.value))}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={service.description || ""}
                          onChange={(e) => handleAdditionalServiceUpdate(index, "description", e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button className="mt-4">
                <Plus className="mr-2 h-4 w-4" /> Προσθήκη Υπηρεσίας
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regions">
          <Card>
            <CardHeader>
              <CardTitle>Περιοχές Εξυπηρέτησης</CardTitle>
              <CardDescription>
                Διαχειριστείτε τις περιοχές στις οποίες δραστηριοποιείται το γραφείο τελετών.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Επιλέξτε τις περιοχές στις οποίες δραστηριοποιείται το γραφείο τελετών.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {greekRegions.map((region) => {
                    const isChecked = (editedHome.regions || []).includes(region);
                    return (
                      <div key={region} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`region-${region}`}
                          checked={isChecked}
                          onCheckedChange={() => handleRegionToggle(region)}
                        />
                        <label
                          htmlFor={`region-${region}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {region}
                        </label>
                      </div>
                    );
                  })}
                </div>

                {(editedHome.regions || []).length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Επιλεγμένες Περιοχές Εξυπηρέτησης:</h4>
                    <div className="flex flex-wrap gap-2">
                      {(editedHome.regions || []).map((region) => (
                        <Badge key={region} variant="secondary" className="px-3 py-1">
                          {region}
                          <Button
                            variant="ghost"
                            className="h-4 w-4 p-0 ml-1"
                            onClick={() => handleRegionToggle(region)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="photos">
          <Card>
            <CardHeader>
              <CardTitle>Φωτογραφίες</CardTitle>
              <CardDescription>
                Διαχείριση φωτογραφιών του γραφείου τελετών.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Κύρια Φωτογραφία</h4>
                  <div className="border rounded-md p-4 text-center">
                    {editedHome.imageUrl ? (
                      <div className="relative">
                        <img
                          src={editedHome.imageUrl}
                          alt="Main image"
                          className="h-60 w-full object-cover rounded-md"
                        />
                        <Button variant="outline" size="sm" className="absolute top-2 right-2">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-40 bg-muted rounded-md">
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">Δεν υπάρχει εικόνα</p>
                      </div>
                    )}
                    <Button variant="outline" className="mt-4">
                      <Upload className="mr-2 h-4 w-4" /> Μεταφόρτωση
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Εικόνα Εξώφυλλου</h4>
                  <div className="border rounded-md p-4 text-center">
                    {editedHome.coverImageUrl ? (
                      <div className="relative">
                        <img
                          src={editedHome.coverImageUrl}
                          alt="Cover image"
                          className="h-40 w-full object-cover rounded-md"
                        />
                        <Button variant="outline" size="sm" className="absolute top-2 right-2">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-40 bg-muted rounded-md">
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">Δεν υπάρχει εικόνα εξώφυλου</p>
                      </div>
                    )}
                    <Button variant="outline" className="mt-4">
                      <Upload className="mr-2 h-4 w-4" /> Μεταφόρτωση
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Πρόσθετες Φωτογραφίες</h4>
                  <div className="border rounded-md p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="flex flex-col items-center justify-center h-40 bg-muted rounded-md">
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">Προσθήκη φωτογραφίας</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
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

      <Dialog open={isPackageDialogOpen} onOpenChange={setIsPackageDialogOpen}>
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
    </div>
  );
};

export default PartnerDetails;
