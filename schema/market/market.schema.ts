import { z } from "zod";
import type { JSONContent } from "@tiptap/core";

// ---------------------------------------------------------------------------
// 1. Énumérations (Enums)
// ---------------------------------------------------------------------------
export const recurrenceSchema = z.enum(["NONE", "WEEKLY", "BIWEEKLY", "MONTHLY", "YEARLY"]);
export const marketTypeSchema = z.enum(["COVERED", "EXTERIOR", "BOTH"]);
export const electricityOptionSchema = z.enum(["NONE", "INCLUDED", "PAID"]);
export const barnumRequirementSchema = z.enum(["REQUIRED", "FORBIDDEN", "OPTIONAL"]);
export const parkingAvailabilitySchema = z.enum(["NEARBY", "FAR", "NONE"]);

// ---------------------------------------------------------------------------
// 2. Schémas Découpés (Parfaits pour des formulaires multi-étapes)
// ---------------------------------------------------------------------------

// Étape 1 : Informations générales
export const marketGeneralSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  tags: z.array(z.string()),
  // Dans un formulaire, on stocke généralement l'ID de la catégorie, pas l'objet complet
  categoryId: z.number().positive("Veuillez sélectionner une catégorie"),
});

// Étape 2 : Localisation
export const marketLocationSchema = z.object({
  address: z.string().nullable().optional(),
  zip: z.string().nullable().optional(),
  city: z.string().min(1, "La ville est requise"),
  cityCode: z.string().min(1, "Le code ville est requis"),
  department: z.string().min(1, "Le département est requis"),
  departmentCode: z.string().min(1, "Le code département est requis"),
  region: z.string().min(1, "La région est requise"),
  regionCode: z.string().min(1, "Le code région est requis"),
  latitude: z.number().nullable().optional(),
  longitude: z.number().nullable().optional(),
});

// Étape 3 : Dates et Récurrence
export const marketDateSchema = z.object({

  startAt: z.string().min(1, "La date de début est requise"),

  endAt: z.string(),

  openingHours: z.array(
    z.object({
      date: z.string(),
      openAt: z.string().min(1, "L'heure de début est requise"),
      closeAt: z.string().min(1, "L'heure de fin est requise"),
    })
  ),

  recurrence: recurrenceSchema,

  recurrenceEndAt: z.string().optional(),
});

// Étape 4 : Informations Exposants & Tarifs
export const marketExhibitorSchema = z.object({
  exhibitors: z.number().int().nonnegative().nullable().optional(),
  registrationsOpen: z.boolean(),
  standSizes: z.array(z.string()),
  electricity: electricityOptionSchema,
  barnum: barnumRequirementSchema,
  parkingAvailability: parkingAvailabilitySchema,
  parkingFree: z.boolean(),
  price: z.number().nonnegative().nullable().optional(),
  standPrice: z.number().nonnegative().nullable().optional(),
  history: z.number().int(),
  visitors: z.number().int().nonnegative().nullable().optional(),
  marketType: marketTypeSchema,
});

// Étape 5 : Contenu public (Tiptap, images, etc.)
export const marketContentSchema = z.object({
  
  excerpt: z.string().max(250, "Le résumé est trop long").nullable().optional(),
  // On utilise z.custom pour accepter le type JSONContent de Tiptap
  description: z.custom<JSONContent>().optional(),
  image: z.string().nullable().optional(),
  externalUrl: z.string().nullable().optional(),
  
});

// ---------------------------------------------------------------------------
// 3. Schéma Global (Pour la soumission finale)
// ---------------------------------------------------------------------------
// On fusionne tous les sous-schémas pour avoir le formulaire complet
export const marketFormSchema = marketGeneralSchema
  .extend(marketLocationSchema.shape)
  .extend(marketDateSchema.shape)
  .extend(marketExhibitorSchema.shape)
  .extend(marketContentSchema.shape);

// ---------------------------------------------------------------------------
// 4. Inférence des Types (z.infer)
// ---------------------------------------------------------------------------

// Types découpés (utiles pour typer les props de tes sous-composants de formulaire)
export type MarketGeneralValues = z.infer<typeof marketGeneralSchema>;
export type MarketLocationValues = z.infer<typeof marketLocationSchema>;
export type MarketDateValues = z.infer<typeof marketDateSchema>;
export type MarketExhibitorValues = z.infer<typeof marketExhibitorSchema>;
export type MarketContentValues = z.infer<typeof marketContentSchema>;

// Type global pour tout le formulaire
export type MarketFormValues = z.infer<typeof marketFormSchema>;