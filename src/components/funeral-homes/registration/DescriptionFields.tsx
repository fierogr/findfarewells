
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
    <FormField 
      control={form.control} 
      name="services" 
      render={({ field }) => (
        <FormItem>
          <FormLabel>Υπηρεσίες</FormLabel>
          <FormControl>
            <Textarea 
              placeholder="Περιγράψτε τις υπηρεσίες που προσφέρει η επιχείρησή σας..." 
              className="min-h-[120px]" 
              {...field} 
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} 
    />
  );
}
