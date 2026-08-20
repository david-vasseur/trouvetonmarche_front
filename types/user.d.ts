import { Market } from "./market"; // Assure-toi d'importer ton type Market existant

export type Role =
  | "EXPOSANT"
  | "ORGANISATEUR"
  | "ADMIN";

export type ExposantProfile = {
  id: number;
  shopName: string | null;
  description: string | null;
  logoUrl: string | null;
  coverImageUrl: string | null;
  website: string | null;
  instagram: string | null;
  facebook: string | null;
  tiktok: string | null;
  youtube: string | null;
  companyName: string | null;
  siret: string | null;
  address: string | null;
  zip: string | null;
  city: string | null;
  cityCode: string | null;
  departmentCode: string | null;
  regionCode: string | null;
  latitude: number | null;
  longitude: number | null;
  createdAt: string;
  updatedAt: string;
};

// Si tu veux la structure complète d'une promotion (adapte selon ton modèle Prisma)
export type UserPromotion = {
  id: number;
  title: string;
  discount: number;
  createdAt: string;
  updatedAt: string;
  // ... autres champs de ta promotion si besoin
};

export type UserProfile = {
  id: number;
  email: string;
  phone: string | null;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
  roles: Role[];
  emailVerifiedAt: string | null;
  profile: ExposantProfile | null;
  
  // 👈 On utilise le type Market complet au lieu de juste { id: number }
  markets: Market[]; 

  // 👈 On utilise le type complet pour les promotions
  promotions: UserPromotion[]; 

  createdAt: string;
  updatedAt: string;
};