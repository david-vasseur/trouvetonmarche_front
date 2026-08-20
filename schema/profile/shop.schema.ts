import { z } from "zod";

export const shopSchema = z.object({
  shopName: z
    .string()
    .max(100, "Le nom de la boutique est trop long.")
    .optional(),

  description: z
    .string()
    .max(1000, "La description est trop longue.")
    .optional(),

  logoUrl: z
    .string()
    .url("L'URL du logo est invalide.")
    .optional(),

  coverImageUrl: z
    .string()
    .url("L'URL de couverture est invalide.")
    .optional(),

  companyName: z
    .string()
    .max(150, "Le nom de l'entreprise est trop long.")
    .optional(),

  siret: z
    .string()
    .regex(
      /^\d{14}$/,
      "Le SIRET doit contenir exactement 14 chiffres."
    )
    .optional(),
});

export type ShopFormValues = z.infer<typeof shopSchema>;