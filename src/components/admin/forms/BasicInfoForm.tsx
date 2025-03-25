
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
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(2, { message: "Το όνομα πρέπει να έχει τουλάχιστον 2 χαρακτήρες" }),
  address: z.string().min(5, { message: "Η διεύθυνση είναι απαραίτητη" }),
  city: z.string().min(2, { message: "Η πόλη είναι απαραίτητη" }),
  state: z.string().min(2, { message: "Ο νομός είναι απαραίτητος" }),
  zip: z.string().min(5, { message: "Ο ταχυδρομικός κώδικας είναι απαραίτητος" }),
  phone: z.string().min(10, { message: "Το τηλέφωνο είναι απαραίτητο" }),
  email: z.string().email({ message: "Παρακαλώ εισάγετε ένα έγκυρο email" }),
  website: z.string().url({ message: "Παρακαλώ εισάγετε ένα έγκυρο URL" }).optional().or(z.literal("")),
});

interface BasicInfoFormProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

const BasicInfoForm = ({ form }: BasicInfoFormProps) => {
  return (
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
  );
};

export { formSchema };
export default BasicInfoForm;
