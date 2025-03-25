
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import ImageUpload from "./ImageUpload";

const formSchema = z.object({
  description: z.string().min(20, { message: "Η περιγραφή πρέπει να έχει τουλάχιστον 20 χαρακτήρες" }),
  services: z.string().optional(),
  featured: z.boolean().default(false),
});

// Common funeral services in Greece
const availableServices = [
  { id: "funeral", label: "Κηδεία" },
  { id: "memorial", label: "Μνημόσυνο" },
  { id: "transport", label: "Μεταφορά σορού" },
  { id: "cremation", label: "Αποτέφρωση" },
  { id: "embalming", label: "Ταρίχευση" },
  { id: "flowers", label: "Άνθη/Στεφάνια" },
  { id: "documentation", label: "Έγγραφα/Άδειες" },
  { id: "obituary", label: "Αγγελία/Νεκρολογία" },
  { id: "catering", label: "Μπουφές/Καφές" },
  { id: "chapel", label: "Ιδιωτικό παρεκκλήσι" },
];

interface DetailsFormProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  imageUrl: string;
  setImageUrl: (url: string) => void;
}

const DetailsForm = ({ form, imageUrl, setImageUrl }: DetailsFormProps) => {
  const selectedServices = form.watch("services") ? form.watch("services").split(",").map(s => s.trim()) : [];
  
  const handleServiceToggle = (serviceId: string, checked: boolean) => {
    const currentServices = selectedServices;
    let newServices: string[];
    
    if (checked) {
      // Add the service if it's not already included
      if (!currentServices.includes(serviceId)) {
        newServices = [...currentServices, serviceId];
      } else {
        newServices = currentServices;
      }
    } else {
      // Remove the service
      newServices = currentServices.filter(s => s !== serviceId);
    }
    
    // Update the form
    form.setValue("services", newServices.join(", "), { shouldValidate: true });
  };

  return (
    <div className="space-y-4">
      <ImageUpload imageUrl={imageUrl} setImageUrl={setImageUrl} />
      
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
      
      <div className="space-y-2">
        <FormLabel>Διαθέσιμες Υπηρεσίες</FormLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 border rounded-md p-3">
          {availableServices.map((service) => (
            <div key={service.id} className="flex items-center space-x-2">
              <Checkbox 
                id={`service-${service.id}`}
                checked={selectedServices.includes(service.id)}
                onCheckedChange={(checked) => 
                  handleServiceToggle(service.id, checked as boolean)
                }
              />
              <label
                htmlFor={`service-${service.id}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {service.label}
              </label>
            </div>
          ))}
        </div>
        
        <FormField
          control={form.control}
          name="services"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
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
  );
};

export default DetailsForm;
