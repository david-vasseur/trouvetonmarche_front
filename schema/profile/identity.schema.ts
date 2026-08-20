import { z } from "zod";

export const identitySchema = z.object({
  firstName: z
    .string()
    .min(2, "Le prénom doit contenir au moins 2 caractères.")
    .max(50, "Le prénom est trop long."),

  lastName: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères.")
    .max(50, "Le nom est trop long."),


  avatarUrl: z
    .string()
    .url("L'URL de l'avatar est invalide.")
    .optional(),
});

export type IdentityFormValues = z.infer<typeof identitySchema>;