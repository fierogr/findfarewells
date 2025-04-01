
import React from "react";
import { UseFormReturn } from "react-hook-form";
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
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Check, X } from "lucide-react";
import IncludedServicesField from "./IncludedServicesField";
import { PackageFormValues } from "./types";

interface PackageFormProps {
  form: UseFormReturn<PackageFormValues>;
  onSubmit: (data: PackageFormValues) => void;
  resetForm: () => void;
}

const PackageForm = ({ 
  form, 
  onSubmit, 
  resetForm 
}: PackageFormProps) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
        
        <IncludedServicesField form={form} />
        
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              <X className="h-4 w-4 mr-1" /> Άκυρο
            </Button>
          </DialogClose>
          <Button type="submit">
            <Check className="h-4 w-4 mr-1" /> 
            {form.formState.isSubmitting ? "Υποβολή..." : "Προσθήκη"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default PackageForm;
