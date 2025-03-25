
import * as z from "zod";

export const registrationFormSchema = z.object({
  businessName: z.string().min(3, {
    message: "Το όνομα επιχείρησης πρέπει να έχει τουλάχιστον 3 χαρακτήρες"
  }),
  ownerName: z.string().min(3, {
    message: "Το όνομα ιδιοκτήτη πρέπει να έχει τουλάχιστον 3 χαρακτήρες"
  }),
  email: z.string().email({
    message: "Παρακαλώ εισάγετε μια έγκυρη διεύθυνση email"
  }),
  phone: z.string().min(10, {
    message: "Παρακαλώ εισάγετε έναν έγκυρο αριθμό τηλεφώνου"
  }),
  address: z.string().min(5, {
    message: "Παρακαλώ εισάγετε μια έγκυρη διεύθυνση"
  }),
  city: z.string().min(2, {
    message: "Παρακαλώ εισάγετε μια έγκυρη πόλη"
  }),
  postalCode: z.string().min(5, {
    message: "Παρακαλώ εισάγετε έναν έγκυρο ταχυδρομικό κώδικα"
  }),
  website: z.string().optional(),
  description: z.string().min(20, {
    message: "Η περιγραφή πρέπει να έχει τουλάχιστον 20 χαρακτήρες"
  }),
  services: z.string().optional(),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "Πρέπει να αποδεχτείτε τους όρους και τις προϋποθέσεις"
  })
});

export type RegistrationFormValues = z.infer<typeof registrationFormSchema>;
