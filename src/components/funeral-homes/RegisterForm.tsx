
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
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
import { sendPartnerRegistrationNotification } from "@/services/emailService";
import { registrationFormSchema, type RegistrationFormValues } from "@/schemas/registrationFormSchema";

export const RegisterForm = () => {
  const navigate = useNavigate();
  
  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      businessName: "",
      ownerName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      website: "",
      description: "",
      services: "",
      termsAccepted: false
    }
  });

  async function onSubmit(data: RegistrationFormValues) {
    console.log("Form submitted:", data);
    
    try {
      // Send email notification with partner data
      const emailSent = await sendPartnerRegistrationNotification(data);
      
      if (!emailSent) {
        throw new Error("Failed to send email notification");
      }

      // Display success message to user
      toast.success("Η αίτηση σας υποβλήθηκε με επιτυχία", {
        description: "Θα επικοινωνήσουμε μαζί σας σύντομα για να ολοκληρώσουμε τη διαδικασία εγγραφής."
      });
      
      form.reset();
      
      // Redirect user to home page after submission
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Σφάλμα κατά την υποβολή", {
        description: "Παρουσιάστηκε ένα πρόβλημα κατά την υποβολή της φόρμας. Παρακαλώ δοκιμάστε ξανά."
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email*</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="info@example.gr" {...field} />
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
                <FormLabel>Τηλέφωνο*</FormLabel>
                <FormControl>
                  <Input placeholder="2101234567" {...field} />
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
                <FormLabel>Διεύθυνση*</FormLabel>
                <FormControl>
                  <Input placeholder="Λεωφόρος Αθηνών 123" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Πόλη*</FormLabel>
                <FormControl>
                  <Input placeholder="Αθήνα" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ταχυδρομικός Κώδικας*</FormLabel>
                <FormControl>
                  <Input placeholder="12345" {...field} />
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
                <FormLabel>Ιστοσελίδα</FormLabel>
                <FormControl>
                  <Input placeholder="https://www.example.gr" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
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
        
        <FormField
          control={form.control}
          name="termsAccepted"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Αποδέχομαι τους όρους και τις προϋποθέσεις*
                </FormLabel>
                <p className="text-sm text-muted-foreground">
                  Συμφωνώ με τους όρους χρήσης της πλατφόρμας και την πολιτική απορρήτου.
                </p>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full">
          Υποβολή Εγγραφής
        </Button>
      </form>
    </Form>
  );
};
