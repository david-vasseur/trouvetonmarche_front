import { City, CitySearchResult, Department, Region } from "@/types/geo";
import { findAdministrativeEntity } from "./geo";
import { normalizeString } from "./string";

const GEO_API_URL = "https://geo.api.gouv.fr";

type GeoApiCity = {
  nom: string;
  code: string;
  codeDepartement: string;
  codeRegion: string;
  codesPostaux?: string[];
  centre?: {
    coordinates: [number, number];
  };
};



export async function getCity(name: string): Promise<City | null> {
    return findAdministrativeEntity<City>("communes", name);
}

export async function getDepartment(
    name: string
): Promise<Department | null> {
    return findAdministrativeEntity<Department>("departements", name);
}

export async function getRegion(slug: string): Promise<Region | null> {
  const response = await fetch(`${GEO_API_URL}/regions`);

  if (!response.ok) {
    throw new Error(`Erreur API géographique : ${response.status}`);
  }

  const regions: Region[] = await response.json();

  return (
    regions.find(
      (region) => normalizeString(region.nom) === normalizeString(slug)
    ) ?? null
  );
}

export async function searchCities(
  query: string,
  limit = 8
): Promise<CitySearchResult[]> {
  const response = await fetch(
    `https://geo.api.gouv.fr/communes?nom=${encodeURIComponent(
      query
    )}&fields=nom,code,codeDepartement,codeRegion,codesPostaux,centre&limit=${limit}`
  );

  if (!response.ok) {
    throw new Error(
      `Erreur API géographique : ${response.status}`
    );
  }

  const cities = await response.json();

  return cities.map((city: GeoApiCity) => ({
    nom: city.nom,
    code: city.code,
    codeDepartement: city.codeDepartement,
    codeRegion: city.codeRegion,
    codesPostaux: city.codesPostaux ?? [],
    latitude: city.centre?.coordinates?.[1] ?? 0,
    longitude: city.centre?.coordinates?.[0] ?? 0,
  }));
}

export const formatPrice = (value?: number | string | null) => {
  if (value == null) return "Non renseigné";

  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(Number(value));
};

export function slugify(value: string): string {
  return value
    .normalize("NFD")                  // sépare les accents
    .replace(/[\u0300-\u036f]/g, "")   // supprime les accents
    .toLowerCase()
    .trim()
    .replace(/&/g, "et")
    .replace(/[^a-z0-9]+/g, "-")       // espaces + caractères spéciaux → -
    .replace(/^-+|-+$/g, "");          // supprime les - au début/à la fin
}

export function formatMarketType(type?: string | null) {
    switch (type) {
        case "COVERED":
            return "Couvert";
        case "EXTERIOR":
            return "Plein air";
        case "BOTH":
            return "Plein air + couvert";
        default:
            return "Type non renseigné";
    }
}

export const formatDate = (value: Date | string) => new Intl.DateTimeFormat("fr-FR", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
}).format(new Date(value));