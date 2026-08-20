import { z } from "zod";

export const contactSchema = z.object({
    phone: z
        .string()
        .optional(),
    email: z
        .email("L'adresse e-mail est invalide.")
});

export type ContactFormValues = z.infer<typeof contactSchema>;