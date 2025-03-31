
import React from "react";
import { Form } from "@/components/ui/form";
import { RegistrationConfirmDialog } from "./registration/RegistrationConfirmDialog";
import { BusinessInfoFields } from "./registration/BusinessInfoFields";
import { ContactInfoFields } from "./registration/ContactInfoFields";
import { AddressFields } from "./registration/AddressFields";
import { DescriptionFields } from "./registration/DescriptionFields";
import { SubmitButton } from "./registration/SubmitButton";
import { useRegistrationForm } from "./registration/useRegistrationForm";

export const RegisterForm = () => {
  const {
    form,
    isSubmitting,
    showConfirmDialog,
    selectedRegions,
    setSelectedRegions,
    handleOpenConfirmDialog,
    handleCloseConfirmDialog,
    onSubmitConfirmed
  } = useRegistrationForm();

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleOpenConfirmDialog)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BusinessInfoFields form={form} />
            <ContactInfoFields form={form} />
            <AddressFields form={form} />
          </div>
          
          <DescriptionFields form={form} />
          
          {/* Regions fields removed as requested */}
          
          <SubmitButton 
            isSubmitting={isSubmitting} 
            isValid={form.formState.isValid}
          />
        </form>
      </Form>

      <RegistrationConfirmDialog 
        isOpen={showConfirmDialog}
        onClose={handleCloseConfirmDialog}
        onConfirm={onSubmitConfirmed}
        formData={{...form.getValues(), regions: selectedRegions}}
        isLoading={isSubmitting}
      />
    </>
  );
};
