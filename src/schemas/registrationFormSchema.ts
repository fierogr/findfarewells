
import { z } from "zod";

export const registrationFormSchema = z.object({
  businessName: z.string().min(2, { message: "Το όνομα της επιχείρησης είναι απαραίτητο" }),
  ownerName: z.string().min(2, { message: "Το όνομα του ιδιοκτήτη είναι απαραίτητο" }),
  email: z.string().email({ message: "Παρακαλώ εισάγετε ένα έγκυρο email" }),
  phone: z.string().min(10, { message: "Το τηλέφωνο είναι απαραίτητο" }),
  address: z.string().min(5, { message: "Η διεύθυνση είναι απαραίτητη" }),
  city: z.string().min(2, { message: "Η πόλη είναι απαραίτητη" }),
  postalCode: z.string().min(5, { message: "Ο ταχυδρομικός κώδικας είναι απαραίτητος" }),
  website: z.string().url({ message: "Παρακαλώ εισάγετε ένα έγκυρο URL" }).optional().or(z.literal("")),
  services: z.string().optional(),
  regions: z.array(z.string()).optional(),
});

export type RegistrationFormValues = z.infer<typeof registrationFormSchema>;
