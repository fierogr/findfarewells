
import { z } from "zod";

export const partnerFormSchema = z.object({
  name: z.string().min(2, { message: "Το όνομα πρέπει να έχει τουλάχιστον 2 χαρακτήρες" }),
  address: z.string().min(5, { message: "Η διεύθυνση είναι απαραίτητη" }),
  city: z.string().min(2, { message: "Η πόλη είναι απαραίτητη" }),
  state: z.string().min(2, { message: "Ο νομός είναι απαραίτητος" }),
  zip: z.string().min(5, { message: "Ο ταχυδρομικός κώδικας είναι απαραίτητος" }),
  phone: z.string().min(10, { message: "Το τηλέφωνο είναι απαραίτητο" }),
  email: z.string().email({ message: "Παρακαλώ εισάγετε ένα έγκυρο email" }),
  description: z.string().min(20, { message: "Η περιγραφή πρέπει να έχει τουλάχιστον 20 χαρακτήρες" }),
  services: z.string().optional(),
  website: z.string().url({ message: "Παρακαλώ εισάγετε ένα έγκυρο URL" }).optional().or(z.literal("")),
  featured: z.boolean().default(false),
  regions: z.array(z.string()).optional(),
});

export type PartnerFormValues = z.infer<typeof partnerFormSchema>;
