
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { RegistrationFormValues } from "@/schemas/registrationFormSchema";

interface BusinessInfoFieldsProps {
  form: UseFormReturn<RegistrationFormValues>;
}

export function BusinessInfoFields({ form }: BusinessInfoFieldsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="businessName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Επωνυμία Επιχείρησης*</FormLabel>
            <FormControl>
              <Input placeholder="Γραφείο Τελετών Παπαδόπουλος" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="ownerName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ονοματεπώνυμο Ιδιοκτήτη*</FormLabel>
            <FormControl>
              <Input placeholder="Γιώργος Παπαδόπουλος" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
