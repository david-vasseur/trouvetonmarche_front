import { z } from "zod";

export const socialSchema = z.object({
  website: z
    .string()
    .url("L'URL du site est invalide.")
    .optional()
    ,

  instagram: z.string().optional(),
  facebook: z.string().optional(),
  tiktok: z.string().optional(),
  youtube: z.string().optional(),
});

export type SocialFormValues = z.infer<typeof socialSchema>;