import { Department, Region } from "@/types/geo";
import { normalizeString } from "./string";

const GEO_API_URL = "https://geo.api.gouv.fr";

export async function findAdministrativeEntity<T extends { nom: string }>(
    endpoint: string,
    name: string,
): Promise<T | null> {
    const response = await fetch(
        `${GEO_API_URL}/${endpoint}?nom=${encodeURIComponent(name)}`
    );

    if (!response.ok) {
        throw new Error(`Erreur API géographique : ${response.status}`);
    }

    const entities: T[] = await response.json();

    return (
        entities.find(
        (entity) => normalizeString(entity.nom) === normalizeString(name)
        ) ?? null
    );
}

export async function getRegionByCode(
  code: string
): Promise<Region | null> {
  const response = await fetch(
    `https://geo.api.gouv.fr/regions/${code}`
  );

  if (!response.ok) {
    return null;
  }

  return response.json();
}
export const getRegionById = getRegionByCode;
export const getDepartmentById = getDepartmentByCode;
export async function getDepartmentByCode(
  code: string
): Promise<Department | null> {
  const response = await fetch(
    `https://geo.api.gouv.fr/departements/${code}`
  );

  if (!response.ok) {
    return null;
  }

  return response.json();
}