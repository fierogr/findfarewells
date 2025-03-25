
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

interface DetailsFormProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  imageUrl: string;
  setImageUrl: (url: string) => void;
}

const DetailsForm = ({ form, imageUrl, setImageUrl }: DetailsFormProps) => {
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
  );
};

export default DetailsForm;
