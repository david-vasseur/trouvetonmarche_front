"use server"

import { ProfileFormValues } from "@/schema/profile/profile.schema";
import { UserProfile } from "@/types/user";
import { cookies } from 'next/headers';

const URL = process.env.BACKEND_URL;

export const getUser = async (userId: number): Promise<UserProfile | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  try {
    const response = await fetch(`${URL}${userId}`, {
      method: "GET",
      headers: {
        // On transmet le token si l'API route est protégée par un Guard
        ...(token && { "Authorization": `Bearer ${token}` }),
      },
      cache: 'no-store', // Données fraîches
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("User not found");
      }
      throw new Error("Failed to fetch user");
    }

    const user = await response.json();

    // Normalisation des dates (si besoin, bien que NestJS les renvoie déjà en string ISO via JSON)
    return {
      ...user,
      emailVerifiedAt: user.emailVerifiedAt ?? null,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      profile: user.profile
        ? {
            ...user.profile,
            createdAt: user.profile.createdAt,
            updatedAt: user.profile.updatedAt,
          }
        : null,
    };
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

// app/actions/user.ts (ou ton fichier d'actions)

export const updateUser = async (data: ProfileFormValues) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  // On convertit latitude et longitude en string si elles existent
  const payloadToSend = {
    ...data,
    latitude: data.latitude !== undefined && data.latitude !== null ? String(data.latitude) : undefined,
    longitude: data.longitude !== undefined && data.longitude !== null ? String(data.longitude) : undefined,
  };

  const response = await fetch(`${URL}users/me`, {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payloadToSend), // 👈 On envoie le payload corrigé
  });

  const responseText = await response.text();
  console.log("📡 STATUT REÇU DE NESTJS :", response.status);
  console.log("📦 CORPS DE LA RÉPONSE DE NESTJS :", responseText);

  if (!response.ok) {
    console.error("❌ Erreur NestJS :", responseText);
    return { 
      success: false, 
      error: responseText 
    };
  }

  return {
    success: true,
    user: JSON.parse(responseText),
  };
};


export const getCurrentUser = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  // S'il n'y a pas de token, l'utilisateur n'est pas connecté
  if (!token) {
    return null;
  }

  try {
    // On appelle NestJS en lui transmettant le token via l'en-tête Authorization
    const response = await fetch(`${URL}auth/profile`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      cache: 'no-store', // Toujours récupérer les données fraîches
    });

    if (!response.ok) {
      return null;
    }

    return await response.json(); // Retourne l'objet user renvoyé par NestJS
  } catch (error) {
    return null;
  }
}