
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { RegistrationFormValues } from "@/schemas/registrationFormSchema";

interface DescriptionFieldsProps {
  form: UseFormReturn<RegistrationFormValues>;
}

export function DescriptionFields({
  form
}: DescriptionFieldsProps) {
  return (
    <>
      <FormField 
        control={form.control} 
        name="description" 
        render={({ field }) => (
          <FormItem>
            <FormLabel>Περιγραφή Επιχείρησης</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Περιγράψτε την επιχείρησή σας και τις υπηρεσίες που προσφέρετε..." 
                className="resize-none" 
                rows={5}
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
            <FormLabel>Υπηρεσίες (προαιρετικό)</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Αναφέρετε συγκεκριμένες υπηρεσίες που προσφέρετε..." 
                className="resize-none" 
                rows={3}
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
