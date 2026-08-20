"use server";

import { Market } from "@/types/market";
import { cookies } from "next/headers";

const URL = process.env.BACKEND_URL


const serializeData = (data: any): any => {
  if (data === null || data === undefined) return null;

  // Si c'est un tableau, on applique à chaque élément
  if (Array.isArray(data)) {
    return data.map(serializeData);
  }

  // Si c'est une date Prisma / JS, on la transforme en string ISO
  if (data instanceof Date) {
    return data.toISOString();
  }

  // Si c'est un objet (et pas une instance spéciale)
  if (typeof data === 'object') {
    // Détection d'un type Decimal de Prisma (souvent un objet avec des propriétés 'd', 's', 'e' ou une méthode toNumber)
    if ('toNumber' in data && typeof data.toNumber === 'function') {
      return data.toNumber();
    }
    // Autre format potentiel de Decimal Prisma
    if ('d' in data && Array.isArray(data.d)) {
      return Number(data.toString());
    }

    // Sinon, on parcourt toutes les clés de l'objet récursivement
    const newObj: any = {};
    for (const key of Object.keys(data)) {
      newObj[key] = serializeData(data[key]);
    }
    return newObj;
  }

  // Pour les types primitifs (string, number, boolean)
  return data;
}

const fetchMarkets = async (queryString: string) => {
  try {
    const response = await fetch(`${URL}/markets?${queryString}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) throw new Error("Erreur lors de la récupération des marchés");

    const data = await response.json();
    return serializeData(data); 
  } catch (error) {
    console.error(`❌ Erreur fetch markets (${queryString}):`, error);
    return [];
  }
};

export const getMarkets = async () => {
    try {
        const response = await fetch(`${URL}markets`, {
            next: { revalidate: 3600 }, 
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des marchés');
        }

        const data = await response.json();

        return serializeData(data);

    } catch (error) {
        console.error('❌ Erreur fetch getMarkets:', error);
        return [];
    }
};

export const getMarketsByRegion = async (regionCode: string): Promise<Market[]> => 
  fetchMarkets(`regionCode=${regionCode}`);

export const getMarketsByDepartment = async (departmentCode: string): Promise<Market[]> => 
  fetchMarkets(`departmentCode=${departmentCode}`);

export const getMarketsByCity = async ( cityCode: string): Promise<Market[]> => 
  fetchMarkets(`cityCode=${cityCode}`);

export const createMarket = async (data: any) => {
  console.log('🚀 [BFF/Server Action] --------------------------------------------------');
  console.log('🚀 [BFF/Server Action] Début de la fonction createMarket');
  console.log('📥 [BFF/Server Action] Données reçues du formulaire :', JSON.stringify(data, null, 2));

  const { userId, ...payloadToSend } = data;

  try {
    // 1. Récupération sécurisée du token depuis les cookies côté serveur
    const cookieStore = await cookies(); // Note: En Next.js 15+, cookies() peut être asynchrone, adapte selon ta version (await ou non)
    
    // Remplace 'token' par le nom exact de ton cookie d'authentification (ex: 'session', 'jwt', 'next-auth.session-token'...)
    const tokenCookie = cookieStore.get('auth_token'); 
    const token = tokenCookie?.value;

    if (!token) {
      console.warn('⚠️ [BFF/Server Action] Accès refusé : Aucun token trouvé dans les cookies !');
      return { 
        success: false, 
        error: 'Vous devez être connecté pour effectuer cette action.' 
      };
    }

    console.log('🔑 [BFF/Server Action] Token récupéré avec succès depuis les cookies.');

    // 3. Appel HTTP POST vers NestJS
    const response = await fetch(`${URL}markets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // On injecte le token trouvé dans le cookie
      },
      body: JSON.stringify(payloadToSend),
    });

    console.log(`📡 [BFF/Server Action] Réponse NestJS - Status : ${response.status} (${response.statusText})`);

    const result = await response.json();
    console.log('📦 [BFF/Server Action] Corps de la réponse NestJS :', JSON.stringify(result, null, 2));

    if (!response.ok) {
      console.error('❌ [BFF/Server Action] L\'API NestJS a rejeté la requête.');
      return { 
        success: false, 
        error: result.message || 'Erreur lors de la création du marché' 
      };
    }

    console.log('✅ [BFF/Server Action] Marché créé avec succès !');
    console.log('🚀 [BFF/Server Action] --------------------------------------------------');
    return { success: true, data: result.data };

  } catch (error) {
    console.error('💥 [BFF/Server Action] Exception critique :', error);
    console.log('🚀 [BFF/Server Action] --------------------------------------------------');
    return { 
      success: false, 
      error: 'Erreur technique lors de la communication avec le serveur' 
    };
  }
};

export const getMarket = async (id: number) => {
    try {
        const response = await fetch(`${URL}markets/${id}`, {
        next: { revalidate: 3600 },
        });

        if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error("Erreur lors de la récupération du marché");
        }

        const market = await response.json();

        // 🧹 Nettoyage des données (Decimal, Date, etc.)
        return serializeData(market);

    } catch (error) {
        console.error("❌ Erreur getMarket:", error);
        return null;
    }
};

export async function getMarketsByUserId(): Promise<{ success: boolean; data?: Market[]; error?: string }> {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    try {
        const response = await fetch(`${URL}markets/my-markets`, {
            method: "GET",
            headers: {
                ...(token && { "Authorization": `Bearer ${token}` }),
            },
            cache: 'no-store', // Données fraîches
        });

        if (!response.ok) {
            throw new Error("Failed to fetch markets");
        }

        const markets = await response.json();

        // On nettoie les éventuels Decimal/Dates avec serializeData
        return { success: true, data: serializeData(markets) };
    } catch (error) {
        console.error("❌ Erreur lors de la récupération des marchés :", error);
        return { success: false, error: "Impossible de récupérer les marchés." };
    }
}

export async function getFilteredMarkets(filters: {
    lat?: number | null;
    lng?: number | null;
    radius?: number;
    categoryId?: string;
    startDate?: string;
    endDate?: string;
}) {
    try {
        const params = new URLSearchParams();

        if (filters.lat) params.append('lat', filters.lat.toString());
        if (filters.lng) params.append('lng', filters.lng.toString());
        if (filters.radius) params.append('radius', filters.radius.toString());
        if (filters.categoryId) params.append('categoryId', filters.categoryId);
        if (filters.startDate) params.append('startDate', filters.startDate);
        if (filters.endDate) params.append('endDate', filters.endDate);

        const response = await fetch(`${URL}markets/search?${params.toString()}`, {
            method: 'GET',
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la recherche des marchés');
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error('❌ Erreur getFilteredMarkets:', error);
        return { success: false, error: 'Impossible de récupérer les marchés filtrés.' };
    }
}