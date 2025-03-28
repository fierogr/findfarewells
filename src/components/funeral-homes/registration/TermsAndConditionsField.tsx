import React from "react";
import { FormField, FormItem, FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { RegistrationFormValues } from "@/schemas/registrationFormSchema";
interface TermsAndConditionsFieldProps {
  form: UseFormReturn<RegistrationFormValues>;
}
export function TermsAndConditionsField({
  form
}: TermsAndConditionsFieldProps) {
  return <FormField control={form.control} name="termsAccepted" render={({
    field
  }) => {}} />;
}