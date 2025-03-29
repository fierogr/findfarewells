
import { z } from "zod";

export const packageFormSchema = z.object({
  name: z.string().min(1, { message: "Το όνομα πακέτου είναι υποχρεωτικό" }),
  price: z.coerce.number().min(0, { message: "Η τιμή πρέπει να είναι θετικός αριθμός" }),
  description: z.string().min(1, { message: "Η περιγραφή είναι υποχρεωτική" }),
  includedServices: z.array(z.string()).default([])
});

export type PackageFormValues = z.infer<typeof packageFormSchema>;
