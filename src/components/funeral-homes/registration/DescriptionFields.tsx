
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { RegistrationFormValues } from "@/schemas/registrationFormSchema";

interface DescriptionFieldsProps {
  form: UseFormReturn<RegistrationFormValues>;
}

export function DescriptionFields({ form }: DescriptionFieldsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Περιγραφή Επιχείρησης*</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Περιγράψτε την επιχείρησή σας, την ιστορία της και τις υπηρεσίες που προσφέρετε..." 
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
            <FormLabel>Υπηρεσίες που Προσφέρετε</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Π.χ. Αποτέφρωση, Μεταφορά σορού, Διοργάνωση μνημόσυνων κλπ." 
                className="min-h-[100px]" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
