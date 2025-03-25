
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { FuneralHome } from "@/types/funeralHome";
import { Image, X, Plus } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Το όνομα πρέπει να έχει τουλάχιστον 2 χαρακτήρες" }),
  address: z.string().min(5, { message: "Η διεύθυνση είναι απαραίτητη" }),
  city: z.string().min(2, { message: "Η πόλη είναι απαραίτητη" }),
  state: z.string().min(2, { message: "Ο νομός είναι απαραίτητος" }),
  zip: z.string().min(5, { message: "Ο ταχυδρομικός κώδικας είναι απαραίτητος" }),
  phone: z.string().min(10, { message: "Το τηλέφωνο είναι απαραίτητο" }),
  email: z.string().email({ message: "Παρακαλώ εισάγετε ένα έγκυρο email" }),
  description: z.string().min(20, { message: "Η περιγραφή πρέπει να έχει τουλάχιστον 20 χαρακτήρες" }),
  services: z.string().optional(),
  website: z.string().url({ message: "Παρακαλώ εισάγετε ένα έγκυρο URL" }).optional().or(z.literal("")),
  featured: z.boolean().default(false),
});

interface PartnerFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: FuneralHome) => Promise<void>;
  initialData?: FuneralHome;
}

const PartnerForm = ({ open, onClose, onSave, initialData }: PartnerFormProps) => {
  const [imageUrl, setImageUrl] = useState<string>(initialData?.imageUrl || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {
      name: initialData.name,
      address: initialData.address,
      city: initialData.city,
      state: initialData.state,
      zip: initialData.zip,
      phone: initialData.phone,
      email: initialData.email,
      description: initialData.description,
      services: initialData.services.join(", "),
      website: initialData.website || "",
      featured: initialData.featured
    } : {
      name: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
      email: "",
      description: "",
      services: "",
      website: "",
      featured: false
    }
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, we would upload this to a server or cloud storage
      // For demo purposes, we're creating a local URL
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      
      const partnerData: FuneralHome = {
        id: initialData?.id || crypto.randomUUID(),
        name: data.name,
        address: data.address,
        city: data.city,
        state: data.state,
        zip: data.zip,
        phone: data.phone,
        email: data.email,
        description: data.description,
        services: data.services ? data.services.split(',').map(s => s.trim()) : [],
        imageUrl: imageUrl || "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80",
        website: data.website || "",
        hours: initialData?.hours || "",
        about: initialData?.about || "",
        rating: initialData?.rating || 0,
        reviewCount: initialData?.reviewCount || 0,
        basicPrice: initialData?.basicPrice || 0,
        featured: data.featured,
        amenities: initialData?.amenities || [],
        packages: initialData?.packages || [],
        additionalServices: initialData?.additionalServices || [],
        reviews: initialData?.reviews || []
      };
      
      await onSave(partnerData);
      toast.success(initialData ? "Ο συνεργάτης ενημερώθηκε με επιτυχία!" : "Ο συνεργάτης προστέθηκε με επιτυχία!");
      onClose();
    } catch (error) {
      console.error("Error saving partner:", error);
      toast.error("Υπήρξε ένα σφάλμα κατά την αποθήκευση των στοιχείων");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialData ? "Επεξεργασία Συνεργάτη" : "Προσθήκη Νέου Συνεργάτη"}</DialogTitle>
          <DialogDescription>
            {initialData 
              ? "Τροποποιήστε τα στοιχεία του συνεργάτη παρακάτω." 
              : "Συμπληρώστε τα στοιχεία του νέου συνεργάτη."}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Επωνυμία</FormLabel>
                      <FormControl>
                        <Input placeholder="Γραφείο Τελετών" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Διεύθυνση</FormLabel>
                      <FormControl>
                        <Input placeholder="Οδός και αριθμός" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Πόλη</FormLabel>
                        <FormControl>
                          <Input placeholder="Πόλη" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Νομός</FormLabel>
                        <FormControl>
                          <Input placeholder="Νομός" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="zip"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Τ.Κ.</FormLabel>
                        <FormControl>
                          <Input placeholder="Ταχυδρομικός κώδικας" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Τηλέφωνο</FormLabel>
                        <FormControl>
                          <Input placeholder="Τηλέφωνο επικοινωνίας" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ιστοσελίδα (προαιρετικό)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://www.example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="space-y-4">
                <div className="mb-4">
                  <FormLabel className="block mb-2">Φωτογραφία</FormLabel>
                  {imageUrl ? (
                    <div className="relative w-full h-40 rounded-md overflow-hidden">
                      <img src={imageUrl} alt="Partner" className="object-cover w-full h-full" />
                      <Button 
                        type="button" 
                        variant="destructive" 
                        size="icon" 
                        className="absolute top-2 right-2"
                        onClick={() => setImageUrl("")}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="border border-dashed border-gray-300 rounded-md p-4 text-center">
                      <div className="space-y-2">
                        <div className="mx-auto h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                          <Image className="h-6 w-6 text-gray-500" />
                        </div>
                        <div className="flex text-sm text-gray-500">
                          <label htmlFor="file-upload" className="mx-auto relative cursor-pointer rounded-md bg-white font-medium text-primary hover:text-primary/90 focus-within:outline-none">
                            <span>Ανέβασμα φωτογραφίας</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={handleImageChange}
                            />
                          </label>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF μέχρι 10MB</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Περιγραφή</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Περιγραφή του γραφείου τελετών..." 
                          className="min-h-[120px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="services"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Υπηρεσίες (χωρισμένες με κόμμα)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Κηδεία, Μνημόσυνο, Μεταφορά σορού..." 
                          className="min-h-[80px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="featured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Προβεβλημένος Συνεργάτης</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Ο συνεργάτης θα εμφανίζεται στις προτεινόμενες επιλογές
                        </p>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                disabled={isSubmitting}
              >
                Ακύρωση
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Αποθήκευση..." : initialData ? "Ενημέρωση" : "Προσθήκη"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PartnerForm;
