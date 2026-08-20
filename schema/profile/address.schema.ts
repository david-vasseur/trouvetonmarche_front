import { z } from "zod";

export const addressSchema = z.object({
  address: z
    .string()
    .max(200, "L'adresse est trop longue.")
    .optional(),

  zip: z
    .string()
    .regex(
      /^\d{5}$/,
      "Le code postal doit contenir 5 chiffres."
    )
    .optional(),

  city: z
    .string()
    .max(100, "Le nom de la ville est trop long.")
    .optional(),

  cityCode: z
    .string()
    .optional(),

  departmentCode: z
    .string()
    .optional(),

  regionCode: z
    .string()
    .optional(),

  latitude: z
    .number()
    .optional(),

  longitude: z
    .number()
    .optional(),
});

export type AddressFormValues = z.infer<typeof addressSchema>;