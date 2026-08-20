import { z } from "zod";
import { required } from "zod/mini";

export const loginSchema = z.object({
  email: z
    .string()
    .min(2, "L’email est requis.")
    .trim()
    .email("L’email est invalide."),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères."),
  remember: z.boolean(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    type: z.enum(["exhibitor", "organizer"], {
      error: "Veuillez choisir un type valide.",
    }),

    firstName: z
      .string({
        error: "Le prénom est requis.",
      })
      .trim()
      .min(2, "Le prénom doit contenir au moins 2 caractères."),

    lastName: z
      .string({
        error: "Le nom est requis.",
      })
      .trim()
      .min(2, "Le nom est requis.")
      .min(2, "Le nom doit contenir au moins 2 caractères."),

    email: z
      .string({
        error: "L’email est requis.",
      })
      .trim()
      .email("L’email est invalide."),

    password: z
      .string({
        error: "Le mot de passe est requis.",
      })
      .min(8, "Le mot de passe doit contenir au moins 8 caractères."),

    passwordConfirm: z
      .string({
        error: "La confirmation est requise.",
      })
      .min(8, "La confirmation doit contenir au moins 8 caractères."),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["passwordConfirm"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
