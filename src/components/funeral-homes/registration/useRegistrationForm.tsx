
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { registrationFormSchema, type RegistrationFormValues } from "@/schemas/registrationFormSchema";
import { sendPartnerRegistrationNotification } from "@/services/emailService";
import { supabase } from "@/integrations/supabase/client";

export function useRegistrationForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  
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

  const handleOpenConfirmDialog = () => {
    if (form.formState.isValid) {
      setShowConfirmDialog(true);
    } else {
      // Trigger validation if the form is not valid
      form.trigger();
    }
  };

  const handleCloseConfirmDialog = () => {
    setShowConfirmDialog(false);
  };

  async function onSubmitConfirmed() {
    const data = {...form.getValues(), regions: selectedRegions};
    console.log("Form submitted:", data);
    
    setIsSubmitting(true);
    
    try {
      // Save partner data to Supabase
      const { error } = await supabase.from('partners').insert({
        name: data.businessName,
        owner_name: data.ownerName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city,
        zip: data.postalCode,
        website: data.website || '',
        description: data.description,
        services: data.services ? data.services.split(',').map(s => s.trim()) : [],
        regions: selectedRegions
      });
      
      if (error) {
        throw new Error(`Failed to save partner: ${error.message}`);
      }

      // Send email notification with partner data
      const emailSent = await sendPartnerRegistrationNotification(data);
      
      if (!emailSent) {
        console.warn("Failed to send email notification, but partner was saved");
      }

      // Display success message to user
      toast.success("Η αίτηση σας υποβλήθηκε με επιτυχία", {
        description: "Θα επικοινωνήσουμε μαζί σας σύντομα για να ολοκληρώσουμε τη διαδικασία εγγραφής."
      });
      
      form.reset();
      setSelectedRegions([]);
      
      // Redirect user to home page after submission
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Σφάλμα κατά την υποβολή", {
        description: "Παρουσιάστηκε ένα πρόβλημα κατά την υποβολή της φόρμας. Παρακαλώ δοκιμάστε ξανά."
      });
    } finally {
      setIsSubmitting(false);
      setShowConfirmDialog(false);
    }
  }

  return {
    form,
    isSubmitting,
    showConfirmDialog,
    selectedRegions,
    setSelectedRegions,
    handleOpenConfirmDialog,
    handleCloseConfirmDialog,
    onSubmitConfirmed
  };
}
